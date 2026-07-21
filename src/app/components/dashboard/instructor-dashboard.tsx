"use client";

import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  AlertTriangle,
  BookOpen,
  CheckSquare,
  Compass,
  Edit3,
  Eye,
  ListTodo,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

import DashboardSkeleton from "./dashboard-skeleton";
import { protectedApiClient } from "@/lib/api-client";
import { LearningResource } from "@/app/types/resource";
import DashboardStatCard from "./dashboard-stat-card";
import RecentResources from "./recent-resources";

interface ApiErrorResponse {
  message?: string;
}

interface InstructorResourcesResponse {
  success: boolean;
  message?: string;
  data: LearningResource[];
}

export default function InstructorDashboard() {
  const {
    data: response,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["instructor-my-resources"],
    queryFn: async () => {
      const result =
        await protectedApiClient.get<InstructorResourcesResponse>(
          "/resources/my-resources",
        );

      return result.data;
    },
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    let errorMessage =
      "Unable to connect to the resource catalog service.";

    if (
      isAxiosError<ApiErrorResponse>(
        error,
      )
    ) {
      errorMessage =
        error.response?.data
          ?.message ||
        error.message ||
        errorMessage;
    } else if (
      error instanceof Error
    ) {
      errorMessage =
        error.message;
    }

    return (
      <div className="mx-auto max-w-xl space-y-5 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-red-900">
            Failed to Load Dashboard Data
          </h3>

          <p className="text-sm leading-relaxed text-red-700">
            {errorMessage}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void refetch()
          }
          disabled={isRefetching}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/10 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              isRefetching
                ? "animate-spin"
                : ""
            }`}
          />

          {isRefetching
            ? "Reloading..."
            : "Try Again"}
        </button>
      </div>
    );
  }

  const resources =
    response?.data ?? [];

  const totalResources =
    resources.length;

  const publishedResources =
    resources.filter(
      (resource) =>
        resource.status ===
        "published",
    ).length;

  const draftResources =
    resources.filter(
      (resource) =>
        resource.status ===
        "draft",
    ).length;

  const totalViews =
    resources.reduce(
      (total, resource) =>
        total +
        (resource.viewCount ?? 0),
      0,
    );

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
          Instructor Quick Actions
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/items/add"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-600/15 transition hover:bg-indigo-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Resource
          </Link>

          <Link
            href="/items/manage"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ListTodo className="h-4 w-4" />
            Manage Resources
          </Link>

          <Link
            href="/resources"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Compass className="h-4 w-4" />
            Explore Catalog
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          label="Total Resources"
          value={totalResources}
          icon={BookOpen}
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-600"
        />

        <DashboardStatCard
          label="Published Resources"
          value={
            publishedResources
          }
          icon={CheckSquare}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />

        <DashboardStatCard
          label="Draft Resources"
          value={draftResources}
          icon={Edit3}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />

        <DashboardStatCard
          label="Total Views"
          value={totalViews}
          icon={Eye}
          iconBgColor="bg-cyan-50"
          iconTextColor="text-cyan-600"
        />
      </section>

      <RecentResources
        resources={resources}
      />
    </div>
  );
}