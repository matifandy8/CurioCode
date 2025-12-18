import { apiClient } from "@/lib/api/api-client";
import type { Curiosity } from "@/shared/types/types";


export const CuriositiesService = {
  async getPublicCuriosities() {    
    const res = await apiClient.get<Curiosity[]>("/curiosities");
    return res;
  },

  async getUserCuriosities() {    
    const res = await apiClient.get<Curiosity[]>("/curiosities/user/me");
    return res;
  },
  
  async createCuriosity(curiosity: Curiosity) {
    const res = await apiClient.post<Curiosity>("/curiosities", curiosity);
    return res;
  },

  async updateCuriosity(curiosity: Curiosity) {
    const res = await apiClient.put<Curiosity>("/curiosities", curiosity);
    return res;
  },
  
  async deleteCuriosity(id: number) {
    const res = await apiClient.delete<Curiosity>(`/curiosities/${id}`);
    return res;
  },
};
