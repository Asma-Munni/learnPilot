"use client";

import { Calendar, Flag } from "lucide-react";

interface Milestone {
  milestoneId: string;
  title: string;
  description: string;
  targetDate: string;
}

interface MilestoneCardProps {
  milestone: Milestone;
}

export default function MilestoneCard({ milestone }: MilestoneCardProps) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-indigo-600">
          <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Flag className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            {milestone.title}
          </h4>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          {milestone.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-xs text-slate-400">
        <Calendar className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-500">{formatDate(milestone.targetDate)}</span>
      </div>
    </div>
  );
}
