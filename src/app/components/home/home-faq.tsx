"use client";

import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question:
      "How does the AI Study Planner create my plan?",
    answer:
      "The planner analyzes your learning goal, current skill level, weak topics, deadline, available study time and published LearnPilot resources. It then creates milestones and scheduled tasks that fit your available time.",
  },
  {
    question:
      "Does the AI Study Assistant remember previous messages?",
    answer:
      "Yes. Your conversations are stored securely with your account. You can reopen a previous conversation and continue asking follow-up questions using the existing conversation context.",
  },
  {
    question:
      "Can I change the status of a study task?",
    answer:
      "Yes. You can mark a task as completed, skip it or reset it to pending. LearnPilot automatically recalculates your overall study-plan progress.",
  },
  {
    question:
      "Can I archive and reactivate a study plan?",
    answer:
      "Yes. You can archive a plan that you are not currently following and reactivate it later. Your tasks, milestones and progress remain saved.",
  },
  {
    question:
      "Where do the recommended learning resources come from?",
    answer:
      "The AI uses real published resources stored in the LearnPilot database. It does not invent unavailable resource links or recommend unpublished resources.",
  },
  {
    question:
      "Who can add learning resources?",
    answer:
      "Users registered as instructors can create, update, publish and manage learning resources. Learners can explore published resources and use them in their study plans.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index,
    );
  };

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
            <HelpCircle className="h-6 w-6" />
          </span>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Frequently asked questions
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Everything you need to know about LearnPilot
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Learn how personalized study plans,
            conversation memory, progress tracking and
            instructor-managed resources work together.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen =
              openIndex === index;

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleItem(index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-bold text-slate-900">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-indigo-600 transition-transform ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200 px-5 py-5 sm:px-6">
                    <p className="text-sm leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}