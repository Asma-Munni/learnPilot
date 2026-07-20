"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  BookOpen,
  Layers3,
  Loader2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getPublicResourceInsights } from "@/lib/resource-insights-api";

const chartColors = [
  "#4f46e5",
  "#06b6d4",
  "#64748b",
];

export default function ResourceInsights() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["public-resource-insights"],
    queryFn: getPublicResourceInsights,
  });

  const insights = data?.data;

  if (isLoading) {
    return (
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-96 max-w-7xl items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            Loading learning insights...
          </div>
        </div>
      </section>
    );
  }

  if (isError || !insights) {
    return (
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-xl font-bold text-red-800">
            Learning insights could not be loaded
          </h2>

          <p className="mt-2 text-sm text-red-700">
            Check that the backend server is running and try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const hasInsights =
    insights.totalResources > 0 &&
    (insights.categories.length > 0 ||
      insights.levels.length > 0);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Learning insights
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Explore our growing learning library
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            These insights are generated from the real published
            resources available on LearnPilot.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <InsightCard
            icon={<BookOpen className="h-6 w-6" />}
            label="Published resources"
            value={insights.totalResources}
          />

          <InsightCard
            icon={<Layers3 className="h-6 w-6" />}
            label="Learning categories"
            value={insights.categories.length}
          />

          <InsightCard
            icon={<BarChart3 className="h-6 w-6" />}
            label="Skill levels"
            value={insights.levels.length}
          />
        </div>

        {!hasInsights ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-indigo-500" />

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              Insights will appear soon
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Charts will be generated when published learning
              resources are available.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Resources by category
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Published resources grouped by learning category.
                </p>
              </div>

              <div className="mt-6 h-80 w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={insights.categories}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      angle={-25}
                      textAnchor="end"
                      interval={0}
                      height={75}
                      tick={{
                        fontSize: 12,
                        fill: "#475569",
                      }}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{
                        fontSize: 12,
                        fill: "#475569",
                      }}
                    />

                    <Tooltip
                      cursor={{
                        fill: "#eef2ff",
                      }}
                      formatter={(value) => [
                        value,
                        "Resources",
                      ]}
                    />

                    <Bar
                      dataKey="count"
                      fill="#4f46e5"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Resources by skill level
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  See how the library supports different learner levels.
                </p>
              </div>

              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={insights.levels}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                    >
                      {insights.levels.map(
                        (item, index) => (
                          <Cell
                            key={item.name}
                            fill={
                              chartColors[
                                index %
                                  chartColors.length
                              ]
                            }
                          />
                        ),
                      )}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [
                        value,
                        "Resources",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {insights.levels.map(
                  (item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[
                              index %
                                chartColors.length
                            ],
                        }}
                      />

                      <span className="capitalize">
                        {item.name}
                      </span>

                      <span className="font-bold">
                        {item.count}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

type InsightCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
};

function InsightCard({
  icon,
  label,
  value,
}: InsightCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
        {icon}
      </div>

      <p className="mt-5 text-3xl font-bold text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-600">
        {label}
      </p>
    </article>
  );
}