"use client";

import Link from "next/link";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default function ManageResourcesHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-500 transition outline-none"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Manage Resources
          </h1>
        </div>
        <p className="text-sm text-slate-500 max-w-xl pl-10">
          View, audit, search, and delete learning items you have added to the platform directory.
        </p>
      </div>

      <div className="pl-10 md:pl-0 shrink-0">
        <Link
          href="/items/add"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition outline-none"
        >
          <PlusCircle className="h-4 w-4" />
          Create Resource
        </Link>
      </div>
    </header>
  );
}
