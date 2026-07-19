"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, BrainCircuit } from "lucide-react";

export default function StudyPlanGeneratingState() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Understanding learning goal",
    "Matching useful resources",
    "Creating milestones",
    "Building daily tasks",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-lg space-y-8 animate-in fade-in duration-300">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-2">
        <BrainCircuit className="h-10 w-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Generating AI Study Plan
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Our Agentic AI planner is analyzing your goals, scanning database catalog resources, and compiling a tailored learning path.
        </p>
      </div>

      <div className="max-w-xs mx-auto text-left space-y-4 pt-4 border-t border-slate-100">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-colors duration-300 ${
                isDone || isActive ? "text-slate-800" : "text-slate-350"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              ) : isActive ? (
                <Loader2 className="h-5 w-5 text-indigo-600 animate-spin shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-slate-200 shrink-0" />
              )}
              <span className={`text-sm font-semibold ${isActive ? "font-bold text-indigo-600" : ""}`}>
                {step}
                {isActive && "..."}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
