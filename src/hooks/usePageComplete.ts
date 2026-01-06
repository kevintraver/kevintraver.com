"use client";

import { useState, useCallback } from "react";

export function usePageComplete(totalPanes: number) {
  const [completedPanes, setCompletedPanes] = useState<Set<number>>(new Set());

  const markPaneComplete = useCallback((paneIndex: number) => {
    setCompletedPanes((prev) => {
      const next = new Set(prev);
      next.add(paneIndex);
      return next;
    });
  }, []);

  const isComplete = completedPanes.size >= totalPanes;

  return { isComplete, markPaneComplete };
}
