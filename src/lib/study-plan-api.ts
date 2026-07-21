import { StudyPlanDetailsResponse, StudyPlansResponse } from "@/app/types/study-plan";
import { apiClient } from "@/lib/api-client";

export type GetStudyPlansParams = {
  page?: number;
  limit?: number;
  status?: "all" | "active" | "completed" | "archived";
  search?: string;
};

export type UpdateStudyTaskStatus = "pending" | "completed" | "skipped";

export type UpdateStudyPlanStatus = "active" | "archived";

export async function getStudyPlans(
  params: GetStudyPlansParams = {}
): Promise<StudyPlansResponse> {
  const response = await apiClient.get<StudyPlansResponse>("/api/v1/study-plans", {
    params,
  });

  return response.data;
}

export async function getStudyPlanById(
  planId: string
): Promise<StudyPlanDetailsResponse> {
  const response = await apiClient.get<StudyPlanDetailsResponse>(
    `/api/v1/study-plans/${planId}`
  );

  return response.data;
}

export async function updateStudyTaskStatus(
  planId: string,
  taskId: string,
  status: UpdateStudyTaskStatus
): Promise<StudyPlanDetailsResponse> {
  const response = await apiClient.patch<StudyPlanDetailsResponse>(
    `/api/v1/study-plans/${planId}/tasks/${taskId}/status`,
    {
      status,
    }
  );

  return response.data;
}

export async function updateStudyPlanStatus(
  planId: string,
  status: UpdateStudyPlanStatus
): Promise<StudyPlanDetailsResponse> {
  const response = await apiClient.patch<StudyPlanDetailsResponse>(
    `/api/v1/study-plans/${planId}/status`,
    {
      status,
    }
  );

  return response.data;
}