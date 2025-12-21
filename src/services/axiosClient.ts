import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get("refresh_token");
                if (!refreshToken) throw new Error("Refresh token manquant");

                const refreshRes = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/otp/refresh`,
                    { refreshToken },
                    { headers: { "Content-Type": "application/json" } }
                );

                const { accessToken, refreshToken: newRefreshToken } = refreshRes.data;

                Cookies.set("access_token", accessToken);
                Cookies.set("refresh_token", newRefreshToken);
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Erreur lors du refresh du token :", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
