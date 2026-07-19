import { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";

interface ArrayInputFieldProps {
  label: string;
  placeholder: string;
  items: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
  error?: string;
}

export default function ArrayInputField({
  label,
  placeholder,
  items,
  onAddItem,
  onRemoveItem,
  error,
}: ArrayInputFieldProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      onAddItem(trimmed);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2 col-span-1 md:col-span-2">
      <label className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 text-white hover:bg-indigo-700 transition outline-none"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

      {/* Render Tags list */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="rounded p-0.5 hover:bg-indigo-100 transition outline-none text-indigo-500 hover:text-indigo-700"
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
