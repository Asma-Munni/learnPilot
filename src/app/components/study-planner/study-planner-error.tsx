"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface StudyPlannerErrorProps {
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
}

export default function StudyPlannerError({
  message,
  onRetry,
  isRetrying,
}: StudyPlannerErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-5 animate-in fade-in duration-200">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-red-900">
          Plan Generation Failed
        </h3>
        <p className="text-sm text-red-700 leading-relaxed max-w-md mx-auto">
          {message}
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/10 transition disabled:opacity-60 outline-none"
        >
          <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
