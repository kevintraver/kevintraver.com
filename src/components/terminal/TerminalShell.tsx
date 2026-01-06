"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type TabId = "home" | "projects" | "dev" | "social";

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
  path: string;
}

const tabs: Tab[] = [
  { id: "home", label: "~ home", icon: "🏠", path: "/" },
  { id: "projects", label: "projects", icon: "📁", path: "/projects" },
  { id: "dev", label: "dev", icon: "⌨️", path: "/dev" },
  { id: "social", label: "social", icon: "💬", path: "/social" },
];

interface TerminalShellProps {
  children: React.ReactNode;
}

export function TerminalShell({ children }: TerminalShellProps) {
  const pathname = usePathname();
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div
      className={`min-h-screen bg-tn-bg-dark transition-all duration-300 ${
        isMaximized ? "p-0" : "p-4 md:p-8"
      }`}
    >
      <div
        className={`flex flex-col overflow-hidden border border-tn-bg-highlight shadow-2xl transition-all duration-300 ${
          isMaximized
            ? "h-screen w-screen rounded-none"
            : "max-w-6xl mx-auto h-[calc(100vh-4rem)] rounded-xl"
        }`}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-tn-bg-highlight/80 border-b border-tn-bg-highlight">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-tn-red hover:bg-tn-red/80 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-tn-yellow hover:bg-tn-yellow/80 transition-colors cursor-pointer" />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-tn-green hover:bg-tn-green/80 transition-colors cursor-pointer"
              aria-label={isMaximized ? "Exit fullscreen" : "Enter fullscreen"}
            />
          </div>
          {/* Window title */}
          <div className="flex-1 text-center">
            <span className="text-sm text-tn-fg-dark">kevintraver.com</span>
          </div>
          {/* Spacer */}
          <div className="w-[52px]" />
        </div>

        {/* Tab bar */}
        <div className="flex bg-tn-bg-dark border-b border-tn-bg-highlight">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.id}
                href={tab.path}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm whitespace-nowrap transition-colors border-r border-tn-bg-highlight ${
                  isActive
                    ? "bg-tn-bg text-tn-fg"
                    : "bg-tn-bg-dark text-tn-fg-dark hover:text-tn-fg hover:bg-tn-bg-highlight/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="ml-1 md:ml-2 w-2 h-2 rounded-full bg-tn-green" />
                )}
              </Link>
            );
          })}
          {/* Spacer to fill remaining space */}
          <div className="flex-1 bg-tn-bg-dark" />
        </div>

        {/* Content area */}
        <div className="flex-1 bg-tn-bg overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
