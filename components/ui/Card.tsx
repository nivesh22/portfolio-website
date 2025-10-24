import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-xl p-6 shadow-card ${className}`}>{children}</div>;
}

