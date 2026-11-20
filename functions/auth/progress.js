// GET/POST /auth/progress — the signed-in student's saved course progress (JSON)
import { getSessionUser, json } from "../_lib/auth.js";

export async function onRequestGet(context) {
  const { request, env } = context;
  const user = await getSessionUser(env, request);
  if (!user) return json({ error: "Not signed in." }, 401);
  const row = await env.DB.prepare("SELECT data FROM progress WHERE user_id = ?").bind(user.id).first();
  return json({ ok: true, data: row ? JSON.parse(row.data) : null });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const user = await getSessionUser(env, request);
  if (!user) return json({ error: "Not signed in." }, 401);
  const text = await request.text();
  if (text.length > 50000) return json({ error: "Progress data too large." }, 413);
  try { JSON.parse(text); } catch { return json({ error: "Bad progress data." }, 400); }
  await env.DB.prepare(
    "INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at"
  ).bind(user.id, text).run();
  return json({ ok: true });
}
