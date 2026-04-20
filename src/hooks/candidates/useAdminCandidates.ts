import { useQuery } from "@tanstack/react-query";
import api from "@/services/axiosClient";
import Cookies from "js-cookie";
import { CandidatePageResponse, CandidateResponse } from "@/types/candidate";

export const useAdminCandidates = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["admin-candidates", page, size],
    queryFn: async () => {
      const token = Cookies.get("access_token");
      const { data } = await api.get<CandidatePageResponse>(
        "/admin/candidates",
        {
          params: { page, size },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });
};

export const useAdminCandidateDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin-candidate-detail", id],
    queryFn: async () => {
      const token = Cookies.get("access_token");
      const { data } = await api.get<CandidateResponse>(
        `/admin/candidates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    enabled: !!id,
  });
};
