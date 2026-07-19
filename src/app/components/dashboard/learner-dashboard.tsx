"use client";

import { Compass, GraduationCap, Sparkles, BrainCircuit } from "lucide-react";
import Link from "next/link";
import DashboardStatCard from "./dashboard-stat-card";

export default function LearnerDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardStatCard
          label="Active Study Plans"
          value={0}
          icon={GraduationCap}
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-600"
        />
        <DashboardStatCard
          label="Saved Resources"
          value={0}
          icon={Compass}
          iconBgColor="bg-cyan-50"
          iconTextColor="text-cyan-600"
        />
        <DashboardStatCard
          label="Completed Tasks"
          value={0}
          icon={GraduationCap}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
        <DashboardStatCard
          label="AI Recommendations"
          value={0}
          icon={Sparkles}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />
      </section>

      {/* Quick Action Grid */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Learner Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/resources"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-600/15 hover:bg-indigo-700 transition outline-none"
          >
            <Compass className="h-4 w-4" />
            Explore Resources
          </Link>
          <Link
            href="/ai/study-planner"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition outline-none"
          >
            <BrainCircuit className="h-4 w-4" />
            Create AI Study Plan
          </Link>
          <Link
            href="/ai/recommendations"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition outline-none"
          >
            <Sparkles className="h-4 w-4" />
            View Recommendations
          </Link>
        </div>
      </section>

      {/* Empty State Instructions */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <BrainCircuit className="h-7 w-7" />
        </div>
        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Start Your Learning Journey
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your customized study plans and learning recommendations will appear here once you begin exploring the catalog, saving guides, or generating AI study plans.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 transition"
          >
            Browse Learning Directory
          </Link>
        </div>
      </section>
    </div>
  );
}
