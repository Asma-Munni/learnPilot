"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import {
  getStudyPlanById,
  updateStudyTaskStatus,
  type UpdateStudyTaskStatus,
} from "@/lib/study-plan-api";

export default function StudyPlanDetailsPage() {
  const router = useRouter();
  const params = useParams<{ planId: string }>();
  const planId = params.planId;
  const queryClient = useQueryClient();

  const {
    data: session,
    isPending: isSessionPending,
  } = authClient.useSession();

  useEffect(() => {
    if (!isSessionPending && !session) {
      router.replace("/login");
    }
  }, [isSessionPending, router, session]);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["study-plan", planId],
    queryFn: () => getStudyPlanById(planId),
    enabled: Boolean(session && planId),
    retry: 1,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string;
      status: UpdateStudyTaskStatus;
    }) =>
      updateStudyTaskStatus(
        planId,
        taskId,
        status,
      ),

    onSuccess: (response) => {
      queryClient.setQueryData(
        ["study-plan", planId],
        response,
      );

      queryClient.invalidateQueries({
        queryKey: ["study-plans"],
      });
    },
  });

  if (isSessionPending || isLoading) {
    return <StudyPlanDetailsSkeleton />;
  }

  if (!session) {
    return null;
  }

  if (isError || !data?.data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <section className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <Target className="mx-auto h-12 w-12 text-red-500" />

          <h1 className="mt-4 text-2xl font-bold text-slate-950">
            Study plan could not be loaded
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            The plan may not exist, may belong to another
            user, or the server may be unavailable.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
            >
              Retry
            </button>

            <Link
              href="/my-plans"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Back to My Plans
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const plan = data.data;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/my-plans"
          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Plans
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold capitalize text-indigo-200">
                  {plan.status}
                </span>

                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold capitalize text-cyan-200">
                  {plan.currentLevel}
                </span>

                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold capitalize text-amber-200">
                  {plan.preferredLearningStyle}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                {plan.title}
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                {plan.summary}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <PlanMetric
                  icon={<CalendarDays className="h-5 w-5" />}
                  label="Deadline"
                  value={formatDate(plan.deadline)}
                />

                <PlanMetric
                  icon={<Clock3 className="h-5 w-5" />}
                  label="Daily Study"
                  value={`${plan.dailyStudyMinutes} min`}
                />

                <PlanMetric
                  icon={<BookOpenCheck className="h-5 w-5" />}
                  label="Study Days"
                  value={`${plan.daysPerWeek} days/week`}
                />

                <PlanMetric
                  icon={<Target className="h-5 w-5" />}
                  label="Tasks"
                  value={`${plan.tasks.length}`}
                />
              </div>
            </div>

            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 lg:w-64">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">
                  Overall progress
                </span>

                <span className="text-xl font-bold text-cyan-300">
                  {plan.progressPercentage}%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        plan.progressPercentage,
                      ),
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Complete scheduled tasks to increase your
                study-plan progress.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Learning goal
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-950">
            {plan.goal}
          </h2>

          {plan.weakTopics.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">
                Focus areas
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {plan.weakTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="mt-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-600">
              Roadmap
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Learning milestones
            </h2>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {plan.milestones.map(
              (milestone, index) => (
                <article
                  key={milestone.milestoneId}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 font-bold text-cyan-700">
                      {index + 1}
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Target{" "}
                        {formatDate(
                          milestone.targetDate,
                        )}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-slate-950">
                        {milestone.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="mt-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Schedule
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Study tasks
            </h2>
          </div>

          {updateStatusMutation.isError && (
            <div
              aria-live="polite"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
            >
              Task status could not be updated.
              Please try again.
            </div>
          )}

          <div className="mt-5 space-y-4">
            {plan.tasks.map((task, index) => {
              const isUpdatingTask =
                updateStatusMutation.isPending &&
                updateStatusMutation.variables
                  ?.taskId === task.taskId;

              return (
                <article
                  key={task.taskId}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-700">
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-lg font-bold text-slate-950">
                            {task.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {task.description}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                            task.status ===
                            "completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : task.status ===
                                  "skipped"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-indigo-600" />
                          {formatDate(
                            task.scheduledDate,
                          )}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-cyan-600" />
                          {task.estimatedMinutes}{" "}
                          minutes
                        </span>

                        {task.resourceIds.length >
                          0 && (
                          <span className="flex items-center gap-2">
                            <BookOpenCheck className="h-4 w-4 text-amber-600" />
                            {
                              task.resourceIds
                                .length
                            }{" "}
                            linked resource
                            {task.resourceIds
                              .length > 1
                              ? "s"
                              : ""}
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {task.status !==
                          "completed" && (
                          <button
                            type="button"
                            disabled={
                              updateStatusMutation.isPending
                            }
                            onClick={() =>
                              updateStatusMutation.mutate(
                                {
                                  taskId:
                                    task.taskId,
                                  status:
                                    "completed",
                                },
                              )
                            }
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isUpdatingTask
                              ? "Updating..."
                              : "Mark Completed"}
                          </button>
                        )}

                        {task.status !==
                          "skipped" && (
                          <button
                            type="button"
                            disabled={
                              updateStatusMutation.isPending
                            }
                            onClick={() =>
                              updateStatusMutation.mutate(
                                {
                                  taskId:
                                    task.taskId,
                                  status:
                                    "skipped",
                                },
                              )
                            }
                            className="rounded-lg bg-slate-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isUpdatingTask
                              ? "Updating..."
                              : "Skip Task"}
                          </button>
                        )}

                        {task.status !==
                          "pending" && (
                          <button
                            type="button"
                            disabled={
                              updateStatusMutation.isPending
                            }
                            onClick={() =>
                              updateStatusMutation.mutate(
                                {
                                  taskId:
                                    task.taskId,
                                  status:
                                    "pending",
                                },
                              )
                            }
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isUpdatingTask
                              ? "Updating..."
                              : "Reset to Pending"}
                          </button>
                        )}
                      </div>

                      {task.resourceIds.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {task.resourceIds.map(
                            (resourceId) => (
                              <Link
                                key={resourceId}
                                href={`/resources/${resourceId}`}
                                className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                              >
                                View Resource
                              </Link>
                            ),
                          )}
                        </div>
                      )}
                    </div>

                    {task.status === "completed" && (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

type PlanMetricProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function PlanMetric({
  icon,
  label,
  value,
}: PlanMetricProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-cyan-300">
        {icon}
      </div>

      <p className="mt-3 text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function StudyPlanDetailsSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-5 w-36 rounded bg-slate-200" />

        <div className="mt-6 h-80 rounded-3xl bg-slate-900" />

        <div className="mt-8 h-40 rounded-2xl bg-slate-200" />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="h-48 rounded-2xl bg-slate-200" />
          <div className="h-48 rounded-2xl bg-slate-200" />
        </div>

        <div className="mt-8 space-y-4">
          <div className="h-44 rounded-2xl bg-slate-200" />
          <div className="h-44 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}