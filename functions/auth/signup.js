// POST /auth/signup — create an email + password account
import { hashPassword, createSessionCookie, json, validEmail } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request." }, 400); }
  const name = String(body.name || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!name) return json({ error: "Please enter your name." }, 400);
  if (!validEmail(email)) return json({ error: "Please enter a real email address." }, 400);
  if (password.length < 8) return json({ error: "Your password needs at least 8 characters." }, 400);

  const existing = await env.DB.prepare("SELECT id, password_hash FROM users WHERE email = ?").bind(email).first();
  if (existing && existing.password_hash) return json({ error: "An account with this email already exists. Please log in." }, 409);
  const passwordHash = await hashPassword(password);
  let userId;
  if (existing) {
    await env.DB.prepare("UPDATE users SET password_hash = ?, name = ? WHERE id = ?").bind(passwordHash, name, existing.id).run();
    userId = existing.id;
  } else {
    const inserted = await env.DB.prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?) RETURNING id")
      .bind(email, passwordHash, name)
      .first();
    userId = inserted.id;
  }
  const cookie = await createSessionCookie(env, userId);
  return json({ ok: true, email, name }, 200, { "Set-Cookie": cookie });
}
