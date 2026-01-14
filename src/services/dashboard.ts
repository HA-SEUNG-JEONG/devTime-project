import { apiClient } from "@/utils/api";
import type {
  GetStatsResponse,
  GetHeatmapResponse,
  GetStudyLogsRequest,
  GetStudyLogsResponse,
  GetStudyLogDetailResponse,
  DeleteStudyLogResponse,
} from "@/types/types";

export const dashboardService = {
  getStats: async (): Promise<GetStatsResponse> => {
    const response = await apiClient.get<GetStatsResponse>("/api/stats");
    return response.data;
  },

  getHeatmap: async (): Promise<GetHeatmapResponse> => {
    const response = await apiClient.get<GetHeatmapResponse>("/api/heatmap");
    return response.data;
  },

  getStudyLogs: async (
    params: GetStudyLogsRequest,
  ): Promise<GetStudyLogsResponse> => {
    const response = await apiClient.get<GetStudyLogsResponse>(
      "/api/study-logs",
      { params },
    );
    return response.data;
  },

  getStudyLogDetail: async (
    studyLogId: string,
  ): Promise<GetStudyLogDetailResponse> => {
    const response = await apiClient.get<GetStudyLogDetailResponse>(
      `/api/study-logs/${studyLogId}`,
    );
    return response.data;
  },

  deleteStudyLog: async (
    studyLogId: string,
  ): Promise<DeleteStudyLogResponse> => {
    const response = await apiClient.delete<DeleteStudyLogResponse>(
      `/api/study-logs/${studyLogId}`,
    );
    return response.data;
  },
};
