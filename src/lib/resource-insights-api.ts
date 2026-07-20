import { ResourceInsightsResponse } from "@/app/types/resource-insights";
import axios from "axios";



const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export async function getPublicResourceInsights():
Promise<ResourceInsightsResponse> {
  const response =
    await axios.get<ResourceInsightsResponse>(
      `${serverUrl}/api/v1/resources/insights/public`,
    );

  return response.data;
}