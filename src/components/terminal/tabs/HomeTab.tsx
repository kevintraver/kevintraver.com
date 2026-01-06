"use client";

import { useState, useEffect } from "react";

const sections = [
  { command: "whoami", output: ["Kevin Traver"] },
  { command: "groups", output: ["Software Developer", "Mountain Runner", "Drone Photographer"] },
  { command: "uptime", output: ["12+ years coding"] },
  { command: "defaults read locations", output: [
    "Salt Lake City, Utah",
    "Las Vegas, Nevada",
  ]},
];

export function HomeTab() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation for commands
  useEffect(() => {
    if (currentSection >= sections.length) return;

    const command = sections[currentSection].command;

    if (!showOutput) {
      // Typing the command
      if (currentChar < command.length) {
        const timer = setTimeout(() => {
          setCurrentChar((c) => c + 1);
        }, 30 + Math.random() * 20);
        return () => clearTimeout(timer);
      } else {
        // Command finished, show output
        const timer = setTimeout(() => {
          setShowOutput(true);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      // Output shown, move to next section
      const timer = setTimeout(() => {
        setCurrentSection((s) => s + 1);
        setCurrentChar(0);
        setShowOutput(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentSection, currentChar, showOutput]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 font-mono text-sm">
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => {
          const isPast = sectionIndex < currentSection;
          const isCurrent = sectionIndex === currentSection;
          const commandText = isCurrent && !showOutput
            ? section.command.slice(0, currentChar)
            : section.command;

          if (!isPast && !isCurrent) return null;

          return (
            <div key={sectionIndex} className="space-y-1">
              {/* Command line */}
              <div className="flex items-center">
                <span className="text-tn-magenta mr-2">&gt;</span>
                <span className="text-tn-cyan">{commandText}</span>
                {isCurrent && !showOutput && showCursor && (
                  <span className="bg-tn-fg w-2 h-5 inline-block ml-0.5" />
                )}
              </div>

              {/* Output */}
              {(isPast || (isCurrent && showOutput)) && (
                <div className="pl-4 border-l-2 border-tn-bg-highlight ml-1">
                  {section.output.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className="text-tn-yellow py-0.5"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
