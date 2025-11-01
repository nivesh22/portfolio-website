"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { images?: string[]; interval?: number; aspect?: string; className?: string };

export default function Carousel({ images = [] as string[], interval = 7000, aspect = "aspect-[9/16]", className }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % Math.max(images.length, 1)), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);
  if (images.length === 0) return null;
  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl", aspect, className)}>
      {images.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt="Hero"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <button aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full p-2" onClick={() => setI((i - 1 + images.length) % images.length)}>
        <ChevronLeft />
      </button>
      <button aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full p-2" onClick={() => setI((i + 1) % images.length)}>
        <ChevronRight />
      </button>
    </div>
  );
}
