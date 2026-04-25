"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface OpenChatButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * Client-only button that dispatches the "open-chat" custom event.
 * Extracted so parent components can remain server components.
 */
export function OpenChatButton({ children, className }: OpenChatButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
