"use client";

export default function ManageResourcesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Placeholder */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-slate-200" />
          <div className="h-4 w-64 rounded bg-slate-200" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-slate-200" />
      </div>

      {/* Search & Filter Toolbar Placeholder */}
      <div className="h-20 rounded-2xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row gap-3">
        <div className="h-10 flex-1 rounded-xl bg-slate-200" />
        <div className="h-10 w-32 rounded-xl bg-slate-200" />
      </div>

      {/* Table Placeholder */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-16 rounded bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-48 rounded bg-slate-200" />
                  <div className="h-3.5 w-24 rounded bg-slate-200" />
                </div>
              </div>
              <div className="h-8 w-24 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
