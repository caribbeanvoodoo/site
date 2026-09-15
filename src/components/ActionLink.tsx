"use client";
import { track } from "@vercel/analytics";
import type { ComponentProps } from "react";
export function ActionLink({
  event,
  details,
  children,
  ...props
}: ComponentProps<"a"> & { event: string; details?: Record<string, string> }) {
  return (
    <a {...props} onClick={() => track(event, details)}>
      {children}
    </a>
  );
}
