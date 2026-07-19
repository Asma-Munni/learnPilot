import ResourceCard from "@/app/components/resources/resource-card";
import { mockResources } from "@/lib/mock-resources";

interface RelatedResourcesProps {
  currentResourceId: string;
  category: string;
}

export default function RelatedResources({
  currentResourceId,
  category,
}: RelatedResourcesProps) {
  // Query resources in same category, exclude active item, cap at 4 results
  const related = mockResources
    .filter((res) => res.category === category && res.resourceId !== currentResourceId)
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
