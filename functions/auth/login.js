// POST /auth/login — email + password sign-in
import { verifyPassword, createSessionCookie, json } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request." }, 400); }
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  const user = await env.DB.prepare("SELECT id, password_hash FROM users WHERE email = ?").bind(email).first();
  if (!user) return json({ error: "No account with this email yet. Please create your account first." }, 401);
  if (!user.password_hash) return json({ error: "This account uses Google sign-in. Please use the Google button." }, 401);
  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) return json({ error: "That password does not match. Please try again." }, 401);

  const cookie = await createSessionCookie(env, user.id);
  return json({ ok: true, email }, 200, { "Set-Cookie": cookie });
}
