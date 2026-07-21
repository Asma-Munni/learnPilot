"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { authClient, signIn } from "@/lib/auth-client";

const demoCredentials = {
  learner: { email: "learner.demo@learnpilot.com", password: "Demo@12345" },
  instructor: { email: "instructor.demo@learnpilot.com", password: "Demo@12345" },
};

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function verifySession() {
      try {
        const { data } = await authClient.getSession();
        if (isMounted) {
          if (data?.user) {
            router.replace("/dashboard");
            router.refresh();
          } else {
            setIsChecking(false);
          }
        }
      } catch {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }
    void verifySession();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
        rememberMe: true,
      });

      if (error) {
        setErrorMessage(
          error.message || "Invalid email or password.",
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsGoogleLoading(true);

    try {
      const origin = window.location.origin;

      const result = await signIn.social({
        provider: "google",
        callbackURL: `${origin}/dashboard`,
        errorCallbackURL: `${origin}/login?google=error`,
      });

      if (result?.error) {
        setErrorMessage(
          result.error.message || "Google login failed.",
        );
        setIsGoogleLoading(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Google login initialization failed:",
          error,
        );
      }

      setErrorMessage("Could not continue with Google.");
      setIsGoogleLoading(false);
    }
  };


  const handleDemoLogin = async (role: "learner" | "instructor" = "learner") => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email: creds.email,
        password: creds.password,
        callbackURL: "/dashboard",
      });

      if (error) {
        setErrorMessage(error.message || "Demo login failed.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("An unexpected error occurred during demo login.");
      setIsLoading(false);
    }
  };

  const isSubmitting = isLoading || isGoogleLoading;

  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex items-center gap-3 font-semibold text-slate-300">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
          <span>Checking your session...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
        <section className="hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Sparkles className="h-6 w-6" />
              </span>

              <span className="text-2xl font-bold">
                LearnPilot AI
              </span>
            </Link>

            <div className="mt-20 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                Welcome back
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Continue your personalized learning journey.
              </h1>

              <p className="mt-5 leading-7 text-indigo-100">
                Access your study plans, recommendations,
                saved resources and learning progress.
              </p>
            </div>
          </div>

          <p className="text-sm text-indigo-100">
            Learn smarter. Progress faster.
          </p>
        </section>

        <section className="flex items-center bg-slate-50 p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xl font-bold text-indigo-700"
              >
                <Sparkles className="h-6 w-6" />
                LearnPilot AI
              </Link>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Sign in
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Enter your account information to continue.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
            >
              {isGoogleLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}

              {isGoogleLoading
                ? "Connecting..."
                : "Continue with Google"}
            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("learner")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-900 transition hover:bg-amber-100 disabled:opacity-60"
              >
                <User className="h-4 w-4 text-amber-700" />
                Demo Learner
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("instructor")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl border border-indigo-300 bg-indigo-50 px-3 py-2.5 text-xs font-bold text-indigo-900 transition hover:bg-indigo-100 disabled:opacity-60"
              >
                <GraduationCap className="h-4 w-4 text-indigo-700" />
                Demo Instructor
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Or use email
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </span>

                <span className="flex items-center rounded-xl border border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                  <Mail className="ml-3 h-5 w-5 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    placeholder="name@example.com"
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                  />
                </span>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Password
                  </span>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <span className="flex items-center rounded-xl border border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                  <LockKeyhole className="ml-3 h-5 w-5 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your password"
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="mr-3 rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </span>
              </label>

              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.63-2.38l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.61A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.92A6 6 0 0 1 6.07 12c0-.67.12-1.32.32-1.92V7.47H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.53l3.35-2.61Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.47l3.35 2.61C7.18 7.71 9.39 5.95 12 5.95Z"
      />
    </svg>
  );
}