import { StudyPlanDetailsResponse, StudyPlansResponse } from "@/app/types/study-plan";
import axios from "axios";

const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export type GetStudyPlansParams = {
  page?: number;
  limit?: number;
  status?:
    | "all"
    | "active"
    | "completed"
    | "archived";
  search?: string;
};

export type UpdateStudyTaskStatus =
  | "pending"
  | "completed"
  | "skipped";

export type UpdateStudyPlanStatus =
  | "active"
  | "archived";

export async function getStudyPlans(
  params: GetStudyPlansParams = {},
): Promise<StudyPlansResponse> {
  const response =
    await axios.get<StudyPlansResponse>(
      `${serverUrl}/api/v1/study-plans`,
      {
        params,
        withCredentials: true,
      },
    );

  return response.data;
}

export async function getStudyPlanById(
  planId: string,
): Promise<StudyPlanDetailsResponse> {
  const response =
    await axios.get<StudyPlanDetailsResponse>(
      `${serverUrl}/api/v1/study-plans/${planId}`,
      {
        withCredentials: true,
      },
    );

  return response.data;
}

export async function updateStudyTaskStatus(
  planId: string,
  taskId: string,
  status: UpdateStudyTaskStatus,
): Promise<StudyPlanDetailsResponse> {
  const response =
    await axios.patch<StudyPlanDetailsResponse>(
      `${serverUrl}/api/v1/study-plans/${planId}/tasks/${taskId}/status`,
      {
        status,
      },
      {
        withCredentials: true,
      },
    );

  return response.data;
}

export async function updateStudyPlanStatus(
  planId: string,
  status: UpdateStudyPlanStatus,
): Promise<StudyPlanDetailsResponse> {
  const response =
    await axios.patch<StudyPlanDetailsResponse>(
      `${serverUrl}/api/v1/study-plans/${planId}/status`,
      {
        status,
      },
      {
        withCredentials: true,
      },
    );

  return response.data;
}