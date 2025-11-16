"use client";
import { ReactElement, cloneElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type ExpandableChartProps = {
  title: string;
  inlineHeight: number;
  expandedHeight?: number;
  children: ReactElement;
};

export default function ExpandableChart({ title, inlineHeight, expandedHeight = 640, children }: ExpandableChartProps) {
  const [open, setOpen] = useState(false);
  const openChart = () => {
    setOpen(true);
    trackEvent("skills_interaction", { action_type: "expand_chart", chart: title });
  };
  const closeChart = () => {
    setOpen(false);
    trackEvent("skills_interaction", { action_type: "collapse_chart", chart: title });
  };

  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-50">
        <Button variant="ghost" aria-label={`Expand ${title}`} title="Expand" onClick={openChart}>
          ⤢
        </Button>
      </div>
      {cloneElement(children, { height: inlineHeight })}
      <Modal open={open} title={title} onClose={closeChart}>
        <div className="p-2 sm:p-4">
          {cloneElement(children, { height: expandedHeight })}
        </div>
      </Modal>
    </div>
  );
}
