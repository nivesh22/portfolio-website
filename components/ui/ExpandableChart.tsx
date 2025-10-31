"use client";
import { ReactElement, cloneElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type ExpandableChartProps = {
  title: string;
  inlineHeight: number;
  expandedHeight?: number;
  children: ReactElement;
};

export default function ExpandableChart({ title, inlineHeight, expandedHeight = 640, children }: ExpandableChartProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-50">
        <Button variant="ghost" aria-label={`Expand ${title}`} title="Expand" onClick={() => setOpen(true)}>
          ⤢
        </Button>
      </div>
      {cloneElement(children, { height: inlineHeight })}
      <Modal open={open} title={title} onClose={() => setOpen(false)}>
        <div className="p-2 sm:p-4">
          {cloneElement(children, { height: expandedHeight })}
        </div>
      </Modal>
    </div>
  );
}

