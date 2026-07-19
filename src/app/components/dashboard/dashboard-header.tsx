"use client";

import { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
  children?: ReactNode;
}

export default function DashboardHeader({ user, children }: DashboardHeaderProps) {
  const router = useRouter();
  const firstName = user.name.split(" ")[0] || user.name;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getRoleDescription = (role: string) => {
    if (role === "instructor") {
      return "Manage your directory curriculum, oversee course metrics, and publish new content.";
    }
    return "Track your study plans, review saved guides, and view customized AI curriculum recommendations.";
  };

  return (
    <header className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-start sm:items-center gap-4">
        {/* User image or initial */}
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm shrink-0"
          />
        ) : (
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-xl shrink-0 uppercase">
            {user.name.charAt(0)}
          </div>
        )}

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome, {firstName}
            </h1>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 capitalize border border-indigo-100">
              {user.role}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400">
            {formattedDate}
          </p>
          <p className="text-sm text-slate-500 max-w-xl">
            {getRoleDescription(user.role)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {children}
        
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2.5 text-sm font-bold text-red-600 transition outline-none"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </header>
  );
}
