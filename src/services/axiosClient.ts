import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

const PUBLIC_ROUTES = [
  "/health",
  "/api/v1/jobs/",
  "/api/v1/jobs/published",
  "/api/v1/jobs/search",
  "/api/v1/jobs/{jobOfferId}",            
  "/api/v1/jobs/{jobOfferId}/share/**",             
  "/admin/auth/register",
  "/admin/auth/login",
  "/api/v1/auth/otp/check-email",
  "/api/v1/auth/otp/send",
  "/api/v1/auth/otp/resend",
  "/api/v1/auth/otp/verify",
  "/api/v1/auth/refresh",
  "/oauth2/exchange",
  "/api/v1/sectors",
  "/oauth2/",
  "/login/oauth2/",
  "/error",
  "/v3/api-docs",
  "/swagger-ui/",
  "/swagger-ui.html",
  "/actuator/",
];

const isPublicRoute = (url?: string) => {
  if (!url) return false;
  try {
    const u = new URL(url, process.env.NEXT_PUBLIC_BACKEND_URL);
    const path = u.pathname;
    return PUBLIC_ROUTES.some(route => {
      return path === route || path.startsWith(route);
    });
  } catch {
    return false;
  }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const url = originalRequest?.url;

    if (url?.includes("/api/v1/auth/refresh")) {
        return Promise.reject(error);
    }

    if (isPublicRoute(url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refresh_token");
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        const { accessToken, refreshToken: newRefreshToken } = refreshRes.data;
        Cookies.set("access_token", accessToken);
        Cookies.set("refresh_token", newRefreshToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
