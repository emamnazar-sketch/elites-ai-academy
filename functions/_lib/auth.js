// Shared helpers for Elites AI Academy auth (Cloudflare Pages Functions + D1)

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

function bufToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function b64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function unb64(str) {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

export async function sha256Hex(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return bufToHex(digest);
}

/* ----- passwords (PBKDF2-SHA256, 100k rounds, per-user salt) ----- */

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256);
  return `pbkdf2$100000$${b64(salt)}$${b64(bits)}`;
}

export async function verifyPassword(password, stored) {
  try {
    const [, iterStr, saltB64, hashB64] = stored.split("$");
    const iterations = parseInt(iterStr, 10);
    const salt = unb64(saltB64);
    const expected = unb64(hashB64);
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations, hash: "SHA-256" }, key, expected.length * 8);
    const actual = new Uint8Array(bits);
    if (actual.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
    return diff === 0;
  } catch {
    return false;
  }
}

/* ----- sessions (random token; only its SHA-256 hash is stored) ----- */

const SESSION_DAYS = 30;

export async function createSessionCookie(env, userId) {
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = bufToHex(tokenBytes);
  const tokenHash = await sha256Hex(token);
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await env.DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(tokenHash, userId, expires.toISOString())
    .run();
  return `eaa_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`;
}

export function clearSessionCookie() {
  return "eaa_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

export async function getSessionUser(env, request) {
  const token = readCookie(request, "eaa_session");
  if (!token) return null;
  const tokenHash = await sha256Hex(token);
  const row = await env.DB.prepare(
    "SELECT u.id AS id, u.email AS email, u.name AS name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires_at > datetime('now')"
  )
    .bind(tokenHash)
    .first();
  return row || null;
}

export async function deleteSession(env, request) {
  const token = readCookie(request, "eaa_session");
  if (!token) return;
  const tokenHash = await sha256Hex(token);
  await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(tokenHash).run();
}

export function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
