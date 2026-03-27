import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/axiosClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  // Add other fields as necessary
}

export function useUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = Cookies.get("access_token");

  const [userD, setUserD] = useState<User | null>(null);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) return null;
      try {
        const { data } = await api.get("/api/v1/users/me");
        return data as User;
      } catch (err) {
        // If 401, maybe clear token?
        // For now, just return null or let it fail
        console.error(err);
        return null; // Treat error as no user
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_email");
      localStorage.removeItem("auth_role");
      localStorage.removeItem("auth_returnTo");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      Cookies.remove("admin_session");
    }
    setUserD(null);
    queryClient.setQueryData(["user"], null);
    router.push("/admin/login");
    router.refresh();
  };

  return { user, isLoading, error, logout };
}
