import { ResourceInsightsResponse } from "@/app/types/resource-insights";
import { apiClient } from "@/lib/api-client";

export async function getPublicResourceInsights(): Promise<ResourceInsightsResponse> {
  const response = await apiClient.get<ResourceInsightsResponse>(
    "/api/v1/resources/insights/public"
  );

  return response.data;
}