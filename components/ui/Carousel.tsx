"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageItem = string | { src: string; alt: string };
type Props = { images?: ImageItem[]; interval?: number; aspect?: string; className?: string };

export default function Carousel({ images = [] as ImageItem[], interval = 7000, aspect = "aspect-[9/16]", className }: Props) {
  const [i, setI] = useState(0);
  const normalized = images.map((img) => (typeof img === "string" ? { src: img, alt: "Slide image" } : img));

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % Math.max(normalized.length, 1)), interval);
    return () => clearInterval(id);
  }, [normalized.length, interval]);
  if (normalized.length === 0) return null;
  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl", aspect, className)}>
      {normalized.map((img, idx) => (
        <img
          key={img.src + idx}
          src={img.src}
          alt={img.alt || "Slide image"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <button aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full p-2" onClick={() => setI((i - 1 + normalized.length) % normalized.length)}>
        <ChevronLeft />
      </button>
      <button aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full p-2" onClick={() => setI((i + 1) % normalized.length)}>
        <ChevronRight />
      </button>
    </div>
  );
}
