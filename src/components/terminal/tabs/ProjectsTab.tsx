"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const panes = [
  {
    title: "startup I'm working on",
    command: "curl https://hicira.com",
    items: [
      { name: "HiCira", description: "AI voice receptionist that answers calls 24/7, handles questions, and books jobs for your small business", url: "https://hicira.com", icon: "/icons/hicira.png" },
    ],
    link: null,
  },
  {
    title: "raycast extensions I've built",
    command: "ls ~/projects/raycast",
    items: [
      { name: "MCP Edit", description: "Quickly edit MCP configuration files", icon: "/icons/mcp-edit.png" },
      { name: "URL Resolver", description: "Resolve URLs using DNS-over-HTTPS", icon: "/icons/url-resolver.png" },
      { name: "AdGuard DNS", description: "Analyze AdGuard DNS query logs and unblock domains", icon: "/icons/adguard-dns.png" },
    ],
    link: { url: "https://raycast.com/kevintraver", label: "View on Raycast Store" },
  },
  {
    title: "fun projects I've built",
    command: "ls ~/projects/fun",
    items: [
      { name: "Flappy Hands", description: "Flappy Bird but with your hands", url: "https://flappyhands.fun" },
      { name: "Ridiculous UI", description: "A collection of the most absurd, frustrating, and hilarious UI controls ever designed. They all work... technically", url: "https://ridiculous-ui.vercel.app" },
      { name: "Deal With It", description: "Upload a photo to add the iconic sunglasses", url: "https://deal-with-it.vercel.app" },
    ],
    link: null,
  },
  {
    title: "projects I'm working on now",
    command: "ls ~/projects/wip",
    items: [
      { name: "HN Summarizer", description: "AI Powered Hacker News summarizer", url: "https://hn-comments-summarizer-46v2.vercel.app" },
      { name: "StopTyping", description: "App that reminds you to stop typing and use Speech to Text" },
    ],
    link: null,
  },
];

interface PaneProps {
  pane: typeof panes[0];
  index: number;
  startDelay: number;
}

function renderCommandWithLinks(command: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = command.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tn-cyan hover:text-tn-blue underline"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Pane({ pane, index, startDelay }: PaneProps) {
  const [typedCommand, setTypedCommand] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  // Start delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Type out the command
  useEffect(() => {
    if (!started) return;

    if (typedCommand.length < pane.command.length) {
      const timer = setTimeout(() => {
        setTypedCommand(pane.command.slice(0, typedCommand.length + 1));
      }, 25 + Math.random() * 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [started, typedCommand, pane.command]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`p-4 md:p-6 font-mono text-sm md:overflow-auto border-b border-tn-bg-highlight last:border-b-0 ${
        index % 2 === 0 ? "md:border-r" : ""
      } ${index < 2 ? "" : "md:border-b-0"}`}
    >
      {/* Pane header with typing */}
      <div className="flex items-center gap-2 text-tn-fg-dark mb-3">
        <span className="text-tn-magenta">&gt;</span>
        <span className="text-tn-cyan">
          {showContent ? renderCommandWithLinks(typedCommand) : typedCommand}
        </span>
        {!showContent && started && showCursor && (
          <span className="bg-tn-fg w-2 h-4 inline-block" />
        )}
      </div>

      {/* Content - shown after typing */}
      {showContent && (
        <div className="animate-in fade-in duration-300">
          {/* Title */}
          <div className="text-tn-fg-dark font-semibold mb-3">
            # {pane.title}
          </div>

          {/* Items */}
          <div className="space-y-3 mb-4">
            {pane.items.map((item) => {
              const content = (
                <>
                  {"icon" in item && item.icon && (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={28}
                      height={28}
                      className="rounded flex-shrink-0"
                    />
                  )}
                  <div>
                    <div className="text-tn-yellow">{item.name}</div>
                    <div className="text-tn-fg-dark text-xs mt-0.5">{item.description}</div>
                  </div>
                </>
              );

              return "url" in item && item.url ? (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-3 py-1 border-l border-tn-bg-highlight flex items-start gap-3 hover:border-tn-blue transition-colors"
                >
                  {content}
                </a>
              ) : (
                <div key={item.name} className="pl-3 py-1 border-l border-tn-bg-highlight flex items-start gap-3">
                  {content}
                </div>
              );
            })}
          </div>

          {/* Link */}
          {pane.link && (
            <a
              href={pane.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tn-orange hover:text-tn-yellow text-xs transition-colors"
            >
              → {pane.link.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectsTab() {
  return (
    <div className="md:h-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2">
      {panes.map((pane, index) => (
        <Pane
          key={pane.title}
          pane={pane}
          index={index}
          startDelay={index * 400}
        />
      ))}
    </div>
  );
}
