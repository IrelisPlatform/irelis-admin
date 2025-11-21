// /lib/auth.ts
// Small helpers for access token handling (client side).
export function saveAccessToken(token: string, secure = true) {
  // Cookie expires in short time (e.g. 15m). Adjust as needed.
  // WARNING: this cookie is NOT HttpOnly (can't be set from frontend). Refresh token should be HttpOnly set by backend.
  const maxAge = 60 * 15; // 15 minutes
  const domain = window.location.hostname === "localhost" ? "" : `;domain=${window.location.hostname}`;
  const secureFlag = secure && window.location.protocol === "https:" ? ";Secure" : "";
  const sameSite = ";SameSite=Lax";
  document.cookie = `accessToken=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}${sameSite}${secureFlag}${domain}`;
}

export function clearAccessToken() {
  document.cookie = "accessToken=; Path=/; Max-Age=0;";
}

export function getAccessTokenFromCookie() {
  const m = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}
