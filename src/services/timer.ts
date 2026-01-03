import { apiClient } from "@/utils/api";
import type {
  StartTimerRequest,
  StartTimerResponse,
  GetActiveTimerResponse,
  GetStudyLogDetailResponse,
} from "@/types/api";

export const timerService = {
  start: async (data: StartTimerRequest): Promise<StartTimerResponse> => {
    const response = await apiClient.post<StartTimerResponse>(
      "/api/timers",
      data,
    );
    return response.data;
  },

  getActiveTimer: async (): Promise<GetActiveTimerResponse | null> => {
    try {
      const response =
        await apiClient.get<GetActiveTimerResponse>("/api/timers");
      return response.data;
    } catch (error) {
      if (
        (error as { response?: { status: number } }).response?.status === 404
      ) {
        return null;
      }
      throw error;
    }
  },

  getStudyLogDetail: async (
    studyLogId: string,
  ): Promise<GetStudyLogDetailResponse | null> => {
    try {
      const response = await apiClient.get<GetStudyLogDetailResponse>(
        `/api/study-logs/${studyLogId}`,
      );
      return response.data;
    } catch (error) {
      if (
        (error as { response?: { status: number } }).response?.status === 404
      ) {
        return null;
      }
      throw error;
    }
  },
};
