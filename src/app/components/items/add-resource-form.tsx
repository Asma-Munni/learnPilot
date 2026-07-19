"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Eye, Loader2, Sparkles } from "lucide-react";
import FormSection from "./form-section";
import ArrayInputField from "./array-input-field";
import { ALLOWED_CATEGORIES } from "@/app/types/resource";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(300, "Short description cannot exceed 300 characters."),
  fullDescription: z
    .string()
    .trim()
    .min(10, "Full description must be at least 10 characters."),
  imageUrl: z
    .string()
    .trim()
    .url("Invalid image URL format. Must start with http or https."),
  category: z
    .string()
    .trim()
    .min(1, "Category is required."),
  resourceType: z.enum(["course", "tutorial", "article", "guide"]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedMinutes: z.coerce
    .number()
    .int("Must be a whole number.")
    .positive("Estimated minutes must be a positive number."),
  price: z.coerce
    .number()
    .nonnegative("Price cannot be a negative value."),
  language: z
    .string()
    .trim()
    .min(1, "Language is required."),
  certificateAvailable: z.boolean().default(false),
  tags: z
    .array(z.string().trim().min(1))
    .min(1, "Provide at least one tag."),
  learningOutcomes: z.array(z.string().trim().min(1)).default([]),
  prerequisites: z.array(z.string().trim().min(1)).default([]),
  status: z.enum(["draft", "published"]),
});



