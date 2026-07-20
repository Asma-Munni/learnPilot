export type StudyAssistantMessageRole =
  | "user"
  | "assistant";

export type StudyAssistantMessage = {
  messageId: string;
  role: StudyAssistantMessageRole;
  content: string;
  createdAt: string;
};

export type StudyAssistantChatRequest = {
  message: string;
  conversationId?: string;
  planId?: string;
};

export type StudyAssistantChatData = {
  conversationId: string;
  planId?: string;
  answer: string;
  suggestedPrompts: string[];
  messages: StudyAssistantMessage[];
};

export type StudyAssistantChatResponse = {
  success: true;
  message: string;
  data: StudyAssistantChatData;
};

export type StudyAssistantConversationData = {
  conversationId: string;
  planId?: string;
  title: string;
  messages: StudyAssistantMessage[];
  suggestedPrompts: string[];
  createdAt: string;
  updatedAt: string;
};

export type StudyAssistantConversationResponse = {
  success: true;
  message: string;
  data: StudyAssistantConversationData;
};

export type StudyAssistantConversationListItem = {
  conversationId: string;
  planId?: string;
  title: string;
  suggestedPrompts: string[];
  createdAt: string;
  updatedAt: string;
};

export type StudyAssistantConversationListResponse = {
  success: true;
  message: string;
  data: StudyAssistantConversationListItem[];
};