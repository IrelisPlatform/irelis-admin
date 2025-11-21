// /lib/api.ts
const BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;

function parseJSONOrText(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

// client-side helper to read accessToken cookie (not HttpOnly)
function getAccessTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

async function apiRequest(path: string, options: RequestInit = {}) {
  const accessToken = getAccessTokenFromCookie();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", // important to include cookies (refresh token sent by backend)
  });

  if (res.status === 204) return true;
  if (!res.ok) {
    const body = await parseJSONOrText(res);
    const message = typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(message || `API error ${res.status}`);
  }

  return parseJSONOrText(res);
}

export function requestOtp(email: string, userType: "CANDIDATE" | "RECRUITER") {
  return apiRequest("/auth/otp/request", {
    method: "POST",
    body: JSON.stringify({ email, userType }),
  });
}

export function verifyOtp(email: string, code: string, userType: string) {
  return apiRequest("/auth/otp/verify", {
    method: "POST",
    body: JSON.stringify({ email, code, userType }),
  });
}

export function resendOtp(email: string, userType: string) {
  return apiRequest("/auth/otp/resend", {
    method: "POST",
    body: JSON.stringify({ email, userType }),
  });
}

export function checkEmail(email: string) {
  return apiRequest("/auth/otp/check-mail", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function getUser() {
  return apiRequest("/auth/otp/user", { method: "GET" });
}

// ask backend to refresh access token using HttpOnly refresh cookie
export function refreshAccessToken() {
  return apiRequest("/auth/otp/refresh", { method: "POST" });
}

