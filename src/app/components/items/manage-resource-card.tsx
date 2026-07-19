"use client";

import Link from "next/link";
import { Eye, Trash2, Clock, Calendar, BarChart3, GraduationCap } from "lucide-react";
import { LearningResource } from "@/app/types/resource";
import ResourceStatusBadge from "./resource-status-badge";

interface ManageResourceCardProps {
  resource: LearningResource;
  onDeleteClick: (resource: LearningResource) => void;
}

export default function ManageResourceCard({
  resource,
  onDeleteClick,
}: ManageResourceCardProps) {
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
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
      {/* Upper Media Row */}
      <div className="flex gap-4">
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="h-16 w-24 object-cover rounded-xl border border-slate-100 shrink-0 bg-slate-50"
        />
        <div className="space-y-1 min-w-0">
          <span className="inline-flex rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
            {resource.category}
          </span>
          <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
            {resource.title}
          </h4>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 min-w-0">
          <GraduationCap className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="capitalize truncate">{resource.level} level</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <Clock className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="truncate">{resource.estimatedMinutes} mins</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <BarChart3 className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="truncate">{resource.viewCount || 0} views</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="truncate">{formatDate(resource.publishedAt)}</span>
        </div>
      </div>

      {/* Footer Status and Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        <ResourceStatusBadge status={resource.status} />

        <div className="flex gap-2">
          <Link
            href={`/resources/${resource.resourceId}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition outline-none"
            title="View Details"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View</span>
          </Link>
          <button
            type="button"
            onClick={() => onDeleteClick(resource)}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition outline-none"
            title="Delete Resource"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
