import {
  BarChart3,
  BriefcaseBusiness,
  Code2,
  Database,
  Palette,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Web Development",
    description:
      "Learn frontend, backend and full-stack development.",
    href: "/resources?category=Web Development",
    icon: Code2,
  },
  {
    title: "Data Science",
    description:
      "Explore data analysis, visualization and machine learning.",
    href: "/resources?category=Data Science",
    icon: BarChart3,
  },
  {
    title: "Programming",
    description:
      "Strengthen programming fundamentals and problem-solving skills.",
    href: "/resources?category=Programming",
    icon: Database,
  },
  {
    title: "UI/UX Design",
    description:
      "Learn user-centered design, prototyping and visual principles.",
    href: "/resources?category=UI/UX Design",
    icon: Palette,
  },
  {
    title: "Business",
    description:
      "Build practical knowledge in business and entrepreneurship.",
    href: "/resources?category=Business",
    icon: BriefcaseBusiness,
  },
  {
    title: "AI & Technology",
    description:
      "Discover artificial intelligence and emerging technologies.",
    href: "/resources?category=AI & Technology",
    icon: Sparkles,
  },
];

export default function LearningCategories() {
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Explore by category
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Find the right learning path
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Explore practical learning resources across
            popular subjects and develop skills that match
            your goals.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group flex min-h-60 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <span className="mt-auto pt-6 text-sm font-bold text-indigo-600">
                  Explore resources →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/resources"
            className="inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Browse All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}