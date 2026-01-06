"use client";

import { useState } from "react";
import Link from "next/link";
import { TerminalChrome } from "@/components/ui/TerminalChrome";
import { TypingEngine } from "./TypingEngine";
import type { TokenizedDotfile } from "@/lib/dotfiles/types";

interface TerminalPaneProps {
  file: TokenizedDotfile;
  startDelay?: number;
  className?: string;
  href?: string;
  label?: string;
  external?: boolean;
}

export function TerminalPane({
  file,
  startDelay = 0,
  className = "",
  href,
  label,
  external = false,
}: TerminalPaneProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      className={`will-change-transform h-full transition-all duration-300 ${className} ${
        href
          ? "cursor-pointer hover:scale-[1.02] hover:opacity-100"
          : ""
      } ${isHovered ? "opacity-100" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TerminalChrome filename={file.filename} isHovered={isHovered} label={label}>
        <TypingEngine file={file} startDelay={startDelay} isHovered={isHovered} />
      </TerminalChrome>
    </div>
  );

  if (!href) return content;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
