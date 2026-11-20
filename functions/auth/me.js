// GET /auth/me — who is signed in?
import { getSessionUser, json } from "../_lib/auth.js";

export async function onRequestGet(context) {
  const { request, env } = context;
  const user = await getSessionUser(env, request);
  if (!user) return json({ error: "Not signed in." }, 401);
  return json({ ok: true, email: user.email });
}
