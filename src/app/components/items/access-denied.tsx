import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-lg w-full shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-6">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Access Denied
        </h1>
        
        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          Only users registered as <span className="font-bold text-indigo-600">Instructors</span> have permissions to publish or manage learning resources. If you believe this is an error, please contact support.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/resources"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore Resources
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 outline-none"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
