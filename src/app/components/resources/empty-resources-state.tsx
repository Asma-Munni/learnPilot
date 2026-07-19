import { SlidersHorizontal } from "lucide-react";

interface EmptyResourcesStateProps {
  onReset: () => void;
}

export default function EmptyResourcesState({ onReset }: EmptyResourcesStateProps) {
  return (
    <div className="text-center bg-white border border-slate-200 rounded-2xl py-16 px-4 shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-5">
        <SlidersHorizontal className="h-6 w-6" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900">No resources found</h3>
      
      <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
        We couldn&apos;t find any learning resources matching your search query or selected filters. Try adjusting your settings or clearing the filters.
      </p>
      
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:bg-indigo-700 outline-none focus-visible:ring-4 focus-visible:ring-indigo-100"
      >
        Reset All Filters
      </button>
    </div>
  );
}
