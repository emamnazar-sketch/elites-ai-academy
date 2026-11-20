// Temporary diagnostic — reports which bindings are visible (booleans only, never values)
import { json } from "../_lib/auth.js";

export async function onRequestGet(context) {
  const { env } = context;
  return json({
    googleClientId: !!env.GOOGLE_CLIENT_ID,
    googleClientSecret: !!env.GOOGLE_CLIENT_SECRET,
    sessionSecret: !!env.SESSION_SECRET,
    db: !!env.DB,
  });
}
