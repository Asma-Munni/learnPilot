"use client";

import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  ArrowLeft,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import { protectedApiClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";

import GeneratedStudyPlan from "../../components/study-planner/generated-study-plan";
import StudyPlanGeneratingState from "../../components/study-planner/study-plan-generating-state";
import StudyPlannerError from "../../components/study-planner/study-planner-error";
import StudyPlannerForm from "../../components/study-planner/study-planner-form";

interface FormInputs {
  goal: string;

  currentLevel:
    | "beginner"
    | "intermediate"
    | "advanced";

  deadline: string;
  dailyStudyMinutes: number;
  daysPerWeek: number;
  weakTopics: string[];

  preferredLearningStyle:
    | "visual"
    | "reading"
    | "practical"
    | "mixed";
}

interface Milestone {
  milestoneId: string;
  title: string;
  description: string;
  targetDate: string;
}

interface StudyTask {
  taskId: string;
  title: string;
  description: string;
  scheduledDate: string;
  estimatedMinutes: number;
  resourceIds?: string[];

  status:
    | "pending"
    | "completed"
    | "skipped";
}

interface StudyPlan {
  planId?: string;
  title: string;
  summary: string;
  goal: string;
  startDate: string;
  deadline: string;
  dailyStudyMinutes: number;
  daysPerWeek: number;
  progressPercentage?: number;
  milestones: Milestone[];
  tasks: StudyTask[];
}

interface GenerateStudyPlanResponse {
  success: boolean;
  message: string;
  data?: StudyPlan;
}

type ApiErrorResponse = {
  message?: string;
};

export default function StudyPlannerPage() {
  const router = useRouter();

  const {
    data: session,
    isPending: isSessionPending,
  } = authClient.useSession();

  const [
    formInputs,
    setFormInputs,
  ] = useState<FormInputs | null>(
    null,
  );

  const [
    generatedPlan,
    setGeneratedPlan,
  ] = useState<StudyPlan | null>(
    null,
  );

  useEffect(() => {
    if (
      !isSessionPending &&
      !session
    ) {
      router.replace("/login");
    }
  }, [
    session,
    isSessionPending,
    router,
  ]);

  const {
    mutate: generatePlan,
    isPending: isGenerating,
    error,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (
      values: FormInputs,
    ) => {
      const response =
        await protectedApiClient.post<GenerateStudyPlanResponse>(
          "/ai/study-plans/generate",
          values,
        );

      return response.data;
    },

    onSuccess: (response) => {
      if (
        response.success &&
        response.data
      ) {
        setGeneratedPlan(
          response.data,
        );
      }
    },
  });

  const handleFormSubmit = (
    values: FormInputs,
  ) => {
    setFormInputs(values);
    setGeneratedPlan(null);

    generatePlan(values);
  };

  const handleRetry = () => {
    if (formInputs) {
      generatePlan(formInputs);
    }
  };

  const handleReset = () => {
    setFormInputs(null);
    setGeneratedPlan(null);

    resetMutation();
  };

  if (isSessionPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  let errorMessage = "";

  if (error) {
    errorMessage =
      "Failed to generate your study plan. Please verify the connection to the AI generation service.";

    if (
      isAxiosError<ApiErrorResponse>(
        error,
      )
    ) {
      if (
        error.response?.status ===
        401
      ) {
        errorMessage =
          "Your session has expired. Please sign out and log in again.";
      } else if (
        error.response?.data
          ?.message
      ) {
        errorMessage =
          error.response.data.message;
      } else if (
        !error.response
      ) {
        errorMessage =
          "Unable to connect to the server. Please check that the backend is running.";
      }
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {!isGenerating &&
          !generatedPlan && (
            <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    title="Back to Dashboard"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 outline-none transition hover:bg-slate-100"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Link>

                  <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
                    <BrainCircuit className="h-6 w-6 text-indigo-600" />
                    AI Study Planner
                  </h1>
                </div>

                <p className="max-w-xl pl-10 text-sm text-slate-500">
                  Design custom
                  schedules and
                  recommended syllabus
                  outlines based on your
                  calendar constraints.
                </p>
              </div>
            </header>
          )}

        {isGenerating ? (
          <StudyPlanGeneratingState />
        ) : errorMessage ? (
          <StudyPlannerError
            message={errorMessage}
            onRetry={handleRetry}
            isRetrying={
              isGenerating
            }
          />
        ) : generatedPlan ? (
          <GeneratedStudyPlan
            plan={generatedPlan}
            onReset={handleReset}
          />
        ) : (
          <StudyPlannerForm
            onSubmit={
              handleFormSubmit
            }
            isSubmitting={
              isGenerating
            }
          />
        )}
      </div>
    </main>
  );
}