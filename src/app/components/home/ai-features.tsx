import {
  Bot,
  BrainCircuit,
  History,
  ListChecks,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Personalized Study Planner",
    description:
      "Generate a structured learning plan based on your goal, current level, weak topics, deadline and daily study time.",
    icon: BrainCircuit,
  },
  {
    title: "Context-Aware Assistant",
    description:
      "Ask questions about your selected study plan, pending tasks, deadlines and available learning resources.",
    icon: Bot,
  },
  {
    title: "Conversation Memory",
    description:
      "Continue previous conversations while the assistant remembers earlier messages and understands follow-up questions.",
    icon: History,
  },
  {
    title: "Smart Task Scheduling",
    description:
      "Receive AI-generated milestones and scheduled tasks that stay within your deadline and available daily study time.",
    icon: ListChecks,
  },
  {
    title: "Suggested Follow-Ups",
    description:
      "Get relevant suggested questions after every assistant response so you can continue learning without losing direction.",
    icon: MessagesSquare,
  },
  {
    title: "Resource Recommendations",
    description:
      "Receive recommendations from real published LearnPilot resources that match your study plan and learning needs.",
    icon: Sparkles,
  },
];

export default function AiFeatures() {
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Agentic AI capabilities
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              AI that supports your complete learning journey
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              LearnPilot goes beyond simple content generation by
              using study context, resource data, conversation
              history and learner progress to provide practical
              guidance.
            </p>
          </div>

          <Link
            href="/ai/study-assistant"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Try AI Assistant
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/ai/study-planner"
            className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            Generate Study Plan
          </Link>

          <Link
            href="/ai/study-assistant"
            className="inline-flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50 sm:w-auto"
          >
            Open Study Assistant
          </Link>
        </div>
      </div>
    </section>
  );
}