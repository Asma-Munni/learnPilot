"use client";

export default function ResourceDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Header Area Placeholder */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 space-y-6">
        <div className="h-4 w-28 rounded bg-slate-700" />
        <div className="space-y-3">
          <div className="h-10 w-2/3 rounded bg-slate-700" />
          <div className="h-4 w-1/2 rounded bg-slate-700" />
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
          <div className="h-4 w-24 rounded bg-slate-700" />
          <div className="h-4 w-24 rounded bg-slate-700" />
          <div className="h-4 w-24 rounded bg-slate-700" />
        </div>
      </div>

      {/* Main Two-Column Layout Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-[2.25fr_1fr] gap-8">
        
        {/* Left Column Placeholder */}
        <div className="space-y-8">
          {/* Gallery Placeholder */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="h-96 w-full rounded-xl bg-slate-200" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-16 rounded bg-slate-200" />
              ))}
            </div>
          </div>

          {/* Overview Placeholder */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="h-6 w-40 rounded bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) Placeholder */}
        <div className="space-y-6">
          {/* CTA Box Placeholder */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="h-12 w-full rounded-xl bg-slate-200" />
            <div className="h-10 w-full rounded-xl bg-slate-200" />
          </div>

          {/* Specifications Placeholder */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="h-5 w-32 rounded bg-slate-200" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                  <div className="h-4 w-28 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
