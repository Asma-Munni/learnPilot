"use client";

import Link from "next/link";
import { Calendar, Clock, Bookmark, ArrowUpRight } from "lucide-react";

interface StudyTask {
  taskId: string;
  title: string;
  description: string;
  scheduledDate: string;
  estimatedMinutes: number;
  resourceIds?: string[];
  status: "pending" | string;
}

interface StudyTaskCardProps {
  task: StudyTask;
}

export default function StudyTaskCard({ task }: StudyTaskCardProps) {
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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-indigo-100 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-2 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider border border-amber-100">
            {task.status}
          </span>
          <h4 className="text-sm font-bold text-slate-800 truncate">
            {task.title}
          </h4>
        </div>
        
        <p className="text-xs text-slate-500 leading-relaxed">
          {task.description}
        </p>

        {/* Resources Badges */}
        {task.resourceIds && task.resourceIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Bookmark className="h-3 w-3" />
              Resources:
            </span>
            {task.resourceIds.map((resId) => (
              <Link
                key={resId}
                href={`/resources/${resId}`}
                target="_blank"
                className="inline-flex items-center gap-0.5 rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 hover:bg-indigo-100 transition border border-indigo-100"
              >
                {resId}
                <ArrowUpRight className="h-2.5 w-2.5" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t border-slate-100 md:border-0 pt-3 md:pt-0 gap-2 text-xs text-slate-500 shrink-0">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="font-semibold">{formatDate(task.scheduledDate)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-slate-400 shrink-0" />
          <span>{task.estimatedMinutes} mins</span>
        </div>
      </div>
    </div>
  );
}
