"use client";

import { useState } from "react";

interface ResourceGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  title: string;
}

export default function ResourceGallery({
  mainImage,
  galleryImages = [],
  title,
}: ResourceGalleryProps) {
  const allImages = galleryImages.length > 0 ? galleryImages : [mainImage];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div className="space-y-4">
      {/* Active Main Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
        <img
          src={activeImage}
          alt={`Preview of ${title}`}
          className="h-full w-full object-cover transition-all duration-300"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Thumbnail select list (Only display if multiple images exist) */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1" aria-label="Image gallery thumbnails">
          {allImages.map((img, idx) => {
            const isActive = img === activeImage;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                aria-label={`View gallery image ${idx + 1}`}
                className={`relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-50 transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? "border-indigo-600 shadow-md scale-[1.02]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
