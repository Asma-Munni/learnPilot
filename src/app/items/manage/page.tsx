"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Search, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import { LearningResource } from "@/app/types/resource";

// Import custom sub-components
import ManageResourcesHeader from "../../components/items/manage-resources-header";
import ManageResourcesTable from "../../components/items/manage-resources-table";
import ManageResourceCard from "../../components/items/manage-resource-card";
import DeleteResourceDialog from "../../components/items/delete-resource-dialog";
import ManageResourcesSkeleton from "../../components/items/manage-resources-skeleton";
import EmptyManageResourcesState from "../../components/items/empty-manage-resources-state";
import AccessDenied from "../../components/items/access-denied";

export default function ManageResourcesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  // Deletion States
  const [deleteTarget, setDeleteTarget] =
    useState<LearningResource | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (isSessionPending) return;

    if (!session) {
      router.push("/login");
    }
  }, [session, isSessionPending, router]);

  // Fetch Instructor's resources from backend API
  const {
    data: response,
    isLoading: isQueryLoading,
    error,
  } = useQuery({
    queryKey: ["instructor-resources"],
    queryFn: async () => {
      const res = await apiClient.get(
        "/api/v1/resources/my-resources",
        {
          withCredentials: true,
        }
      );

      return res.data;
    },
    enabled: !!session && session.user.role === "instructor",
  });

  const resources = useMemo(() => {
    return (response?.data || []) as LearningResource[];
  }, [response]);

  // Combined search and status filtering
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [resources, searchQuery, statusFilter]);

  const isFiltered = searchQuery !== "" || statusFilter !== "all";
  const hasNoResources = resources.length === 0;

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  // Perform soft delete trigger on backend API
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setDeleteError(null);
    setDeleteSuccess(null);

    try {
      await apiClient.delete(
        `/api/v1/resources/${deleteTarget.resourceId}`,
        {
          withCredentials: true,
        }
      );

      setDeleteSuccess(
        `"${deleteTarget.title}" was deleted successfully.`
      );

      // Invalidate queries to refresh caching datasets
      await queryClient.invalidateQueries({
        queryKey: ["instructor-resources"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["resources"],
      });

      setDeleteTarget(null);
    } catch (err) {
      let msg = "Failed to delete resource.";

      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message || msg;
      }

      setDeleteError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Render Loader Skeleton
  if (
    isSessionPending ||
    (session &&
      session.user.role === "instructor" &&
      isQueryLoading)
  ) {
    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ManageResourcesSkeleton />
        </div>
      </main>
    );
  }

  // Check login state
  if (!session) {
    return null;
  }

  // Restrict to instructor role
  if (session.user.role !== "instructor") {
    return <AccessDenied />;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Dynamic Header */}
        <ManageResourcesHeader />

        {/* Mutation Alerts */}
        {deleteSuccess && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 animate-in fade-in duration-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />

            <div className="text-sm font-bold">{deleteSuccess}</div>

            <button
              type="button"
              onClick={() => setDeleteSuccess(null)}
              className="ml-auto text-emerald-600 hover:text-emerald-800 font-extrabold text-sm outline-none"
            >
              Dismiss
            </button>
          </div>
        )}

        {deleteError && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 animate-in fade-in duration-200">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />

            <div className="text-sm font-bold">{deleteError}</div>

            <button
              type="button"
              onClick={() => setDeleteError(null)}
              className="ml-auto text-red-600 hover:text-red-800 font-extrabold text-sm outline-none"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Global Fetching Errors */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />

            <div className="text-sm font-semibold">
              Failed to load your resources:{" "}
              {axios.isAxiosError(error)
                ? error.response?.data?.message ||
                  error.message
                : "Network error"}
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        {!hasNoResources && (
          <section className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center">
            {/* Title Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources by title..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Status Selector Dropdown */}
            <div className="flex w-full sm:w-auto items-center gap-2">
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "all"
                      | "published"
                      | "draft"
                  )
                }
                className="w-full sm:w-40 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition whitespace-nowrap outline-none"
                >
                  Reset
                </button>
              )}
            </div>
          </section>
        )}

        {/* Resources Layout */}
        {hasNoResources ? (
          <EmptyManageResourcesState isFiltered={false} />
        ) : filteredResources.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <ManageResourcesTable
                resources={filteredResources}
                onDeleteClick={setDeleteTarget}
              />
            </div>

            {/* Mobile Card Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {filteredResources.map((item) => (
                <ManageResourceCard
                  key={item.resourceId}
                  resource={item}
                  onDeleteClick={setDeleteTarget}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyManageResourcesState
            isFiltered={true}
            onClear={handleClearFilters}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteResourceDialog
          isOpen={!!deleteTarget}
          resourceTitle={deleteTarget?.title || ""}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTarget(null)}
        />
      </div>
    </main>
  );
}