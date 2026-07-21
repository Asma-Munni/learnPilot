"use client";

import {
  Bot,
  BrainCircuit,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { authClient } from "@/lib/auth-client";

type UserRole =
  | "learner"
  | "instructor";

type NavLink = {
  label: string;
  href: string;
};

const publicLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/resources",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const learnerLinks: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Explore",
    href: "/resources",
  },
  {
    label: "AI Planner",
    href: "/ai/study-planner",
  },
  {
    label: "AI Assistant",
    href: "/ai/study-assistant",
  },
  {
    label: "Recommendations",
    href: "/ai/recommendations",
  },
  {
    label: "My Plans",
    href: "/my-plans",
  },
];

const instructorLinks: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Explore",
    href: "/resources",
  },
  {
    label: "Add Resource",
    href: "/items/add",
  },
  {
    label: "Manage Resources",
    href: "/items/manage",
  },
  {
    label: "AI Planner",
    href: "/ai/study-planner",
  },
  {
    label: "AI Assistant",
    href: "/ai/study-assistant",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const [
    isProfileMenuOpen,
    setIsProfileMenuOpen,
  ] = useState(false);

  const profileMenuRef =
    useRef<HTMLDivElement>(null);

  const hiddenRoutes = [
    "/login",
    "/register",
    "/forgot-password",
  ];

  const shouldHideNavbar =
    hiddenRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`,
        ),
    );

  const userRole: UserRole =
    session?.user &&
    "role" in session.user
      ? (session.user.role as UserRole)
      : "learner";

  const navLinks = session
    ? userRole === "instructor"
      ? instructorLinks
      : learnerLinks
    : publicLinks;

  const userInitial =
    session?.user.name
      ?.charAt(0)
      .toUpperCase() || "U";

  useEffect(() => {
    const handle =
      requestAnimationFrame(() => {
        setIsMobileMenuOpen(false);
        setIsProfileMenuOpen(false);
      });

    return () =>
      cancelAnimationFrame(handle);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsProfileMenuOpen(false);
          setIsMobileMenuOpen(false);

          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const isActiveLink = (
    href: string,
  ) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`,
      )
    );
  };

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/20">
            <Sparkles className="h-5 w-5" />
          </span>

          <div>
            <p className="text-lg font-bold leading-none text-slate-950">
              LearnPilot
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-600">
              Agentic AI
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              isActiveLink(
                link.href,
              );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop authentication area */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
          ) : session ? (
            <>
              <Link
                href="/items/add"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                <PlusCircle className="h-4 w-4" />
                Add Resource
              </Link>

              <div
                ref={profileMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsProfileMenuOpen(
                      (current) =>
                        !current,
                    )
                  }
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-indigo-300 hover:bg-slate-50"
                >
                  {session.user
                    .image ? (
                    <img
                      src={
                        session.user
                          .image
                      }
                      alt={
                        session.user
                          .name
                      }
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                      {userInitial}
                    </span>
                  )}

                  <div className="max-w-32 text-left">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {
                        session.user
                          .name
                      }
                    </p>

                    <p className="truncate text-xs capitalize text-slate-500">
                      {userRole}
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition ${
                      isProfileMenuOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {
                          session.user
                            .name
                        }
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {
                          session.user
                            .email
                        }
                      </p>

                      <span className="mt-2 inline-flex rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold capitalize text-cyan-700">
                        {userRole}
                      </span>
                    </div>

                    <div className="py-2">
                      <ProfileLink
                        href="/dashboard"
                        icon={
                          <LayoutDashboard className="h-4 w-4" />
                        }
                        label="Dashboard"
                      />

                      <ProfileLink
                        href="/profile"
                        icon={
                          <UserRound className="h-4 w-4" />
                        }
                        label="My Profile"
                      />

                      <ProfileLink
                        href="/items/manage"
                        icon={
                          <PlusCircle className="h-4 w-4" />
                        }
                        label="Manage Resources"
                      />

                      <ProfileLink
                        href="/ai/study-planner"
                        icon={
                          <BrainCircuit className="h-4 w-4" />
                        }
                        label="AI Study Planner"
                      />

                      <ProfileLink
                        href="/ai/study-assistant"
                        icon={
                          <Bot className="h-4 w-4" />
                        }
                        label="AI Study Assistant"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() =>
            setIsMobileMenuOpen(
              (current) =>
                !current,
            )
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 lg:hidden">
          {session && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              {session.user.image ? (
                <img
                  src={
                    session.user.image
                  }
                  alt={
                    session.user.name
                  }
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
                  {userInitial}
                </span>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {session.user.name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {
                    session.user
                      .email
                  }
                </p>

                <p className="mt-1 text-xs font-bold capitalize text-cyan-700">
                  {userRole}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => {
              const active =
                isActiveLink(
                  link.href,
                );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 border-t border-slate-200 pt-5">
            {session ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <UserRound className="h-4 w-4" />
                  My Profile
                </Link>

                <Link
                  href="/items/add"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Resource
                </Link>

                <Link
                  href="/items/manage"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <UserRound className="h-4 w-4" />
                  Manage Resources
                </Link>

                <Link
                  href="/ai/study-assistant"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Bot className="h-4 w-4" />
                  AI Study Assistant
                </Link>

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

type ProfileLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

function ProfileLink({
  href,
  label,
  icon,
}: ProfileLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-indigo-700"
    >
      {icon}
      {label}
    </Link>
  );
}