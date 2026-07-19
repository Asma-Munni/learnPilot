import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface ResourceFiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  categories: string[];
  levels: string[];
  types: string[];
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export default function ResourceFilters({
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedType,
  onTypeChange,
  categories,
  levels,
  types,
  onClearAll,
  hasActiveFilters,
}: ResourceFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center w-full lg:w-auto">
      
      {/* Category Filter */}
      <div className="relative w-full sm:w-48">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
          className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Difficulty Level Filter */}
      <div className="relative w-full sm:w-44">
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          aria-label="Filter by difficulty level"
          className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition cursor-pointer"
        >
          <option value="all">All Levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl} className="capitalize">
              {lvl}
            </option>
          ))}
        </select>
        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Resource Type Filter */}
      <div className="relative w-full sm:w-44">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          aria-label="Filter by resource type"
          className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition cursor-pointer"
        >
          <option value="all">All Types</option>
          {types.map((type) => (
            <option key={type} value={type} className="capitalize">
              {type}
            </option>
          ))}
        </select>
        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearAll}
          className="flex items-center gap-1.5 w-full sm:w-auto justify-center px-4 py-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition duration-200 border border-red-100"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear All
        </button>
      )}

    </div>
  );
}
