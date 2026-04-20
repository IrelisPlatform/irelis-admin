import { useQuery } from "@tanstack/react-query";
import api from "@/services/axiosClient";
import Cookies from "js-cookie";
import { AdminDashboardResponse } from "@/types/dashboard";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const token = Cookies.get("access_token");
      const { data } = await api.get<AdminDashboardResponse>(
        "/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });
};
