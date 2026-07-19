"use client";

import Link from "next/link";
import { Sparkles, Calendar, Clock, RotateCcw, Library, Compass } from "lucide-react";
import MilestoneCard from "./milestone-card";
import StudyTaskCard from "./study-task-card";

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
  status: "pending" | string;
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

interface GeneratedStudyPlanProps {
  plan: StudyPlan;
  onReset: () => void;
}

export default function GeneratedStudyPlan({ plan, onReset }: GeneratedStudyPlanProps) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const progress = plan.progressPercentage ?? 0;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
      
      {/* 1. Header Card Banner */}
      <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden shadow-xl space-y-6">
        <div className="relative z-10 space-y-3">
          <span className="inline-flex rounded-full bg-indigo-500/20 px-3.5 py-1.5 text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1 border border-indigo-500/30">
            Syllabus Generated
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight max-w-3xl">
            {plan.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-350 max-w-2xl leading-relaxed">
            {plan.summary}
          </p>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-2 max-w-xs">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Syllabus Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-indigo-400" />
            <div>
              <p className="font-semibold text-slate-400">Start Date</p>
              <p className="text-white mt-0.5">{formatDate(plan.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-amber-400" />
            <div>
              <p className="font-semibold text-slate-400">Deadline</p>
              <p className="text-white mt-0.5">{formatDate(plan.deadline)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-cyan-400" />
            <div>
              <p className="font-semibold text-slate-400">Daily Commits</p>
              <p className="text-white mt-0.5">{plan.dailyStudyMinutes} mins / day</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
            <div>
              <p className="font-semibold text-slate-400">Weekly Commits</p>
              <p className="text-white mt-0.5">{plan.daysPerWeek} days / week</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Goal Section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Primary Learning Goal
        </h3>
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {plan.goal}
        </p>
      </section>

      {/* 3. Milestones Showcase */}
      {plan.milestones.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Plan Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.milestones.map((milestone) => (
              <MilestoneCard key={milestone.milestoneId} milestone={milestone} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Daily / Scheduled Tasks */}
      {plan.tasks.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Scheduled Tasks & Syllabus
          </h3>
          <div className="space-y-3">
            {plan.tasks.map((task) => (
              <StudyTaskCard key={task.taskId} task={task} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Navigation Actions */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="text-center sm:text-left space-y-1">
          <h4 className="text-sm font-bold text-slate-800">
            Study Plan saved successfully
          </h4>
          <p className="text-xs text-slate-500">
            Track and complete tasks inside your learning cockpit workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition outline-none"
          >
            <RotateCcw className="h-4 w-4 text-slate-400" />
            Generate Another
          </button>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition"
          >
            <Library className="h-4 w-4 text-slate-400" />
            Go to My Dashboard
          </Link>

          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/10 transition"
          >
            Explore Catalog
            <Compass className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
