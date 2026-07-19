"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ResourceCard from "@/app/components/resources/resource-card";
import { LearningResource } from "@/app/types/resource";

interface RelatedResourcesProps {
  currentResourceId: string;
  category: string;
}

export default function RelatedResources({
  currentResourceId,
  category,
}: RelatedResourcesProps) {
  const { data: response } = useQuery({
    queryKey: ["related-resources", category, currentResourceId],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/v1/resources", {
        params: { category, limit: 10 },
      });
      return res.data;
    },
  });

  const allResources = (response?.data || []) as LearningResource[];

  // Filter out the current resource and select up to 4 matches
  const related = allResources
    .filter((res) => res.resourceId !== currentResourceId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="border-t border-slate-200 pt-10">
        <h3 className="text-xl font-extrabold text-slate-900">
          Related Resources
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">
          More courses and guides in the <span className="font-semibold text-indigo-600">{category}</span> category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {related.map((resource) => (
          <ResourceCard key={resource.resourceId} resource={resource} />
        ))}
      </div>
    </section>
  );
}
