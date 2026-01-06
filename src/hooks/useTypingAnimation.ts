"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { TokenizedDotfile } from "@/lib/dotfiles/types";

interface UseTypingAnimationOptions {
  file: TokenizedDotfile;
  baseSpeed?: number; // chars per second
  variability?: number; // 0-1, how much speed varies
  pauseProbability?: number; // 0-1, chance of micro-pause per frame
  startDelay?: number; // ms before typing starts
  loop?: boolean; // whether to restart after completion
  loopDelay?: number; // ms to wait before restarting
}

function countTotalChars(file: TokenizedDotfile): number {
  return file.lines.reduce(
    (sum, line) =>
      sum + line.tokens.reduce((s, t) => s + t.content.length, 0) + 1, // +1 for newline
    0
  );
}

export function useTypingAnimation({
  file,
  baseSpeed = 40,
  variability = 0.3,
  pauseProbability = 0.02,
  startDelay = 0,
  loop = false,
  loopDelay = 2000,
}: UseTypingAnimationOptions) {
  const [charIndex, setCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(startDelay === 0);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const totalChars = useMemo(() => countTotalChars(file), [file]);
  const isComplete = charIndex >= totalChars;

  // Handle start delay
  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => setIsStarted(true), startDelay);
      return () => clearTimeout(timer);
    }
  }, [startDelay]);

  // Handle loop restart
  useEffect(() => {
    if (loop && isComplete) {
      const timer = setTimeout(() => {
        setCharIndex(0);
        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
      }, loopDelay);
      return () => clearTimeout(timer);
    }
  }, [loop, loopDelay, isComplete]);

  const animate = useCallback(
    (timestamp: number) => {
      if (!isStarted || isComplete) return;

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Random micro-pause for human feel
      if (Math.random() < pauseProbability) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Variable typing speed
      const speedMultiplier = 1 + (Math.random() - 0.5) * 2 * variability;
      const effectiveSpeed = baseSpeed * speedMultiplier;

      // Accumulate fractional characters
      accumulatorRef.current += (effectiveSpeed * deltaTime) / 1000;
      const charsToAdd = Math.floor(accumulatorRef.current);
      accumulatorRef.current -= charsToAdd;

      if (charsToAdd > 0) {
        setCharIndex((prev) => Math.min(prev + charsToAdd, totalChars));
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [isStarted, isComplete, baseSpeed, variability, pauseProbability, totalChars]
  );

  // Start animation loop
  useEffect(() => {
    if (isStarted && !isComplete) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isStarted, isComplete, animate]);

  // Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        lastTimeRef.current = 0;
      } else if (isStarted && !isComplete) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isStarted, isComplete, animate]);

  // Reset when file changes
  useEffect(() => {
    setCharIndex(0);
    lastTimeRef.current = 0;
    accumulatorRef.current = 0;
  }, [file]);

  return { charIndex, isComplete, totalChars, isStarted };
}
