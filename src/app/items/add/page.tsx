"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AccessDenied from "@/app/components/items/access-denied";
import AddResourceForm from "@/app/components/items/add-resource-form";
import { PlusCircle } from "lucide-react";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login?callbackUrl=/items/add");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (session.user.role !== "instructor") {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Page Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create New Resource
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Add a new course, tutorial, guide, or article to the LearnPilot directory.
            </p>
          </div>
        </div>

        {/* Dynamic Form */}
        <AddResourceForm />

      </div>
    </div>
  );
}
