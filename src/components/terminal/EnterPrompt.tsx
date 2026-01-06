"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const TAB_ORDER = ["/", "/projects", "/dev", "/social"];

export function EnterPrompt() {
  const router = useRouter();
  const pathname = usePathname();
  const [showCursor, setShowCursor] = useState(true);

  // Get next page in the loop
  const currentIndex = TAB_ORDER.indexOf(pathname);
  const nextIndex = (currentIndex + 1) % TAB_ORDER.length;
  const nextPath = TAB_ORDER[nextIndex];
  const isLastPage = currentIndex === TAB_ORDER.length - 1;

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Listen for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.push(nextPath);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, nextPath]);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-tn-fg-dark font-mono text-sm">
        <span className="text-tn-magenta">&gt;</span>
        <span>
          Press{" "}
          <span className="text-tn-green font-bold">[Enter]</span>
          {isLastPage ? " to go home" : " to continue →"}
        </span>
        {showCursor && <span className="bg-tn-fg w-2 h-4 inline-block" />}
      </div>
    </div>
  );
}
