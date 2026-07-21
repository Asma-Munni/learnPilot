import {
  StudyAssistantChatRequest,
  StudyAssistantChatResponse,
  StudyAssistantConversationListResponse,
  StudyAssistantConversationResponse,
} from "@/app/types/study-assistant";
import { protectedApiClient } from "@/lib/api-client";

export async function sendStudyAssistantMessage(
  payload: StudyAssistantChatRequest
): Promise<StudyAssistantChatResponse> {
  const response =
    await protectedApiClient.post<StudyAssistantChatResponse>(
      "/ai/study-assistant/chat",
      payload
    );

  return response.data;
}

export async function getStudyAssistantConversation(
  conversationId: string
): Promise<StudyAssistantConversationResponse> {
  const response =
    await protectedApiClient.get<StudyAssistantConversationResponse>(
      `/ai/study-assistant/conversations/${conversationId}`
    );

  return response.data;
}

export async function getStudyAssistantConversations(): Promise<StudyAssistantConversationListResponse> {
  const response =
    await protectedApiClient.get<StudyAssistantConversationListResponse>(
      "/ai/study-assistant/conversations"
    );

  return response.data;
}