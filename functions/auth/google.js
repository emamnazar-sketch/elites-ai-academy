// GET /auth/google — send the student to Google's sign-in
export async function onRequestGet(context) {
  const { request, env } = context;
  const origin = new URL(request.url).origin;
  const stateBytes = crypto.getRandomValues(new Uint8Array(16));
  const state = [...stateBytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${origin}/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      "Set-Cookie": `eaa_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
