"use client";

import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ResourceSearch from "@/app/components/resources/resource-search";
import ResourceFilters from "@/app/components/resources/resource-filters";
import ResourceSort from "@/app/components/resources/resource-sort";
import Pagination from "@/app/components/resources/pagination";
import EmptyResourcesState from "@/app/components/resources/empty-resources-state";
import ResourceCard from "@/app/components/resources/resource-card";
import ResourceCardSkeleton from "@/app/components/resources/resource-card-skeleton";
import { mockResources } from "@/lib/mock-resources";
import { LearningResource } from "@/app/types/resource";

const ITEMS_PER_PAGE = 8;

export default function ResourcesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Categories list extracted from mock data to keep filter populated
  const categories = useMemo(() => {
    return Array.from(new Set(mockResources.map((r) => r.category))).sort();
  }, []);

  const levels = ["beginner", "intermediate", "advanced"];
  const types = ["course", "tutorial", "article", "guide"];

  // State wrappers to reset page number to 1 on parameter changes
  const handleSearchQueryChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handleLevelChange = (val: string) => {
    setSelectedLevel(val);
    setCurrentPage(1);
  };

  const handleTypeChange = (val: string) => {
    setSelectedType(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  // Fetch data dynamically from the Express backend API
  const { data, isLoading: isQueryLoading, refetch } = useQuery({
    queryKey: [
      "resources",
      searchQuery,
      selectedCategory,
      selectedLevel,
      selectedType,
      sortBy,
      currentPage,
    ],
    queryFn: async () => {
      const params: Record<string, string | number> = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sortBy,
      };

      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== "all") params.category = selectedCategory;
      if (selectedLevel !== "all") params.level = selectedLevel;
      if (selectedType !== "all") params.resourceType = selectedType;

      const res = await axios.get("http://localhost:5000/api/v1/resources", { params });
      return res.data;
    },
  });

  const paginatedResources = (data?.data || []) as LearningResource[];
  const totalItems = data?.pagination?.totalItems || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedLevel !== "all" ||
    selectedType !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedType("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const triggerSkeletonLoader = () => {
    setIsLoading(true);
    void refetch().finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  };

  const showSkeletons = isQueryLoading || isLoading;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Block */}
        <header className="mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <span className="inline-flex rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2.5">
              Curriculum Directory
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Learning Resources
            </h1>
            <p className="mt-2 text-base text-slate-500">
              Discover advanced tutorials, guides, and courses compiled to build and accelerate your skills.
            </p>
          </div>

          <button
            type="button"
            onClick={triggerSkeletonLoader}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 outline-none"
          >
            <RefreshCw className={`h-4 w-4 text-slate-500 ${showSkeletons ? "animate-spin" : ""}`} />
            Refresh Catalog
          </button>
        </header>

        {/* Search & Filter Toolbar */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            
            {/* Search Input Component */}
            <ResourceSearch value={searchQuery} onChange={handleSearchQueryChange} />

            {/* Filter Dropdowns Component */}
            <ResourceFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedLevel={selectedLevel}
              onLevelChange={handleLevelChange}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              categories={categories}
              levels={levels}
              types={types}
              onClearAll={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Sort Selector Component */}
            <ResourceSort value={sortBy} onChange={handleSortChange} />

          </div>
        </section>

        {/* Resources Grid & Pagination Output */}
        {showSkeletons ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
              <ResourceCardSkeleton key={idx} />
            ))}
          </section>
        ) : paginatedResources.length > 0 ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedResources.map((resource) => (
                <ResourceCard key={resource.resourceId} resource={resource} />
              ))}
            </section>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <EmptyResourcesState onReset={handleResetFilters} />
        )}

      </div>
    </main>
  );
}
