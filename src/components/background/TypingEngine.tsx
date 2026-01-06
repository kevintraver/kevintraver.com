"use client";

import { useMemo, memo } from "react";
import type { TokenizedDotfile, TokenizedLine, Token } from "@/lib/dotfiles/types";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

interface TypingEngineProps {
  file: TokenizedDotfile;
  startDelay?: number;
  isHovered?: boolean;
}

interface CursorPosition {
  line: number;
  col: number;
}

interface VisibleContent {
  lines: TokenizedLine[];
  cursorPosition: CursorPosition;
}

function getVisibleContent(
  file: TokenizedDotfile,
  globalCharIndex: number
): VisibleContent {
  let currentIndex = 0;
  const visibleLines: TokenizedLine[] = [];
  let cursorPosition: CursorPosition = { line: 0, col: 0 };

  for (let lineIdx = 0; lineIdx < file.lines.length; lineIdx++) {
    const line = file.lines[lineIdx];
    const visibleTokens: Token[] = [];
    let lineComplete = true;

    for (const token of line.tokens) {
      const tokenStart = currentIndex;
      const tokenEnd = currentIndex + token.content.length;

      if (globalCharIndex <= tokenStart) {
        // Token not visible yet
        lineComplete = false;
        break;
      } else if (globalCharIndex >= tokenEnd) {
        // Token fully visible
        visibleTokens.push(token);
        currentIndex = tokenEnd;
      } else {
        // Token partially visible (cursor is here)
        const visibleLength = globalCharIndex - tokenStart;
        visibleTokens.push({
          content: token.content.slice(0, visibleLength),
          color: token.color,
        });
        cursorPosition = { line: lineIdx, col: visibleLength };
        currentIndex = globalCharIndex;
        lineComplete = false;
        break;
      }
    }

    if (visibleTokens.length > 0 || lineIdx === 0) {
      visibleLines.push({ tokens: visibleTokens });
    }

    if (!lineComplete) {
      cursorPosition = { line: lineIdx, col: visibleTokens.reduce((s, t) => s + t.content.length, 0) };
      break;
    }

    currentIndex++; // Account for newline character

    if (currentIndex > globalCharIndex) {
      cursorPosition = { line: lineIdx, col: line.tokens.reduce((s, t) => s + t.content.length, 0) };
      break;
    }
  }

  return { lines: visibleLines, cursorPosition };
}

// Memoized line component for completed lines
const MemoizedLine = memo(function MemoizedLine({
  tokens,
  lineNumber,
}: {
  tokens: Token[];
  lineNumber: number;
}) {
  return (
    <div className="flex">
      <span className="w-8 text-right pr-3 text-tn-fg-dark select-none">
        {lineNumber}
      </span>
      <span>
        {tokens.map((token, i) => (
          <span key={i} style={{ color: token.color }}>
            {token.content}
          </span>
        ))}
      </span>
    </div>
  );
});

// Cursor component
function Cursor() {
  return (
    <span className="inline-block w-2 h-4 bg-tn-fg cursor-blink translate-y-0.5" />
  );
}

export function TypingEngine({ file, startDelay = 0, isHovered = false }: TypingEngineProps) {
  // isHovered can be used for future enhancements like speed boost
  const { charIndex, isComplete } = useTypingAnimation({
    file,
    startDelay,
    baseSpeed: 45,
    variability: 0.35,
    pauseProbability: 0.015,
    loop: true,
    loopDelay: 3000, // 3 second pause before restart
  });

  const { lines, cursorPosition } = useMemo(
    () => getVisibleContent(file, charIndex),
    [file, charIndex]
  );

  return (
    <pre className="text-sm leading-relaxed">
      <code>
        {lines.map((line, lineIdx) => {
          const isActiveLine = lineIdx === cursorPosition.line && !isComplete;

          if (isActiveLine) {
            // Active line with cursor
            return (
              <div key={lineIdx} className="flex">
                <span className="w-8 text-right pr-3 text-tn-fg-dark select-none">
                  {lineIdx + 1}
                </span>
                <span>
                  {line.tokens.map((token, i) => (
                    <span key={i} style={{ color: token.color }}>
                      {token.content}
                    </span>
                  ))}
                  <Cursor />
                </span>
              </div>
            );
          }

          // Completed line
          return (
            <MemoizedLine
              key={lineIdx}
              tokens={line.tokens}
              lineNumber={lineIdx + 1}
            />
          );
        })}
      </code>
    </pre>
  );
}
