"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderKanban, Plus, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { protectedApiClient } from "@/lib/api-client";
import { LearningResource } from "@/app/types/resource";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteTarget, setDeleteTarget] = useState<LearningResource | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isSessionPending) return;

    if (!session) {
      router.push("/login?callbackUrl=/items/manage");
    }
  }, [session, isSessionPending, router]);

  // Query instructor resources
  const {
    data: response,
    isLoading: isQueryLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["my-resources"],
    queryFn: async () => {
      const res = await protectedApiClient.get(
        "/resources/my-resources"
      );

      return res.data;
    },
    enabled: !!session && session.user.role === "instructor",
  });

  const resources = useMemo(() => {
    return (response?.data || []) as LearningResource[];
  }, [response]);

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [resources, searchTerm, statusFilter]);

  // Handle soft deletion
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await protectedApiClient.delete(
        `/resources/${deleteTarget.resourceId}`
      );

      await queryClient.invalidateQueries({
        queryKey: ["my-resources"],
      });
      setDeleteTarget(null);
    } catch {
      alert("Failed to delete resource. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Render Loader Skeleton
  if (
    isSessionPending ||
    (session && session.user.role === "instructor" && isQueryLoading)
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
              <FolderKanban className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Manage Resources
              </h1>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                View, edit, filter, and maintain your published directory items.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
              Refresh
            </button>

            <Link
              href="/items/add"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Resource
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="flex items-center gap-2">
            {(["all", "published", "draft"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-xl px-3 py-2 text-xs font-bold capitalize transition ${
                  statusFilter === st
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Query Error State */}
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800">
            <p className="font-bold text-sm">Failed to load resources.</p>
            <p className="text-xs mt-1 text-red-600">
              {error instanceof Error ? error.message : "An unexpected server error occurred."}
            </p>
          </div>
        ) : filteredResources.length === 0 ? (
          <EmptyManageResourcesState
            isFiltered={!!searchTerm || statusFilter !== "all"}
            onClear={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          />
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <ManageResourcesTable
                resources={filteredResources}
                onDelete={(item) => setDeleteTarget(item)}
              />
            </div>

            {/* Mobile Cards View */}
            <div className="grid gap-4 md:hidden">
              {filteredResources.map((item) => (
                <ManageResourceCard
                  key={item.resourceId}
                  resource={item}
                  onDelete={(res) => setDeleteTarget(res)}
                />
              ))}
            </div>
          </>
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