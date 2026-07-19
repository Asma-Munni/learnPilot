"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { LearningResource } from "@/app/types/resource";
import ResourceStatusBadge from "./resource-status-badge";

interface ManageResourcesTableProps {
  resources: LearningResource[];
  onDeleteClick: (resource: LearningResource) => void;
}

export default function ManageResourcesTable({
  resources,
  onDeleteClick,
}: ManageResourcesTableProps) {
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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-bold text-slate-400 border-b border-slate-100 uppercase tracking-wider">
              <th className="pb-3 pr-2">Cover</th>
              <th className="pb-3 pr-2">Title</th>
              <th className="pb-3 pr-2">Category</th>
              <th className="pb-3 pr-2">Level</th>
              <th className="pb-3 pr-2">Status</th>
              <th className="pb-3 pr-2">Duration</th>
              <th className="pb-3 pr-2">Views</th>
              <th className="pb-3 pr-2">Created Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {resources.map((item) => (
              <tr key={item.resourceId} className="group hover:bg-slate-50/50 transition-colors">
                {/* Image Cover */}
                <td className="py-4 pr-3 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-10 w-16 object-cover rounded-lg border border-slate-100 bg-slate-50 shrink-0"
                  />
                </td>
                
                {/* Title */}
                <td className="py-4 pr-3 font-bold text-slate-800 max-w-xs truncate">
                  {item.title}
                </td>

                {/* Category */}
                <td className="py-4 pr-3 text-slate-500">
                  {item.category}
                </td>

                {/* Level */}
                <td className="py-4 pr-3 text-slate-500 capitalize">
                  {item.level}
                </td>

                {/* Status */}
                <td className="py-4 pr-3">
                  <ResourceStatusBadge status={item.status} />
                </td>

                {/* Duration */}
                <td className="py-4 pr-3 text-slate-500">
                  {item.estimatedMinutes} mins
                </td>

                {/* Views */}
                <td className="py-4 pr-3 text-slate-500 font-semibold">
                  {item.viewCount || 0}
                </td>

                {/* Created Date */}
                <td className="py-4 pr-3 text-slate-400">
                  {formatDate(item.publishedAt)}
                </td>

                {/* Actions */}
                <td className="py-4 text-right space-x-1.5 shrink-0 whitespace-nowrap">
                  <Link
                    href={`/resources/${item.resourceId}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition outline-none"
                    title="View Created Resource Details"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDeleteClick(item)}
                    className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition outline-none"
                    title="Delete Resource"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
