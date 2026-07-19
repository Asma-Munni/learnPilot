export default function ResourceCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Aspect Ratio Image Placeholder */}
      <div className="relative aspect-[16/9] w-full bg-slate-200 border-b border-slate-100" />

      {/* Content Body Placeholder */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Rating and Difficulty Row */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-slate-200 rounded-md" />
          <div className="h-5 w-24 bg-slate-200 rounded-full" />
        </div>

        {/* Title Placeholder */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-200 rounded-md" />
          <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
        </div>

        {/* Description Placeholder */}
        <div className="space-y-2 flex-1">
          <div className="h-3 w-full bg-slate-200 rounded-md" />
          <div className="h-3 w-full bg-slate-200 rounded-md" />
          <div className="h-3 w-2/3 bg-slate-200 rounded-md" />
        </div>

        {/* Footer Divider & Metadata Placeholder */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="h-4 w-12 bg-slate-200 rounded-md" />
          <div className="h-4 w-20 bg-slate-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
