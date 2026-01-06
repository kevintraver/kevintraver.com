"use client";

import { TerminalPane } from "./TerminalPane";
import type { TokenizedDotfile } from "@/lib/dotfiles/types";

interface DotfilesBackgroundProps {
  dotfiles: TokenizedDotfile[];
}

export function DotfilesBackground({ dotfiles }: DotfilesBackgroundProps) {
  // Use first 2-3 dotfiles for the panes
  const pane1File = dotfiles[0];
  const pane2File = dotfiles[1];
  const pane3File = dotfiles[5]; // focus_meeting.sh

  if (!pane1File) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-tn-bg via-tn-bg/95 to-tn-bg-dark pointer-events-none" />

      {/* Terminal panes - clickable */}
      <div className="absolute inset-0 p-12 grid grid-cols-2 grid-rows-2 gap-8 opacity-40 hover:opacity-60 transition-opacity duration-500">
        {/* Top left pane - Raycast */}
        <TerminalPane
          file={pane1File}
          startDelay={0}
          className="row-span-1"
          href="/raycast"
          label="Raycast Extensions"
        />

        {/* Top right pane - GitHub */}
        {pane2File && (
          <TerminalPane
            file={pane2File}
            startDelay={500}
            className="row-span-1"
            href="https://github.com/kevintraver"
            label="GitHub"
            external
          />
        )}

        {/* Bottom spanning pane - Dotfiles */}
        {pane3File && (
          <TerminalPane
            file={pane3File}
            startDelay={1000}
            className="col-span-2"
            href="https://github.com/kevintraver/dotfiles"
            label="View Dotfiles"
            external
          />
        )}
      </div>

      {/* Blur overlay to soften background - allow clicks through */}
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />
    </div>
  );
}
