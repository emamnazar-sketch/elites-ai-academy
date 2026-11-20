// GET /auth/callback — Google sends the student back here
import { createSessionCookie } from "../_lib/auth.js";

function backToLogin(message) {
  return new Response(null, {
    status: 302,
    headers: { Location: `/portal.html?error=${encodeURIComponent(message)}` },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieHeader = request.headers.get("Cookie") || "";
  const stateCookie = (cookieHeader.match(/eaa_oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || !stateCookie || state !== stateCookie) {
    return backToLogin("Google sign-in did not finish. Please try again.");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${url.origin}/auth/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) return backToLogin("Google sign-in did not finish. Please try again.");
  const tokens = await tokenRes.json();

  const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (!infoRes.ok) return backToLogin("Google sign-in did not finish. Please try again.");
  const info = await infoRes.json();
  if (!info.sub || !info.email) return backToLogin("Google did not share an email. Please try again.");

  const email = String(info.email).toLowerCase();
  let user = await env.DB.prepare("SELECT id FROM users WHERE google_sub = ?").bind(info.sub).first();
  if (!user) {
    user = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (user) {
      await env.DB.prepare("UPDATE users SET google_sub = ? WHERE id = ?").bind(info.sub, user.id).run();
    } else {
      const inserted = await env.DB.prepare("INSERT INTO users (email, google_sub) VALUES (?, ?) RETURNING id")
        .bind(email, info.sub)
        .first();
      user = inserted;
    }
  }

  const cookie = await createSessionCookie(env, user.id);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/portal.html",
      "Set-Cookie": cookie,
    },
  });
}
