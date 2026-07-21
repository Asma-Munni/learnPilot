"use client";

import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  ImageIcon,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import {
  authClient,
  signIn,
  signUp,
} from "@/lib/auth-client";

type PublicRole = "learner" | "instructor";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] =
    useState<PublicRole>("learner");

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isGoogleLoading, setIsGoogleLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const isSubmitting =
    isLoading || isGoogleLoading;

  useEffect(() => {
  const completeGoogleRegistration = async () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("google") === "error") {
      localStorage.removeItem("learnpilot-selected-role");
      setErrorMessage("Google registration failed. Please try again.");
      return;
    }

    if (params.get("google") !== "complete") {
      return;
    }

    const savedRole = localStorage.getItem(
      "learnpilot-selected-role",
    );

    if (
      savedRole !== "learner" &&
      savedRole !== "instructor"
    ) {
      setErrorMessage(
        "Your selected role was not found. Please register again.",
      );
      return;
    }

    try {
      // First confirm that Google OAuth created a real session.
      const sessionResult = await authClient.getSession();

      if (
        sessionResult.error ||
        !sessionResult.data?.user
      ) {
        setErrorMessage(
          "Google authentication completed, but no active session was found.",
        );
        return;
      }

      const { error } = await authClient.updateUser({
        role: savedRole,
      });

      if (error) {
        setErrorMessage(
          error.message ||
            "Account created, but role update failed.",
        );
        return;
      }

      localStorage.removeItem(
        "learnpilot-selected-role",
      );

      // The Google user is already logged in.
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "Google registration completion failed:",
        error,
      );

      setErrorMessage(
        "Could not complete Google registration.",
      );
    }
  };

  void completeGoogleRegistration();
}, [router]);

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
        role,
        callbackURL: "/login",
      });

      if (error) {
        setErrorMessage(
          error.message || "Registration failed.",
        );

        return;
      }

      setSuccessMessage(
        "Account created successfully. Redirecting to login...",
      );

      router.push("/login");
      router.refresh();
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsGoogleLoading(true);
    try {
      const origin = window.location.origin;
      localStorage.setItem("learnpilot-selected-role", role);
      await signIn.social({
        provider: "google",
        callbackURL: `${origin}/dashboard`,
        errorCallbackURL: `${origin}/login?google=error`,
      });
    } catch (e: unknown) {
      const err = e as Error;
      localStorage.removeItem("learnpilot-selected-role");
      setErrorMessage(err?.message || "Could not continue with Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 p-3 text-slate-900 sm:p-4">
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl sm:min-h-[calc(100vh-2rem)] lg:max-h-[920px] lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left content */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/20" />

          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-white/20" />

          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </span>

              <span className="text-xl font-bold">
                LearnPilot AI
              </span>
            </Link>

            <div className="mt-10 max-w-md">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
                Intelligent learning companion
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight">
                Build your skills through a smarter
                AI-powered learning journey.
              </h1>

              <p className="mt-4 text-sm leading-6 text-indigo-100">
                Create personalized study plans,
                discover learning resources and receive
                recommendations based on your progress.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "Personalized AI study plans",
                "Smart resource recommendations",
                "Learning progress tracking",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />

                  <span className="text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-indigo-100">
            Learn smarter. Progress faster.
          </p>
        </section>

        {/* Registration form */}
        <section className="flex items-center bg-slate-50 p-5 sm:p-7 lg:p-8">
          <div className="mx-auto w-full max-w-lg">
            <div className="mb-5 lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xl font-bold text-indigo-700"
              >
                <Sparkles className="h-5 w-5" />
                LearnPilot AI
              </Link>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Get started
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                Create your account
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Choose your role and join LearnPilot.
              </p>
            </div>

            {/* Role selection */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-slate-800">
                Choose your role
              </p>

              <div className="grid grid-cols-2 gap-3">
                <RoleButton
                  active={role === "learner"}
                  title="Learner"
                  description="Follow AI study plans"
                  icon={
                    <GraduationCap className="h-5 w-5" />
                  }
                  activeClassName="border-indigo-600 bg-indigo-50 ring-indigo-100"
                  activeIconClassName="bg-indigo-600"
                  onClick={() =>
                    setRole("learner")
                  }
                />

                <RoleButton
                  active={role === "instructor"}
                  title="Instructor"
                  description="Share learning resources"
                  icon={
                    <BookOpenCheck className="h-5 w-5" />
                  }
                  activeClassName="border-cyan-600 bg-cyan-50 ring-cyan-100"
                  activeIconClassName="bg-cyan-600"
                  onClick={() =>
                    setRole("instructor")
                  }
                />
              </div>
            </div>

            {/* Google signup */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isSubmitting}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGoogleLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}

              {isGoogleLoading
                ? "Connecting to Google..."
                : "Continue with Google"}
            </button>

            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Or continue with email
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form
              onSubmit={handleRegister}
              className="space-y-3"
            >
              <InputField
                label="Full name"
                icon={
                  <UserRound className="h-4 w-4" />
                }
              >
                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent py-2.5 pr-4 text-sm outline-none placeholder:text-slate-400"
                />
              </InputField>

              <InputField
                label="Email address"
                icon={<Mail className="h-4 w-4" />}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  disabled={isSubmitting}
                  placeholder="name@example.com"
                  className="w-full bg-transparent py-2.5 pr-4 text-sm outline-none placeholder:text-slate-400"
                />
              </InputField>

              <InputField
                label="Profile image URL"
                optional
                icon={
                  <ImageIcon className="h-4 w-4" />
                }
              >
                <div className="flex w-full items-center">
                  <input
                    type="url"
                    value={image}
                    onChange={(event) =>
                      setImage(event.target.value)
                    }
                    disabled={isSubmitting}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-transparent py-2.5 pr-3 text-sm outline-none placeholder:text-slate-400"
                  />

                  {image && (
                    <img
                      src={image}
                      alt="Profile preview"
                      className="mr-2 h-7 w-7 rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  )}
                </div>
              </InputField>

              <InputField
                label="Password"
                icon={
                  <LockKeyhole className="h-4 w-4" />
                }
              >
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  minLength={8}
                  disabled={isSubmitting}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current,
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="mr-3 rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </InputField>

              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-2 text-center text-[11px] leading-5 text-slate-400">
              By creating an account, you agree to our
              Terms and Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

type RoleButtonProps = {
  active: boolean;
  title: string;
  description: string;
  icon: ReactNode;
  activeClassName: string;
  activeIconClassName: string;
  onClick: () => void;
};

function RoleButton({
  active,
  title,
  description,
  icon,
  activeClassName,
  activeIconClassName,
  onClick,
}: RoleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition ${
        active
          ? `${activeClassName} ring-2`
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            active
              ? `${activeIconClassName} text-white`
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {icon}
        </span>

        <span
          className={`h-3.5 w-3.5 rounded-full border ${
            active
              ? "border-white bg-current ring-2 ring-offset-1"
              : "border-slate-300"
          }`}
        />
      </div>

      <p className="mt-2 text-sm font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-0.5 text-[11px] text-slate-500">
        {description}
      </p>
    </button>
  );
}

type InputFieldProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  optional?: boolean;
};

function InputField({
  label,
  icon,
  children,
  optional = false,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">
        {label}

        {optional && (
          <span className="font-normal text-slate-400">
            Optional
          </span>
        )}
      </span>

      <span className="flex items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
        <span className="ml-3 text-slate-400">
          {icon}
        </span>

        {children}
      </span>
    </label>
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