export default function AddResourceForm() {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    resourceId: string;
    title: string;
    status: "draft" | "published";
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      imageUrl: "",
      category: "",
      resourceType: "course" as const,
      level: "beginner" as const,
      estimatedMinutes: 60,
      price: 0,
      language: "English",
      certificateAvailable: false,
      tags: [] as string[],
      learningOutcomes: [] as string[],
      prerequisites: [] as string[],
      status: "draft" as const,
    },
  });

  const tags = (watch("tags") || []) as string[];
  const learningOutcomes = (watch("learningOutcomes") || []) as string[];
  const prerequisites = (watch("prerequisites") || []) as string[];

  const handleAddTag = (item: string) => {
    setValue("tags", [...tags, item], { shouldValidate: true });
  };

  const handleRemoveTag = (index: number) => {
    setValue("tags", tags.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setServerError(null);
      const response = await axios.post("http://localhost:5000/api/v1/resources", values, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSuccessData({
          resourceId: response.data.data.resourceId,
          title: response.data.data.title,
          status: values.status,
        });

        // Invalidate resources queries cache to trigger refetch
        await queryClient.invalidateQueries({ queryKey: ["resources"] });

        reset();
      }
    } catch (err) {
      let msg = "Failed to save resource";
      if (err && typeof err === "object") {
        const axiosError = err as { response?: { data?: { message?: string } }; message?: string };
        msg = axiosError.response?.data?.message || axiosError.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setServerError(msg);
    }
  };

  if (successData) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-lg space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 mb-2">
          <CheckCircle2 className="h-10 w-10 animate-bounce" />
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {successData.status === "published"
              ? "Resource published successfully"
              : "Resource saved as draft"}
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-2">
            {successData.status === "published"
              ? `"${successData.title}" has been published to the catalog.`
              : `"${successData.title}" has been saved as a draft.`}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href={`/resources/${successData.resourceId}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 outline-none"
          >
            <Eye className="h-4 w-4" />
            View Created Resource
          </Link>
          
          <Link
            href="/items/manage"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 outline-none"
          >
            Manage Resources
          </Link>

          {successData.status === "published" && (
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 outline-none"
            >
              Go to Explore
            </Link>
          )}

          <button
            type="button"
            onClick={() => setSuccessData(null)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 outline-none"
          >
            <Sparkles className="h-4 w-4" />
            Add Another Resource
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
      
      {serverError && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm font-semibold">
            {serverError}
          </div>
        </div>
      )}

      {/* 1. Basic Details */}
      <FormSection title="1. Basic Information" description="Set up the primary lookup parameters and text categories.">
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label htmlFor="title" className="block text-sm font-bold text-slate-700">
            Resource Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="e.g. Master React 19 from Scratch"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.title && (
            <p className="text-xs font-semibold text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-bold text-slate-700">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          >
            <option value="">Select a Category</option>
            {ALLOWED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs font-semibold text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="language" className="block text-sm font-bold text-slate-700">
            Language
          </label>
          <input
            id="language"
            type="text"
            {...register("language")}
            placeholder="e.g. English"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.language && (
            <p className="text-xs font-semibold text-red-500">{errors.language.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="resourceType" className="block text-sm font-bold text-slate-700">
            Resource Type
          </label>
          <select
            id="resourceType"
            {...register("resourceType")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          >
            <option value="course">Course</option>
            <option value="tutorial">Tutorial</option>
            <option value="article">Article</option>
            <option value="guide">Guide</option>
          </select>
          {errors.resourceType && (
            <p className="text-xs font-semibold text-red-500">{errors.resourceType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="level" className="block text-sm font-bold text-slate-700">
            Difficulty Level
          </label>
          <select
            id="level"
            {...register("level")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.level && (
            <p className="text-xs font-semibold text-red-500">{errors.level.message}</p>
          )}
        </div>
      </FormSection>

      {/* 2. Content Details */}
      <FormSection title="2. Content & Media" description="Provide descriptive text details and links to graphic assets.">
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label htmlFor="shortDescription" className="block text-sm font-bold text-slate-700">
            Short Description
          </label>
          <input
            id="shortDescription"
            type="text"
            {...register("shortDescription")}
            placeholder="Summarize key features in a short sentence."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.shortDescription && (
            <p className="text-xs font-semibold text-red-500">{errors.shortDescription.message}</p>
          )}
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label htmlFor="fullDescription" className="block text-sm font-bold text-slate-700">
            Full Description
          </label>
          <textarea
            id="fullDescription"
            rows={5}
            {...register("fullDescription")}
            placeholder="Detailed course description, syllabus guidelines, and syllabus outcomes."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition resize-y"
          />
          {errors.fullDescription && (
            <p className="text-xs font-semibold text-red-500">{errors.fullDescription.message}</p>
          )}
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-bold text-slate-700">
            Main Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            {...register("imageUrl")}
            placeholder="e.g. https://images.unsplash.com/photo-..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.imageUrl && (
            <p className="text-xs font-semibold text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
      </FormSection>

      {/* 3. Metrics, Pricing & Status */}
      <FormSection title="3. Specifications & Pricing" description="Specify the duration, pricing tier, and release stage.">
        <div className="space-y-2">
          <label htmlFor="estimatedMinutes" className="block text-sm font-bold text-slate-700">
            Estimated Duration (minutes)
          </label>
          <input
            id="estimatedMinutes"
            type="number"
            {...register("estimatedMinutes")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.estimatedMinutes && (
            <p className="text-xs font-semibold text-red-500">{errors.estimatedMinutes.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-bold text-slate-700">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          />
          {errors.price && (
            <p className="text-xs font-semibold text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-bold text-slate-700">
            Release Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {errors.status && (
            <p className="text-xs font-semibold text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-8 pl-1">
          <input
            id="certificateAvailable"
            type="checkbox"
            {...register("certificateAvailable")}
            className="h-5 w-5 rounded border-slate-350 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 transition"
          />
          <label htmlFor="certificateAvailable" className="text-sm font-bold text-slate-700 select-none">
            Certificate available on completion
          </label>
        </div>
      </FormSection>

      {/* 4. Lists */}
      <FormSection title="4. Outcomes & Prerequisites" description="Enter multiple checklist items or tag topics. Press enter or click '+' to save each.">
        <ArrayInputField
          label="Catalog Tags"
          placeholder="e.g. React, Frontend, hooks"
          items={tags}
          onAddItem={(item) => handleAddTag(item)}
          onRemoveItem={(idx) => handleRemoveTag(idx)}
          error={errors.tags?.message}
        />

        <ArrayInputField
          label="Learning Outcomes"
          placeholder="e.g. Build asynchronous fetch states in React"
          items={learningOutcomes}
          onAddItem={(item) => setValue("learningOutcomes", [...learningOutcomes, item])}
          onRemoveItem={(idx) =>
            setValue(
              "learningOutcomes",
              learningOutcomes.filter((_, i) => i !== idx)
            )
          }
          error={errors.learningOutcomes?.message}
        />

        <ArrayInputField
          label="Prerequisites"
          placeholder="e.g. HTML, CSS, JavaScript fundamentals"
          items={prerequisites}
          onAddItem={(item) => setValue("prerequisites", [...prerequisites, item])}
          onRemoveItem={(idx) =>
            setValue(
              "prerequisites",
              prerequisites.filter((_, i) => i !== idx)
            )
          }
          error={errors.prerequisites?.message}
        />
      </FormSection>

      {/* Form Submission Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
        <Link
          href="/resources"
          className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 outline-none"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-60 outline-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Saving Resource...</span>
            </>
          ) : (
            <span>Publish Resource</span>
          )}
        </button>
      </div>

    </form>
  );
}
