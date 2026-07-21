"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Bot,
  History,
  Loader2,
  MessageCircle,
  Plus,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { authClient } from "@/lib/auth-client";
import {
  getStudyAssistantConversation,
  getStudyAssistantConversations,
  sendStudyAssistantMessage,
} from "@/lib/study-assistant-api";
import { getStudyPlans } from "@/lib/study-plan-api";
import { StudyAssistantMessage } from "@/app/types/study-assistant";



export default function StudyAssistantPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const [message, setMessage] =
    useState("");

  const [
    conversationId,
    setConversationId,
  ] = useState<string>();

  const [
    selectedPlanId,
    setSelectedPlanId,
  ] = useState("");

  const [messages, setMessages] = useState<
    StudyAssistantMessage[]
  >([]);

  const [
    suggestedPrompts,
    setSuggestedPrompts,
  ] = useState<string[]>([
    "What should I study next?",
    "Explain my weakest topic simply.",
    "How can I complete my plan on time?",
  ]);

  const {
    data: session,
    isPending: isSessionPending,
  } = authClient.useSession();

  useEffect(() => {
    if (!isSessionPending && !session) {
      router.replace("/login");
    }
  }, [
    isSessionPending,
    router,
    session,
  ]);

  const {
    data: plansResponse,
    isLoading: isPlansLoading,
  } = useQuery({
    queryKey: [
      "study-plans",
      "assistant-selector",
    ],

    queryFn: () =>
      getStudyPlans({
        page: 1,
        limit: 100,
        status: "all",
      }),

    enabled: Boolean(session),
  });

  const plans =
    plansResponse?.data ?? [];

  const {
    data: conversationsResponse,
    isLoading: isConversationsLoading,
  } = useQuery({
    queryKey: [
      "study-assistant-conversations",
    ],

    queryFn:
      getStudyAssistantConversations,

    enabled: Boolean(session),
  });

  const conversations =
    conversationsResponse?.data ?? [];

  const {
    data: conversationResponse,
    isLoading:
      isConversationHistoryLoading,
    isError:
      isConversationHistoryError,
  } = useQuery({
    queryKey: [
      "study-assistant-conversation",
      conversationId,
    ],

    queryFn: () =>
      getStudyAssistantConversation(
        conversationId!,
      ),

    enabled: Boolean(
      session && conversationId,
    ),
  });

  useEffect(() => {
    if (!conversationResponse?.data) {
      return;
    }

    const conversation = conversationResponse.data;

    queueMicrotask(() => {
      setMessages(conversation.messages);
      setSuggestedPrompts(conversation.suggestedPrompts);
      setSelectedPlanId(conversation.planId ?? "");
    });
  }, [conversationResponse]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    messages,
    isConversationHistoryLoading,
  ]);

  const chatMutation = useMutation({
    mutationFn: (
      userMessage: string,
    ) =>
      sendStudyAssistantMessage({
        message: userMessage,
        conversationId,
        planId:
          selectedPlanId || undefined,
      }),

    onSuccess: (response) => {
      const returnedConversationId =
        response.data.conversationId;

      setConversationId(
        returnedConversationId,
      );

      setMessages(
        (currentMessages) => [
          ...currentMessages,
          ...response.data.messages,
        ],
      );

      setSuggestedPrompts(
        response.data.suggestedPrompts,
      );

      setMessage("");

      queryClient.invalidateQueries({
        queryKey: [
          "study-assistant-conversations",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "study-assistant-conversation",
          returnedConversationId,
        ],
      });
    },
  });

  const sendMessage = (
    userMessage: string,
  ) => {
    const trimmedMessage =
      userMessage.trim();

    if (
      !trimmedMessage ||
      chatMutation.isPending
    ) {
      return;
    }

    chatMutation.mutate(
      trimmedMessage,
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    sendMessage(message);
  };

  const startNewConversation = () => {
    setConversationId(undefined);
    setSelectedPlanId("");
    setMessages([]);
    setMessage("");

    setSuggestedPrompts([
      "What should I study next?",
      "Explain my weakest topic simply.",
      "How can I complete my plan on time?",
    ]);
  };

  const handlePlanChange = (
    planId: string,
  ) => {
    setSelectedPlanId(planId);

    // Changing the plan starts a fresh
    // context-aware conversation.
    setConversationId(undefined);
    setMessages([]);

    setSuggestedPrompts([
      "What should I study next?",
      "Which pending task is most important?",
      "Help me improve my weak topics.",
    ]);
  };

  const openConversation = (
    selectedConversationId: string,
  ) => {
    if (
      chatMutation.isPending ||
      selectedConversationId ===
        conversationId
    ) {
      return;
    }

    setConversationId(
      selectedConversationId,
    );

    setMessages([]);
  };

  if (isSessionPending) {
    return <PageLoader />;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200">
              <Bot className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                Context-aware AI assistant
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                LearnPilot Study Assistant
              </h1>

              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Ask about study plans, tasks,
                deadlines, weak topics and available
                resources. Your conversation history
                is saved so you can continue later.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[310px_1fr]">
          <aside className="h-fit space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <button
                type="button"
                onClick={
                  startNewConversation
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                New Conversation
              </button>

              <label
                htmlFor="study-plan"
                className="mt-5 block text-sm font-bold text-slate-800"
              >
                Study plan context
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Select a plan so the assistant can
                analyze its goal, progress and tasks.
              </p>

              {isPlansLoading ? (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading plans...
                </div>
              ) : (
                <select
                  id="study-plan"
                  value={selectedPlanId}
                  onChange={(event) =>
                    handlePlanChange(
                      event.target.value,
                    )
                  }
                  className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="">
                    General study assistance
                  </option>

                  {plans.map((plan) => (
                    <option
                      key={plan.planId}
                      value={plan.planId}
                    >
                      {plan.title}
                    </option>
                  ))}
                </select>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-indigo-600" />

                <h2 className="font-bold text-slate-950">
                  Conversation History
                </h2>
              </div>

              {isConversationsLoading ? (
                <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading history...
                </div>
              ) : conversations.length === 0 ? (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  No saved conversations yet.
                </p>
              ) : (
                <div className="mt-4 space-y-2">
                  {conversations.map(
                    (conversation) => {
                      const active =
                        conversation.conversationId ===
                        conversationId;

                      return (
                        <button
                          key={
                            conversation.conversationId
                          }
                          type="button"
                          onClick={() =>
                            openConversation(
                              conversation.conversationId,
                            )
                          }
                          className={`w-full rounded-xl border p-3 text-left transition ${
                            active
                              ? "border-indigo-300 bg-indigo-50"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <p
                            className={`line-clamp-2 text-sm font-bold ${
                              active
                                ? "text-indigo-800"
                                : "text-slate-800"
                            }`}
                          >
                            {
                              conversation.title
                            }
                          </p>

                          <p className="mt-2 text-xs text-slate-500">
                            {formatDate(
                              conversation.updatedAt,
                            )}
                          </p>
                        </button>
                      );
                    },
                  )}
                </div>
              )}
            </section>

            <section className="rounded-2xl bg-indigo-50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-800">
                <Sparkles className="h-4 w-4" />
                Assistant capabilities
              </div>

              <div className="mt-3 space-y-2 text-xs leading-5 text-indigo-700">
                <p>
                  • Remembers previous messages
                </p>

                <p>
                  • Analyzes progress and deadlines
                </p>

                <p>
                  • Recommends available resources
                </p>

                <p>
                  • Handles follow-up questions
                </p>
              </div>
            </section>
          </aside>

          <section className="flex min-h-[700px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <Bot className="h-6 w-6" />

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </span>

                <div>
                  <h2 className="font-bold text-slate-950">
                    AI Study Assistant
                  </h2>

                  <p className="text-xs text-slate-500">
                    Online and ready to help
                  </p>
                </div>
              </div>
            </header>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
              {isConversationHistoryLoading && (
                <div className="flex min-h-80 items-center justify-center">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                    Loading conversation...
                  </div>
                </div>
              )}

              {isConversationHistoryError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  Conversation history could not
                  be loaded.
                </div>
              )}

              {!isConversationHistoryLoading &&
                messages.length === 0 && (
                  <div className="flex min-h-80 flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <MessageCircle className="h-8 w-8" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-950">
                      Start a study conversation
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                      Ask what to study next,
                      request an explanation, or
                      get help completing your plan.
                    </p>
                  </div>
                )}

              {!isConversationHistoryLoading &&
                messages.map(
                  (chatMessage) => (
                    <article
                      key={
                        chatMessage.messageId
                      }
                      className={`flex gap-3 ${
                        chatMessage.role ===
                        "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {chatMessage.role ===
                        "assistant" && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                          <Bot className="h-5 w-5" />
                        </span>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                          chatMessage.role ===
                          "user"
                            ? "rounded-br-md bg-indigo-600 text-white"
                            : "rounded-bl-md bg-slate-100 text-slate-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-6">
                          {
                            chatMessage.content
                          }
                        </p>
                      </div>

                      {chatMessage.role ===
                        "user" && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                          <User className="h-5 w-5" />
                        </span>
                      )}
                    </article>
                  ),
                )}

              {chatMutation.isPending && (
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <Bot className="h-5 w-5" />
                  </span>

                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking about your
                      question...
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {chatMutation.isError && (
              <div
                aria-live="polite"
                className="mx-4 mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:mx-6"
              >
                The assistant could not respond.
                Check the backend and Groq API,
                then try again.
              </div>
            )}

            {suggestedPrompts.length > 0 && (
              <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Suggested questions
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestedPrompts.map(
                    (prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={
                          chatMutation.isPending
                        }
                        onClick={() =>
                          sendMessage(prompt)
                        }
                        className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-200 p-4 sm:p-5"
            >
              <div className="flex items-end gap-3">
                <label className="flex-1">
                  <span className="sr-only">
                    Message
                  </span>

                  <textarea
                    rows={2}
                    maxLength={2000}
                    value={message}
                    disabled={
                      chatMutation.isPending ||
                      isConversationHistoryLoading
                    }
                    onChange={(event) =>
                      setMessage(
                        event.target.value,
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                          "Enter" &&
                        !event.shiftKey
                      ) {
                        event.preventDefault();
                        sendMessage(message);
                      }
                    }}
                    placeholder="Ask about your plan, tasks or weak topics..."
                    className="max-h-40 min-h-14 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                  />
                </label>

                <button
                  type="submit"
                  disabled={
                    chatMutation.isPending ||
                    isConversationHistoryLoading ||
                    !message.trim()
                  }
                  aria-label="Send message"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Press Enter to send and Shift +
                Enter for a new line.
              </p>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}

function PageLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <Loader2 className="h-9 w-9 animate-spin text-indigo-600" />
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(new Date(date));
}