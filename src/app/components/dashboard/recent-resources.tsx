"use client";

import Link from "next/link";
import { Eye, Settings, FileText, ArrowUpRight } from "lucide-react";
import { LearningResource } from "@/app/types/resource";

interface RecentResourcesProps {
  resources: LearningResource[];
}

export default function RecentResources({ resources }: RecentResourcesProps) {
  const recentItems = [...resources]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

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

  if (recentItems.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
          <FileText className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800">
            No resources created yet
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You haven&apos;t added any learning materials to the catalog. Get started by creating your first course or guide.
          </p>
        </div>
        <div>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 transition"
          >
            Create Your First Resource
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Recent Resources
        </h3>
        <Link
          href="/items/manage"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-1"
        >
          View All ({resources.length})
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-bold text-slate-400 border-b border-slate-100 uppercase tracking-wider">
              <th className="pb-3">Title</th>
              <th className="pb-3 hidden sm:table-cell">Category</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 hidden md:table-cell">Created Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentItems.map((item) => (
              <tr key={item.resourceId} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 pr-3 font-bold text-slate-800 max-w-xs truncate">
                  {item.title}
                </td>
                <td className="py-3.5 text-slate-500 hidden sm:table-cell">
                  {item.category}
                </td>
                <td className="py-3.5">
                  <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-semibold capitalize border ${
                    item.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-amber-50 text-amber-700 border-amber-100"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 text-slate-400 hidden md:table-cell">
                  {formatDate(item.publishedAt)}
                </td>
                <td className="py-3.5 text-right space-x-1.5 shrink-0">
                  <Link
                    href={`/resources/${item.resourceId}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-55 transition"
                    title="View Resource Detail"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </Link>
                  <Link
                    href="/items/manage"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-55 transition"
                    title="Manage Resource"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Manage</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
