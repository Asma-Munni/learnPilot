"use client";

import { FileText, SearchCode, XCircle } from "lucide-react";
import Link from "next/link";

interface EmptyManageResourcesStateProps {
  isFiltered: boolean;
  onClear?: () => void;
}

export default function EmptyManageResourcesState({
  isFiltered,
  onClear,
}: EmptyManageResourcesStateProps) {
  if (isFiltered) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
          <SearchCode className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800">
            No matching resources
          </h3>
          <p className="text-sm text-slate-500">
            Your search query or status filter did not return any records. Try clearing or relaxing your filters.
          </p>
        </div>
        {onClear && (
          <div>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition outline-none"
            >
              <XCircle className="h-4 w-4 text-slate-400" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <FileText className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800">
          No resources created
        </h3>
        <p className="text-sm text-slate-500">
          You haven&apos;t added any learning materials to the catalog yet. Begin by uploading your first syllabus, course, or tutorial guide.
        </p>
      </div>
      <div className="pt-2">
        <Link
          href="/items/add"
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/10 transition"
        >
          Create Resource
        </Link>
      </div>
    </div>
  );
}
