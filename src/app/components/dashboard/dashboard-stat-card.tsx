"use client";

import { ComponentType } from "react";

interface DashboardStatCardProps {
  label: string;
  value: number | string;
  icon?: ComponentType<{ className?: string }>;
  iconBgColor?: string;
  iconTextColor?: string;
}

export default function DashboardStatCard({
  label,
  value,
  icon: Icon,
  iconBgColor = "bg-indigo-50",
  iconTextColor = "text-indigo-600",
}: DashboardStatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl font-black text-slate-900">
          {value}
        </p>
      </div>

      {Icon && (
        <div className={`h-12 w-12 rounded-2xl ${iconBgColor} ${iconTextColor} flex items-center justify-center shrink-0`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
