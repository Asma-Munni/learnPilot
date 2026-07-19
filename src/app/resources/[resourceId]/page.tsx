"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PlayCircle, Bookmark, BookmarkCheck, ArrowLeft, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import ResourceDetailsHero from "@/app/components/resources/resource-details-hero";
import ResourceGallery from "@/app/components/resources/resource-gallery";
import ResourceOverview from "@/app/components/resources/resource-overview";
import ResourceSpecifications from "@/app/components/resources/resource-specifications";
import ReviewsSection from "@/app/components/resources/reviews-section";
import RelatedResources from "@/app/components/resources/related-resources";

export default function ResourceDetailsPage() {
  const params = useParams();
  const resourceId = params.resourceId as string;

  // Fetch resource details from Express backend
  const { data: response, isLoading: isQueryLoading } = useQuery({
    queryKey: ["resource", resourceId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/resources/${resourceId}`);
      return res.data;
    },
  });

  const resource = response?.data;

  // CTA States
  const [isSaved, setIsSaved] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  if (isQueryLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  // If resource not found, render a premium Not Found view
  if (!resource) {
    return (
      <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-lg w-full shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          
          <h1 className="text-2xl font-black text-slate-900">
            Resource Not Found
          </h1>
          
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            The resource ID <span className="font-semibold text-slate-700">`{resourceId}`</span> does not exist or has been removed from our catalog. Please check your URL or explore other catalog resources.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:bg-indigo-700 outline-none"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      setEnrollSuccess(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Dynamic Resource Details Hero */}
        <ResourceDetailsHero resource={resource} />

        {/* Dynamic Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.25fr_1fr] gap-8 items-start">
          
          {/* Left Main Column */}
          <div className="space-y-8">
            
            {/* Gallery Images Container */}
            <ResourceGallery
              mainImage={resource.imageUrl}
              galleryImages={resource.galleryImages}
              title={resource.title}
            />

            {/* Comprehensive Resource Description, outcomes, requirements */}
            <ResourceOverview resource={resource} />

            {/* Student Reviews & Scoreboard Component */}
            <ReviewsSection
              resourceId={resource.resourceId}
              averageRating={resource.averageRating}
              ratingCount={resource.ratingCount}
            />

          </div>

          {/* Right Sidebar Column */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* CTA action card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Access Level
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">Free Access</span>
                  <span className="text-xs text-slate-400 line-through font-semibold">$49.00</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                {enrollSuccess ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-center text-sm font-bold text-emerald-800">
                    Enrolled successfully! Ready to start.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-60 outline-none"
                  >
                    <PlayCircle className="h-5 w-5" />
                    {isEnrolling ? "Enrolling..." : "Start Learning"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold shadow-sm transition duration-200 outline-none ${
                    isSaved
                      ? "border-emerald-250 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-5 w-5" />
                      Saved to Library
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5" />
                      Save Resource
                    </>
                  )}
                </button>
              </div>

              {/* Sidebar bullet feature list */}
              <ul className="text-xs font-semibold text-slate-500 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Full lifetime access to materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Access on mobile, tablet and desktop
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Structured review checkpoints included
                </li>
              </ul>
            </div>

            {/* Specifications Component */}
            <ResourceSpecifications resource={resource} />

          </aside>

        </div>

        {/* Related resources showcase */}
        <RelatedResources
          currentResourceId={resource.resourceId}
          category={resource.category}
        />

      </div>
    </main>
  );
}
