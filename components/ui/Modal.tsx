"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" onClick={onClose} />
      <div className="relative z-10 w-[min(95vw,1200px)] max-w-7xl max-h-[90vh]">
        <div className="rounded-xl p-4 sm:p-6 shadow-lg bg-bg-1 overflow-auto">
          <div className="flex items-center justify-between mb-2">
            {title ? <h3 className="text-lg font-semibold">{title}</h3> : <span />}
            <button aria-label="Close" className="rounded-md px-2 py-1 hover:bg-white/10" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
