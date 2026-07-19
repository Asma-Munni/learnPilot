import { Star, MessageSquare } from "lucide-react";
import { mockReviews } from "@/lib/mock-reviews";

interface ReviewsSectionProps {
  resourceId: string;
  averageRating: number;
  ratingCount: number;
}

export default function ReviewsSection({
  resourceId,
  averageRating,
  ratingCount,
}: ReviewsSectionProps) {
  // Filter reviews matching current resourceId
  const reviews = mockReviews.filter((rev) => rev.resourceId === resourceId);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper to render star rating SVGs
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => {
      const isFilled = idx < Math.round(rating);
      return (
        <Star
          key={idx}
          className={`h-4 w-4 ${
            isFilled
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200 fill-slate-150"
          }`}
        />
      );
    });
  };

  // Calculate mock ratings distribution for UI aesthetics
  const distribution = [
    { stars: 5, percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === 5).length / reviews.length) * 100 : 80 },
    { stars: 4, percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === 4).length / reviews.length) * 100 : 15 },
    { stars: 3, percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === 3).length / reviews.length) * 100 : 5 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-indigo-600" />
        Student Reviews & Ratings
      </h3>

      {/* Summary Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mb-8 pb-6 border-b border-slate-100">
        
        {/* Rating Score Card */}
        <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-4xl font-extrabold text-slate-900 leading-none">
            {averageRating.toFixed(1)}
          </p>
          <div className="flex gap-1 my-2.5">
            {renderStars(averageRating)}
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {ratingCount} Global ratings
          </p>
        </div>

        {/* Rating Distribution Bars */}
        <div className="flex flex-col justify-center space-y-2.5">
          {distribution.map((dist) => (
            <div key={dist.stars} className="flex items-center gap-3 text-xs font-semibold">
              <span className="w-10 text-slate-500">{dist.stars} stars</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-slate-400">{Math.round(dist.percentage)}%</span>
            </div>
          ))}
        </div>

      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <ul className="space-y-6 divide-y divide-slate-100">
          {reviews.map((review, idx) => (
            <li key={review.reviewId} className={`flex gap-4 items-start ${idx > 0 ? "pt-6" : ""}`}>
              {/* Reviewer image */}
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="h-10 w-10 shrink-0 rounded-full object-cover border border-slate-200"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop";
                }}
              />
              
              <div className="min-w-0 flex-1">
                {/* Header review row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">
                    {review.reviewerName}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {formatDate(review.createdAt)}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 my-1.5">
                  {renderStars(review.rating)}
                </div>

                {/* Comments text */}
                <p className="text-sm text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                  {review.comment}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        /* Empty Reviews State */
        <div className="text-center py-8 text-slate-400">
          <p className="text-sm font-medium">No detailed reviews have been left for this resource yet.</p>
          <p className="text-xs text-slate-400 mt-1">Be one of the first students to write a review after starting.</p>
        </div>
      )}
    </section>
  );
}
