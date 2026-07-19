"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CheckCircle, AlertCircle, LogOut, ArrowRight } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [backendStatus, setBackendStatus] = useState<"loading" | "connected" | "failed">("loading");
  const [backendMessage, setBackendMessage] = useState("");
  const [ownResourcesCount, setOwnResourcesCount] = useState<number | null>(null);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    // Call the protected Express backend to verify session propagation
    const checkBackendSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/resources/my-resources", {
          withCredentials: true, // Crucial to send cookies securely
        });

        if (response.data.success) {
          setBackendStatus("connected");
          setBackendMessage(response.data.message);
          setOwnResourcesCount(response.data.data.length);
        } else {
          setBackendStatus("failed");
          setBackendMessage(response.data.message || "Failed response shape");
        }
      } catch (err) {
        let msg = "Connection refused";
        if (err && typeof err === "object") {
          const axiosError = err as { response?: { data?: { message?: string } }; message?: string };
          msg = axiosError.response?.data?.message || axiosError.message || msg;
        } else if (err instanceof Error) {
          msg = err.message;
        }
        setBackendStatus("failed");
        setBackendMessage(msg);
      }
    };

    void checkBackendSession();
  }, [session, isPending, router]);

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

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Welcome, {session.user.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Logged in as <span className="font-bold text-slate-700 capitalize">{session.user.role}</span> ({session.user.email})
            </p>
          </div>
          
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Verification Status Card */}
        <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Backend Security Verification Check
          </h2>

          {backendStatus === "loading" ? (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
              <span>Verifying session with Express backend on port 5000...</span>
            </div>
          ) : backendStatus === "connected" ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Session verified successfully!</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Express server verified cookie session. Logged in user matches public ID: `{session.user.id}`.
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600 space-y-1 pl-1">
                <p>⚡ **Response Message**: &quot;{backendMessage}&quot;</p>
                <p>⚡ **Owned resources count**: {ownResourcesCount}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 text-red-800 bg-red-50 border border-red-100 rounded-xl p-4">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Backend verification failed</p>
                <p className="text-xs text-red-700 mt-0.5">
                  Reason: {backendMessage}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Link to catalog */}
        <div className="text-center pt-2">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            Go to Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
