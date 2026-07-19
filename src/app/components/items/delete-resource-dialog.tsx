"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteResourceDialogProps {
  isOpen: boolean;
  resourceTitle: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteResourceDialog({
  isOpen,
  resourceTitle,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteResourceDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Warning Icon Banner */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Delete Resource
            </h3>
            <p className="text-xs text-slate-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Confirmation Content */}
        <p className="text-sm text-slate-600 leading-relaxed">
          Are you sure you want to delete <span className="font-extrabold text-slate-800">&quot;{resourceTitle}&quot;</span>? This resource will be removed from catalog listings.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition disabled:opacity-50 outline-none"
          >
            Cancel
          </button>
          
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition disabled:opacity-60 outline-none"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Resource</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
