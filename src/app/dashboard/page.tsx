"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Compass } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import DashboardHeader from "../components/dashboard/dashboard-header";
import InstructorDashboard from "../components/dashboard/instructor-dashboard";
import LearnerDashboard from "../components/dashboard/learner-dashboard";
import DashboardSkeleton from "../components/dashboard/dashboard-skeleton";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DashboardSkeleton />
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const isInstructor = session.user.role === "instructor";

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Dynamic Shared Header */}
        <DashboardHeader user={session.user}>
          {isInstructor ? (
            <Link
              href="/items/add"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 transition outline-none"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Add Resource</span>
              <span className="sm:hidden">Add</span>
            </Link>
          ) : (
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 transition outline-none"
            >
              <Compass className="h-4 w-4" />
              <span className="hidden sm:inline">Explore Catalog</span>
              <span className="sm:hidden">Explore</span>
            </Link>
          )}
        </DashboardHeader>

        {/* Role-Specific Core Content */}
        {isInstructor ? <InstructorDashboard /> : <LearnerDashboard />}

      </div>
    </main>
  );
}

