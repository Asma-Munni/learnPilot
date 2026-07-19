import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Clock3,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "AI Study Planner",
    description:
      "Generate a personalized study plan based on your goal, current skill level, deadline and available time.",
    icon: BrainCircuit,
  },
  {
    title: "Smart Recommendations",
    description:
      "Discover learning resources selected according to your interests, activity and previous progress.",
    icon: Sparkles,
  },
  {
    title: "Learning Resources",
    description:
      "Explore organized courses, tutorials, articles and guides for different skills and difficulty levels.",
    icon: BookOpenCheck,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor completed tasks, active plans, saved resources and overall learning performance.",
    icon: BarChart3,
  },
  {
    title: "Adaptive Planning",
    description:
      "Update your study plan when your schedule, deadline or learning progress changes.",
    icon: RefreshCcw,
  },
  {
    title: "Time-Based Learning",
    description:
      "Receive realistic learning tasks according to the amount of time you can study every day.",
    icon: Clock3,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
            Powerful features
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need for a smarter learning journey
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            LearnPilot combines intelligent planning, personalized
            recommendations and progress tracking in one organized platform.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group flex min-h-72 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-600 transition group-hover:from-indigo-600 group-hover:to-cyan-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center text-sm font-bold text-indigo-600">
                    Learn more
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}