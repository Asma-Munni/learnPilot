import { Star, Clock, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LearningResource } from "@/app/types/resource";

interface ResourceDetailsHeroProps {
  resource: LearningResource;
}

export default function ResourceDetailsHero({ resource }: ResourceDetailsHeroProps) {
  const {
    title,
    shortDescription,
    category,
    resourceType,
    level,
    estimatedMinutes,
    averageRating,
    ratingCount,
    instructorName,
    instructorImage,
    certificateAvailable = false,
  } = resource;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden relative mb-8">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Back Link */}
      <Link
        href="/resources"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition mb-6 group outline-none focus-visible:underline"
      >
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
        Back to Resources
      </Link>

      <div className="relative space-y-5 max-w-4xl">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
            {category}
          </span>
          
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 uppercase tracking-wide">
            {resourceType}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          {shortDescription}
        </p>

        {/* Metadata and Rating Summary */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm pt-2 border-t border-slate-800/80">
          
          {/* Rating */}
          <div className="flex items-center gap-1.5" aria-label={`Average rating: ${averageRating} stars`}>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">{averageRating.toFixed(1)}</span>
            <span className="text-slate-400">({ratingCount} ratings)</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>{formatDuration(estimatedMinutes)}</span>
          </div>

          {/* Level */}
          <div className="flex items-center gap-1.5 text-slate-300 capitalize">
            <span className="font-semibold text-slate-400">Level:</span>
            <span>{level}</span>
          </div>

          {/* Certificate */}
          {certificateAvailable && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Certificate Available</span>
            </div>
          )}
        </div>

        {/* Instructor Avatar Card */}
        {instructorName && (
          <div className="flex items-center gap-3 pt-3">
            {instructorImage ? (
              <img
                src={instructorImage}
                alt={instructorName}
                className="h-10 w-10 rounded-full object-cover border-2 border-slate-700 shadow-sm"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-indigo-400 border border-slate-750">
                {instructorName.charAt(0)}
              </span>
            )}
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Instructor
              </p>
              <p className="text-sm font-bold text-white">
                {instructorName}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
