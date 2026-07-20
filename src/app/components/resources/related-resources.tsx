"use client";

import { useQuery } from "@tanstack/react-query";

import ResourceCard from "@/app/components/resources/resource-card";
import type { LearningResource } from "@/app/types/resource";
import { apiClient } from "@/lib/api-client";

interface RelatedResourcesProps {
  currentResourceId: string;
  category: string;
}

interface ResourcesResponse {
  success: boolean;
  message: string;
  data: LearningResource[];
}

export default function RelatedResources({
  currentResourceId,
  category,
}: RelatedResourcesProps) {
  const { data: response } = useQuery({
    queryKey: [
      "related-resources",
      category,
      currentResourceId,
    ],

    queryFn: async () => {
      const result =
        await apiClient.get<ResourcesResponse>(
          "/api/v1/resources",
          {
            params: {
              category,
              limit: 10,
            },
          },
        );

      return result.data;
    },

    enabled: Boolean(
      currentResourceId &&
        category,
    ),
  });

  const allResources =
    response?.data ?? [];

  const relatedResources =
    allResources
      .filter(
        (resource) =>
          resource.resourceId !==
          currentResourceId,
      )
      .slice(0, 4);

  if (
    relatedResources.length === 0
  ) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="border-t border-slate-200 pt-10">
        <h3 className="text-xl font-extrabold text-slate-900">
          Related Resources
        </h3>

        <p className="mt-1.5 text-sm text-slate-500">
          More courses and guides in
          the{" "}
          <span className="font-semibold text-indigo-600">
            {category}
          </span>{" "}
          category.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relatedResources.map(
          (resource) => (
            <ResourceCard
              key={
                resource.resourceId
              }
              resource={resource}
            />
          ),
        )}
      </div>
    </section>
  );
}