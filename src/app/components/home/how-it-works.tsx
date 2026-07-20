import {
  Bot,
  CheckCircle2,
  Search,
  Target,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Explore Learning Resources",
    description:
      "Search and filter published resources based on category, level and resource type.",
    icon: Search,
  },
  {
    number: "02",
    title: "Create an AI Study Plan",
    description:
      "Share your goal, weak topics, deadline and available study time to generate a personalized plan.",
    icon: Target,
  },
  {
    number: "03",
    title: "Learn with AI Assistance",
    description:
      "Ask follow-up questions, understand difficult topics and receive context-aware study guidance.",
    icon: Bot,
  },
  {
    number: "04",
    title: "Track Your Progress",
    description:
      "Complete, skip or reset study tasks while LearnPilot automatically calculates your progress.",
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Simple learning workflow
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            How LearnPilot works
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Move from discovering resources to completing a
            personalized learning plan with AI-powered support.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative flex min-h-72 flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200">
                    <Icon className="h-6 w-6" />
                  </span>

                  <span className="text-3xl font-bold text-white/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {step.description}
                </p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex h-2 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}