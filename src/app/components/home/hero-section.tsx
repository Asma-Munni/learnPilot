import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200">
            <Sparkles className="h-4 w-4" />
            Your Agentic AI Learning Companion
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Learn smarter with a{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-amber-300 bg-clip-text text-transparent">
              personalized AI
            </span>{" "}
            study journey.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            LearnPilot analyzes your goals, current skills,
            available time and progress to create study plans
            and recommend the right learning resources.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              Start learning free
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-cyan-400 hover:bg-white/10"
            >
              <BookOpenCheck className="h-5 w-5" />
              Explore resources
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {[
              "Personalized study plans",
              "Smart recommendations",
              "Progress-based adjustments",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 blur-2xl" />

          <div className="relative rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  AI Study Agent
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Your learning workflow
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                <BrainCircuit className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <WorkflowItem
                number="01"
                title="Understand your goal"
                description="The agent analyzes your goal, skill level and available study time."
              />

              <WorkflowItem
                number="02"
                title="Select useful resources"
                description="It searches the platform and selects resources that match your needs."
              />

              <WorkflowItem
                number="03"
                title="Create a study plan"
                description="A structured daily or weekly learning plan is generated for you."
              />

              <WorkflowItem
                number="04"
                title="Improve with progress"
                description="The plan adjusts based on completed tasks and interaction history."
              />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <Target className="h-5 w-5 text-amber-300" />

                <p className="mt-3 text-xl font-bold">
                  Goal-aware
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Plans match your objectives
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <BrainCircuit className="h-5 w-5 text-cyan-300" />

                <p className="mt-3 text-xl font-bold">
                  Adaptive
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Learns from your progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type WorkflowItemProps = {
  number: string;
  title: string;
  description: string;
};

function WorkflowItem({
  number,
  title,
  description,
}: WorkflowItemProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-sm font-bold text-indigo-300">
        {number}
      </span>

      <div>
        <h3 className="font-bold text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}