// POST /auth/logout
import { deleteSession, clearSessionCookie, json } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  await deleteSession(env, request);
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
