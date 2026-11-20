// POST /auth/profile — the signed-in student updates their display name
import { getSessionUser, json } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  const user = await getSessionUser(env, request);
  if (!user) return json({ error: "Not signed in." }, 401);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request." }, 400); }
  const name = String(body.name || "").trim().slice(0, 80);
  if (!name) return json({ error: "Please enter your name." }, 400);
  await env.DB.prepare("UPDATE users SET name = ? WHERE id = ?").bind(name, user.id).run();
  return json({ ok: true, name });
}
