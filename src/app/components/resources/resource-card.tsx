import { Star, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { LearningResource } from "@/app/types/resource";

interface ResourceCardProps {
  resource: LearningResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const {
    resourceId,
    title,
    shortDescription,
    imageUrl,
    category,
    resourceType,
    level,
    estimatedMinutes,
    averageRating,
    ratingCount,
  } = resource;

  // Convert minutes into human-readable hours and minutes format
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  // Get difficulty level badge colors
  const getLevelStyles = (lvl: string) => {
    switch (lvl) {
      case "beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "intermediate":
        return "bg-cyan-50 text-cyan-700 border-cyan-100";
      case "advanced":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <article className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200">
      {/* Resource Image Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
          }}
        />
        
        {/* Category & Type Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg bg-white/90 text-slate-800 backdrop-blur shadow-sm uppercase tracking-wider">
            {category}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-600 text-white shadow-sm uppercase tracking-wide">
            {resourceType}
          </span>
        </div>
      </div>

      {/* Card Content body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Rating and Difficulty */}
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500 mb-3">
          <div className="flex items-center gap-1" aria-label={`Rating: ${averageRating} stars out of 5`}>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-900">{averageRating.toFixed(1)}</span>
            <span className="font-medium text-slate-400">({ratingCount})</span>
          </div>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${getLevelStyles(level)} uppercase tracking-wider`}>
            {level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          <Link href={`/resources/${resourceId}`} className="outline-none focus-visible:underline">
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5 flex-1">
          {shortDescription}
        </p>

        {/* Footer Meta info & Action */}
        <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Clock className="h-4 w-4 text-cyan-500" />
            <span>{formatDuration(estimatedMinutes)}</span>
          </div>

          <Link
            href={`/resources/${resourceId}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group/btn transition hover:text-indigo-700"
          >
            <span>View Details</span>
            <ChevronRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
