import { CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { LearningResource } from "@/app/types/resource";

interface ResourceOverviewProps {
  resource: LearningResource;
}

export default function ResourceOverview({ resource }: ResourceOverviewProps) {
  const {
    fullDescription,
    learningOutcomes = [],
    prerequisites = [],
    instructorName,
    instructorImage,
  } = resource;

  return (
    <div className="space-y-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      
      {/* Overview/Description */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          Course Overview
        </h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
          {fullDescription}
        </p>
      </section>

      {/* Learning Outcomes */}
      {learningOutcomes.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            What You Will Learn
          </h3>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {learningOutcomes.map((outcome, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-600 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Requirements/Prerequisites */}
      {prerequisites.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            Prerequisites
          </h3>
          
          <ul className="space-y-2.5">
            {prerequisites.map((req, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-600 leading-relaxed">
                <AlertCircle className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Instructor Box */}
      {instructorName && (
        <section className="pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            About the Instructor
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-5">
            {instructorImage ? (
              <img
                src={instructorImage}
                alt={instructorName}
                className="h-14 w-14 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700 shrink-0">
                {instructorName.charAt(0)}
              </span>
            )}
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900">
                  {instructorName}
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-100 text-indigo-700 uppercase">
                  <ShieldCheck className="h-3 w-3" /> Verifed Expert
                </span>
              </div>
              
              <p className="text-xs text-slate-500 font-medium">
                Senior Curriculum Architect & Industry Mentor
              </p>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Professional educator with over 10 years of software development experience. Focused on developing project-driven learning resources that help engineers stay current.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
