"use client";

interface ResourceStatusBadgeProps {
  status: "draft" | "published" | string;
}

export default function ResourceStatusBadge({ status }: ResourceStatusBadgeProps) {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold capitalize border ${
        isPublished
          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
          : "bg-amber-50 text-amber-700 border-amber-100"
      }`}
    >
      {status}
    </span>
  );
}
