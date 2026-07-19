"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

// Import custom sub-components
import StudyPlannerForm from "../../components/study-planner/study-planner-form";
import StudyPlanGeneratingState from "../../components/study-planner/study-plan-generating-state";
import GeneratedStudyPlan from "../../components/study-planner/generated-study-plan";
import StudyPlannerError from "../../components/study-planner/study-planner-error";

interface FormInputs {
  goal: string;
  currentLevel: "beginner" | "intermediate" | "advanced";
  deadline: string;
  dailyStudyMinutes: number;
  daysPerWeek: number;
  weakTopics: string[];
  preferredLearningStyle: "visual" | "reading" | "practical" | "mixed";
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
  status: string;
}

interface StudyPlan {
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

export default function StudyPlannerPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  // State to hold user input for potential retries
  const [formInputs, setFormInputs] = useState<FormInputs | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);

  // Redirect logged-out users to /login
  useEffect(() => {
    if (isSessionPending) return;

    if (!session) {
      router.push("/login");
    }
  }, [session, isSessionPending, router]);

  // TanStack Query Mutation for AI generation
  const {
    mutate: generatePlan,
    isPending: isGenerating,
    error,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (values: FormInputs) => {
      const response = await axios.post(
        "http://localhost:5000/api/v1/ai/study-plans/generate",
        values,
        {
          withCredentials: true, // Send credentials automatically
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        setGeneratedPlan(data.data);
      }
    },
  });

  const handleFormSubmit = (values: FormInputs) => {
    setFormInputs(values);
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

  // Render Loader Skeleton while checking auth session
  if (isSessionPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  // Enforce session
  if (!session) {
    return null;
  }

  // Determine error text
  let errorMessage = "";
  if (error) {
    errorMessage = "Failed to generate your study plan. Please verify the connection to the AI generation service.";
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please sign out and log in again.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Breadcrumb Header Block */}
        {!isGenerating && !generatedPlan && (
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-500 transition outline-none"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <BrainCircuit className="h-6 w-6 text-indigo-600" />
                  AI Study Planner
                </h1>
              </div>
              <p className="text-sm text-slate-500 max-w-xl pl-10">
                Design custom schedules and recommended syllabus outlines based on your calendar constraints.
              </p>
            </div>
          </header>
        )}

        {/* Dynamic Display Blocks */}
        {isGenerating ? (
          <StudyPlanGeneratingState />
        ) : errorMessage ? (
          <StudyPlannerError
            message={errorMessage}
            onRetry={handleRetry}
            isRetrying={isGenerating}
          />
        ) : generatedPlan ? (
          <GeneratedStudyPlan plan={generatedPlan} onReset={handleReset} />
        ) : (
          <StudyPlannerForm onSubmit={handleFormSubmit} isSubmitting={isGenerating} />
        )}

      </div>
    </main>
  );
}
