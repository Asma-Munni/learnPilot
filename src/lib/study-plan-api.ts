import { StudyPlanDetailsResponse, StudyPlansResponse } from "@/app/types/study-plan";
import { protectedApiClient } from "@/lib/api-client";

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
  const response = await protectedApiClient.get<StudyPlansResponse>("/study-plans", {
    params,
  });

  return response.data;
}

export async function getStudyPlanById(
  planId: string
): Promise<StudyPlanDetailsResponse> {
  const response = await protectedApiClient.get<StudyPlanDetailsResponse>(
    `/study-plans/${planId}`
  );

  return response.data;
}

export async function updateStudyTaskStatus(
  planId: string,
  taskId: string,
  status: UpdateStudyTaskStatus
): Promise<StudyPlanDetailsResponse> {
  const response = await protectedApiClient.patch<StudyPlanDetailsResponse>(
    `/study-plans/${planId}/tasks/${taskId}/status`,
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
  const response = await protectedApiClient.patch<StudyPlanDetailsResponse>(
    `/study-plans/${planId}/status`,
    {
      status,
    }
  );

  return response.data;
}