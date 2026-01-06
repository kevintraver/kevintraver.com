"use client";

interface TerminalChromeProps {
  filename: string;
  children: React.ReactNode;
  isHovered?: boolean;
  label?: string;
}

export function TerminalChrome({
  filename,
  children,
  isHovered = false,
  label,
}: TerminalChromeProps) {
  return (
    <div
      className={`h-full flex flex-col rounded-lg overflow-hidden border bg-tn-bg-dark/90 backdrop-blur-sm shadow-2xl transition-all duration-300 ${
        isHovered
          ? "border-tn-blue/60 shadow-tn-blue/20 shadow-lg"
          : "border-tn-bg-highlight"
      }`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-tn-bg-highlight/50 border-b border-tn-bg-highlight">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-tn-red/80" />
          <div className="w-3 h-3 rounded-full bg-tn-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-tn-green/80" />
        </div>
        {/* Filename */}
        <div className="flex-1 text-center">
          <span className="text-xs text-tn-fg-dark">{filename}</span>
        </div>
        {/* Spacer for symmetry */}
        <div className="w-[52px]" />
      </div>
      {/* Content */}
      <div className="flex-1 min-h-0 p-4 font-mono text-sm overflow-hidden relative">
        {children}
        {/* Label overlay on hover */}
        {label && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-tn-bg-dark/80 backdrop-blur-sm transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <span className="text-lg font-semibold text-tn-blue">
              {label} →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
