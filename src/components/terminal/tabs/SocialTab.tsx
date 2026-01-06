"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { EnterPrompt } from "../EnterPrompt";

const command = "dig @kevintraver";

const digHeader = [
  "",
  ";; global options: +cmd",
  ";; Got answer:",
  ";; ->>HEADER<<- opcode: QUERY, status: NOERROR",
  "",
  ";; ANSWER SECTION:",
];

const socials = [
  { name: "github", ttl: "300", type: "LINK", url: "https://github.com/kevintraver", icon: "/icons/github.svg" },
  { name: "x", ttl: "300", type: "LINK", url: "https://x.com/kevintraver", icon: "/icons/x.svg" },
  { name: "instagram", ttl: "300", type: "LINK", url: "https://instagram.com/kevintraver", icon: "/icons/instagram.svg" },
];

const digFooter: string[] = [];

export function SocialTab() {
  const [typedCommand, setTypedCommand] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Type out the command
  useEffect(() => {
    if (typedCommand.length < command.length) {
      const timer = setTimeout(() => {
        setTypedCommand(command.slice(0, typedCommand.length + 1));
      }, 25 + Math.random() * 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [typedCommand]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 font-mono text-sm">
      {/* Command */}
      <div className="mb-2">
        <div className="flex items-center gap-2 text-tn-fg-dark">
          <span className="text-tn-magenta">&gt;</span>
          <span className="text-tn-cyan">{typedCommand}</span>
          {!showContent && showCursor && (
            <span className="bg-tn-fg w-2 h-5 inline-block" />
          )}
        </div>
      </div>

      {/* Dig output */}
      {showContent && (
        <div className="animate-in fade-in duration-300">
          {/* Header */}
          {digHeader.map((line, i) => (
            <div key={i} className="text-tn-fg-dark">
              {line}
            </div>
          ))}

          {/* Social links as dig records */}
          <div className="my-4 space-y-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-3 py-1 border-l border-tn-bg-highlight grid grid-cols-[80px_24px_1fr] items-center gap-3 hover:border-tn-blue transition-colors"
              >
                <span className="text-tn-green">{social.name}</span>
                <Image
                  src={social.icon}
                  alt={`${social.name} icon`}
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />
                <span className="text-tn-cyan hover:underline">
                  <span className="hidden md:inline">{social.url.replace("https://", "")}</span>
                  <span className="md:hidden">@kevintraver</span>
                </span>
              </a>
            ))}
          </div>

          {/* Footer */}
          {digFooter.map((line, i) => (
            <div key={i} className="text-tn-fg-dark">
              {line}
            </div>
          ))}

          {/* Enter prompt */}
          <EnterPrompt />
        </div>
      )}
    </div>
  );
}
