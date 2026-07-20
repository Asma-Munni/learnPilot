
import { StudyAssistantChatRequest, StudyAssistantChatResponse, StudyAssistantConversationListResponse, StudyAssistantConversationResponse } from "@/app/types/study-assistant";
import axios from "axios";



const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export async function sendStudyAssistantMessage(
  payload: StudyAssistantChatRequest,
): Promise<StudyAssistantChatResponse> {
  const response =
    await axios.post<StudyAssistantChatResponse>(
      `${serverUrl}/api/v1/ai/study-assistant/chat`,
      payload,
      {
        withCredentials: true,
      },
    );

  return response.data;
}

export async function getStudyAssistantConversation(
  conversationId: string,
): Promise<StudyAssistantConversationResponse> {
  const response =
    await axios.get<StudyAssistantConversationResponse>(
      `${serverUrl}/api/v1/ai/study-assistant/conversations/${conversationId}`,
      {
        withCredentials: true,
      },
    );

  return response.data;
}

export async function getStudyAssistantConversations():
Promise<StudyAssistantConversationListResponse> {
  const response =
    await axios.get<StudyAssistantConversationListResponse>(
      `${serverUrl}/api/v1/ai/study-assistant/conversations`,
      {
        withCredentials: true,
      },
    );

  return response.data;
}