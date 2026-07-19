"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, BrainCircuit } from "lucide-react";
import WeakTopicsInput from "./weak-topics-input";

const formSchema = z.object({
  goal: z.string().trim().min(1, "Goal must not be empty"),
  currentLevel: z.enum(["beginner", "intermediate", "advanced"] as const),
  deadline: z.string().refine((val) => {
    const d = new Date(val);
    return !isNaN(d.getTime()) && d > new Date();
  }, {
    message: "Deadline must be a valid future date",
  }),
  dailyStudyMinutes: z.coerce
    .number()
    .int()
    .min(15, "Daily study commits must be at least 15 minutes")
    .max(480, "Daily study commits cannot exceed 480 minutes"),
  daysPerWeek: z.coerce
    .number()
    .int()
    .min(1, "Days per week must be at least 1 day")
    .max(7, "Days per week cannot exceed 7 days"),
  weakTopics: z.array(z.string()),
  preferredLearningStyle: z.enum(["visual", "reading", "practical", "mixed"] as const),
});

type FormValues = z.infer<typeof formSchema>;

interface StudyPlannerFormProps {
  onSubmit: (values: FormValues) => void;
  isSubmitting: boolean;
}

export default function StudyPlannerForm({ onSubmit, isSubmitting }: StudyPlannerFormProps) {
  // Get tomorrow's date string as minimum for deadline input
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: "",
      currentLevel: "beginner",
      deadline: getTomorrowDate(),
      dailyStudyMinutes: 60,
      daysPerWeek: 5,
      weakTopics: [],
      preferredLearningStyle: "mixed",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            AI Study Planner Parameter Settings
          </h2>
          <p className="text-xs text-slate-500">
            Set your constraints and preferences to build a syllabus map.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Goal */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="goal" className="block text-sm font-bold text-slate-700">
            What is your learning goal?
          </label>
          <textarea
            id="goal"
            rows={3}
            {...register("goal")}
            placeholder="e.g. Master fullstack React development and node backend fundamentals."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.goal && (
            <p className="text-xs font-semibold text-red-500">{errors.goal.message}</p>
          )}
        </div>

        {/* Current Level */}
        <div className="space-y-2">
          <label htmlFor="currentLevel" className="block text-sm font-bold text-slate-700">
            Current Level
          </label>
          <select
            id="currentLevel"
            {...register("currentLevel")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          >
            <option value="beginner">Beginner (No background)</option>
            <option value="intermediate">Intermediate (Some experience)</option>
            <option value="advanced">Advanced (Deep knowledge)</option>
          </select>
          {errors.currentLevel && (
            <p className="text-xs font-semibold text-red-500">{errors.currentLevel.message}</p>
          )}
        </div>

        {/* Learning Style */}
        <div className="space-y-2">
          <label htmlFor="preferredLearningStyle" className="block text-sm font-bold text-slate-700">
            Preferred Learning Style
          </label>
          <select
            id="preferredLearningStyle"
            {...register("preferredLearningStyle")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          >
            <option value="mixed">Mixed style</option>
            <option value="visual">Visual (Videos & Diagrams)</option>
            <option value="reading">Reading (Articles & Docs)</option>
            <option value="practical">Practical (Projects & Code)</option>
          </select>
          {errors.preferredLearningStyle && (
            <p className="text-xs font-semibold text-red-500">{errors.preferredLearningStyle.message}</p>
          )}
        </div>

        {/* Daily Study Minutes */}
        <div className="space-y-2">
          <label htmlFor="dailyStudyMinutes" className="block text-sm font-bold text-slate-700">
            Daily Study Commits (Minutes)
          </label>
          <input
            id="dailyStudyMinutes"
            type="number"
            {...register("dailyStudyMinutes", { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.dailyStudyMinutes && (
            <p className="text-xs font-semibold text-red-500">{errors.dailyStudyMinutes.message}</p>
          )}
        </div>

        {/* Days Per Week */}
        <div className="space-y-2">
          <label htmlFor="daysPerWeek" className="block text-sm font-bold text-slate-700">
            Study Days Per Week
          </label>
          <input
            id="daysPerWeek"
            type="number"
            {...register("daysPerWeek", { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.daysPerWeek && (
            <p className="text-xs font-semibold text-red-500">{errors.daysPerWeek.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div className="space-y-2">
          <label htmlFor="deadline" className="block text-sm font-bold text-slate-700">
            Target Completion Deadline
          </label>
          <input
            id="deadline"
            type="date"
            {...register("deadline")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.deadline && (
            <p className="text-xs font-semibold text-red-500">{errors.deadline.message}</p>
          )}
        </div>

        {/* Weak Topics */}
        <div className="space-y-2 md:col-span-2">
          <Controller
            name="weakTopics"
            control={control}
            render={({ field }) => (
              <WeakTopicsInput value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition disabled:opacity-60 outline-none"
        >
          <Sparkles className="h-4.5 w-4.5 shrink-0" />
          <span>{isSubmitting ? "Generating Study Plan..." : "Generate AI Study Plan"}</span>
        </button>
      </div>

    </form>
  );
}
