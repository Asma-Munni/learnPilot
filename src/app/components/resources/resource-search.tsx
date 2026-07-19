import { Search, X } from "lucide-react";

interface ResourceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResourceSearch({ value, onChange }: ResourceSearchProps) {
  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by keyword, topic or tag..."
        aria-label="Search resources"
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition duration-200"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search query"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
