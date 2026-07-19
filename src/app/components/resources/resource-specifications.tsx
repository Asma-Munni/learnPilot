import { Globe, Award, FileText, BarChart3, Clock, Calendar } from "lucide-react";
import { LearningResource } from "@/app/types/resource";

interface ResourceSpecificationsProps {
  resource: LearningResource;
}

export default function ResourceSpecifications({ resource }: ResourceSpecificationsProps) {
  const {
    resourceType,
    level,
    estimatedMinutes,
    publishedAt,
    language = "English",
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const specItems = [
    {
      label: "Language",
      value: language,
      icon: Globe,
      iconColor: "text-cyan-500",
    },
    {
      label: "Certificate",
      value: certificateAvailable ? "Yes, Available" : "No Certificate",
      icon: Award,
      iconColor: "text-amber-500",
    },
    {
      label: "Format",
      value: resourceType,
      icon: FileText,
      iconColor: "text-indigo-500",
      className: "capitalize",
    },
    {
      label: "Difficulty Level",
      value: level,
      icon: BarChart3,
      iconColor: "text-indigo-500",
      className: "capitalize",
    },
    {
      label: "Study Duration",
      value: formatDuration(estimatedMinutes),
      icon: Clock,
      iconColor: "text-cyan-500",
    },
    {
      label: "Published On",
      value: formatDate(publishedAt),
      icon: Calendar,
      iconColor: "text-slate-500",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3">
        Specifications
      </h3>
      
      <ul className="space-y-4">
        {specItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={idx} className="flex items-center gap-3.5 text-sm">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 ${item.iconColor}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className={`font-bold text-slate-800 ${item.className || ""}`}>
                  {item.value}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
