import { ArrowUpDown } from "lucide-react";

interface ResourceSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResourceSort({ value, onChange }: ResourceSortProps) {
  return (
    <div className="relative w-full lg:w-48">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort resources"
        className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="rating">Highest Rated</option>
        <option value="duration-asc">Shortest Study</option>
        <option value="duration-desc">Longest Study</option>
        <option value="title-asc">Title A–Z</option>
      </select>
      <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
