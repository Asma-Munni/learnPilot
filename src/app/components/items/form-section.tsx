import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs font-semibold text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        {children}
      </div>
    </section>
  );
}
