import {
  StudyAssistantChatRequest,
  StudyAssistantChatResponse,
  StudyAssistantConversationListResponse,
  StudyAssistantConversationResponse,
} from "@/app/types/study-assistant";

import { apiClient } from "@/lib/api-client";

export async function sendStudyAssistantMessage(
  payload: StudyAssistantChatRequest,
): Promise<StudyAssistantChatResponse> {
  const response =
    await apiClient.post<StudyAssistantChatResponse>(
      "/api/v1/ai/study-assistant/chat",
      payload,
    );

  return response.data;
}

export async function getStudyAssistantConversation(
  conversationId: string,
): Promise<StudyAssistantConversationResponse> {
  const response =
    await apiClient.get<StudyAssistantConversationResponse>(
      `/api/v1/ai/study-assistant/conversations/${conversationId}`,
    );

  return response.data;
}

export async function getStudyAssistantConversations(): Promise<StudyAssistantConversationListResponse> {
  const response =
    await apiClient.get<StudyAssistantConversationListResponse>(
      "/api/v1/ai/study-assistant/conversations",
    );

  return response.data;
}