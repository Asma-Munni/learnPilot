"use client";

import { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";

interface WeakTopicsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function WeakTopicsInput({ value, onChange }: WeakTopicsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">
        Weak Topics / Areas of Interest
      </label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. CSS Grid, Promises, Async/Await"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 transition outline-none shrink-0"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1.5">
          {value.map((topic, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 border border-slate-200 pl-2.5 pr-1.5 py-1 text-xs font-semibold text-slate-700"
            >
              {topic}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
