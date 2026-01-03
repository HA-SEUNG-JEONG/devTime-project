import { apiClient } from "@/utils/api";
import axios from "axios";
import type {
  StartTimerRequest,
  StartTimerResponse,
  GetActiveTimerResponse,
  GetStudyLogDetailResponse,
  PullingTimerResponse,
} from "@/types/types";

export const timerService = {
  start: async (data: StartTimerRequest): Promise<StartTimerResponse> => {
    const response = await apiClient.post<StartTimerResponse>(
      "/api/timers",
      data,
    );
    return response.data;
  },

  getActiveTimer: async (): Promise<GetActiveTimerResponse> => {
    try {
      const response =
        await apiClient.get<GetActiveTimerResponse>("/api/timers");
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Failed to get active timer");
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

  pullingTimer: async (timerId: string) => {
    const response = await apiClient.put<PullingTimerResponse>(
      `/api/timers/${timerId}`,
      {
        splitTimes: [
          {
            date: new Date().toISOString(),
            timeSpent: 0,
          },
        ],
      },
    );
    return response.data;
  },

  updateTimer: async (
    timerId: string,
    elapsedSeconds: number,
  ): Promise<PullingTimerResponse> => {
    const response = await apiClient.put<PullingTimerResponse>(
      `/api/timers/${timerId}`,
      {
        splitTimes: [
          {
            date: new Date().toISOString(),
            timeSpent: elapsedSeconds,
          },
        ],
      },
    );
    return response.data;
  },
};
