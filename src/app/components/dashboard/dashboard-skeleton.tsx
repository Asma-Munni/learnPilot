"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-6 w-48 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 rounded-xl bg-slate-200" />
          <div className="h-10 w-28 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-32 rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Table / List Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
              <div className="space-y-2">
                <div className="h-4 w-60 rounded bg-slate-200" />
                <div className="h-3 w-32 rounded bg-slate-200" />
              </div>
              <div className="h-8 w-16 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
