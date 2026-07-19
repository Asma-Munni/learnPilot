"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlusCircle, Compass, ListTodo, AlertTriangle, BookOpen, CheckSquare, Edit3, Eye, RefreshCw } from "lucide-react";
import Link from "next/link";
import DashboardStatCard from "./dashboard-stat-card";
import RecentResources from "./recent-resources";
import DashboardSkeleton from "./dashboard-skeleton";
import { LearningResource } from "@/app/types/resource";

export default function InstructorDashboard() {
  const { data: response, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["instructor-resources"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/v1/resources/my-resources", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    let errorMsg = "Unable to connect to the resource catalog service.";
    if (axios.isAxiosError(error)) {
      errorMsg = error.response?.data?.message || error.message || errorMsg;
    } else if (error instanceof Error) {
      errorMsg = error.message;
    }

    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-red-900">
            Failed to Load Dashboard Data
          </h3>
          <p className="text-sm text-red-700 leading-relaxed">
            {errorMsg}
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isRefetching}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/10 transition disabled:opacity-60 outline-none"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const resources = (response?.data || []) as LearningResource[];

  // Calculate real summaries
  const totalResources = resources.length;
  const publishedResources = resources.filter((r) => r.status === "published").length;
  const draftResources = resources.filter((r) => r.status === "draft").length;
  const totalViews = resources.reduce((sum, r) => sum + (r.viewCount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Quick Action Grid */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Instructor Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/items/add"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-600/15 hover:bg-indigo-700 transition outline-none"
          >
            <PlusCircle className="h-4 w-4" />
            Add Resource
          </Link>
          <Link
            href="/items/manage"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition outline-none"
          >
            <ListTodo className="h-4 w-4" />
            Manage Resources
          </Link>
          <Link
            href="/resources"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition outline-none"
          >
            <Compass className="h-4 w-4" />
            Explore Catalog
          </Link>
        </div>
      </section>

      {/* Stats Cards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardStatCard
          label="Total Resources"
          value={totalResources}
          icon={BookOpen}
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-600"
        />
        <DashboardStatCard
          label="Published Resources"
          value={publishedResources}
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

      {/* Recent Resources list */}
      <RecentResources resources={resources} />
    </div>
  );
}
