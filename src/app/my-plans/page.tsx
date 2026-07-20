"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Clock3,
  Loader2,
  Search,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { getStudyPlans } from "@/lib/study-plan-api";

export default function MyPlansPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "all" | "active" | "completed" | "archived"
  >("all");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["study-plans", search, status],
    queryFn: () =>
      getStudyPlans({
        page: 1,
        limit: 12,
        search: search.trim(),
        status,
      }),
  });

  const plans = data?.data ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Learning dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              My Study Plans
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Review your AI-generated learning plans and continue
              working toward your goals.
            </p>
          </div>

          <Link
            href="/ai/study-planner"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Create New Plan
          </Link>
        </section>

        <section className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <span className="sr-only">Search study plans</span>

            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or learning goal"
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label>
            <span className="sr-only">Filter by status</span>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "all"
                    | "active"
                    | "completed"
                    | "archived",
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="all">All plans</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </label>
        </section>

        {isLoading && (
          <div className="flex min-h-72 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        )}

        {isError && (
          <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-bold text-red-800">
              Could not load study plans
            </h2>

            <p className="mt-2 text-sm text-red-700">
              Check that the backend server is running and try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              Retry
            </button>
          </section>
        )}

        {!isLoading && !isError && plans.length === 0 && (
          <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Target className="mx-auto h-12 w-12 text-indigo-500" />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No study plans found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Create an AI-powered study plan based on your goal,
              available time and current skill level.
            </p>

            <Link
              href="/ai/study-planner"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
            >
              Generate Study Plan
            </Link>
          </section>
        )}

        {!isLoading && !isError && plans.length > 0 && (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.planId}
                className="flex min-h-80 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold capitalize text-indigo-700">
                    {plan.status}
                  </span>

                  <span className="text-sm font-bold text-cyan-700">
                    {plan.progressPercentage}%
                  </span>
                </div>

                <h2 className="mt-5 line-clamp-2 text-xl font-bold text-slate-950">
                  {plan.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {plan.summary}
                </p>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-indigo-600" />
                    Deadline:{" "}
                    {new Date(plan.deadline).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-cyan-600" />
                    {plan.dailyStudyMinutes} minutes per day
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-600" />
                    {plan.tasks.length} learning tasks
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/my-plans/${plan.planId}`}
                    className="flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
                  >
                    View Plan Details
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}