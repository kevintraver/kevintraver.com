"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const panes = [
	{
		title: "some of my favorite mac apps",
		command: "ls -la /Applications",
		items: [
			{
				name: "Leader Key",
				description: "The *faster than your launcher* launcher",
				url: "https://github.com/mikker/LeaderKey",
				icon: "/icons/leaderkey.png",
			},
			{
				name: "Ghostty",
				description: "Ghostty is a fast, feature-rich, and cross-platform terminal emulator",
				url: "https://ghostty.org",
				icon: "/icons/ghostty.png",
			},
			{
				name: "Superwhisper",
				description: "Offline AI voice to text for macOS, Windows & iOS",
				url: "https://superwhisper.com",
				icon: "/icons/superwhisper.png",
			},
			{
				name: "Raycast",
				description: "Your shortcut to everything",
				url: "https://raycast.com",
				icon: "/icons/raycast.png",
			},
			{
				name: "Cursor",
				description: "The AI code editor",
				url: "https://cursor.com",
				icon: "/icons/cursor.png",
			},
			{
				name: "CleanShot X",
				description: "Capture your Mac's screen like a pro",
				url: "https://cleanshot.com",
				icon: "/icons/cleanshot.png",
			},
			{
				name: "Rewrite Bar",
				description: "Improve your writing in any macOS application with AI assistance",
				url: "https://rewritebar.com",
				icon: "/icons/rewritebar.png",
			},
			{
				name: "Cotypist",
				description: "AI Autocomplete for Mac",
				url: "https://cotypist.com",
				icon: "/icons/cotypist.png",
			},
			{
				name: "Zen Browser",
				description: "A beautifully designed, privacy-focused browser",
				url: "https://zen-browser.app",
				icon: "/icons/zen-browser.png",
			},
			{
				name: "1Password",
				description: "The world's most-loved password manager",
				url: "https://1password.com",
				icon: "/icons/1password.png",
			},
		],
	},
	{
		title: "my essential dev tools",
		command: "brew list | grep favorites",
		items: [
			{
				name: "Claude Code",
				description: "An agentic coding tool that lives in your terminal",
				url: "https://code.claude.com/docs/en/overview",
				icon: "/icons/claude-code.png",
			},
			{
				name: "OpenCode",
				description: "Terminal-based AI coding assistant",
				url: "https://opencode.ai",
				icon: "/icons/opencode.png",
			},
			{
				name: "Neovim",
				description: "Hyperextensible Vim-based text editor",
				url: "https://neovim.io",
				icon: "/icons/neovim.png",
			},
			{
				name: "yabai",
				description: "Tiling window manager for macOS",
				url: "https://github.com/koekeishiya/yabai",
				icon: "/icons/yabai.png",
			},
			{
				name: "lazygit",
				description: "Simple terminal UI for git commands",
				url: "https://github.com/jesseduffield/lazygit",
			},
		],
	},
];

interface PaneProps {
	pane: (typeof panes)[0];
	index: number;
	startDelay: number;
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
			className={`p-4 md:p-6 font-mono text-sm md:overflow-auto border-b border-tn-bg-highlight last:border-b-0 md:border-b-0 ${
				index === 0 ? "md:border-r" : ""
			}`}
		>
			{/* Pane header with typing */}
			<div className="flex items-center gap-2 text-tn-fg-dark mb-3">
				<span className="text-tn-magenta">&gt;</span>
				<span className="text-tn-cyan font-bold">{typedCommand}</span>
				{!showContent && started && showCursor && (
					<span className="bg-tn-fg w-2 h-4 inline-block" />
				)}
			</div>

			{/* Content - shown after typing */}
			{showContent && (
				<div className="animate-in fade-in duration-300">
					{/* Title */}
					<div className="text-tn-fg-dark font-normal mb-3"># {pane.title}</div>

					{/* Items */}
					<div className="space-y-3 mb-4">
						{pane.items.map((item) => (
							<a
								key={item.name}
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								className="pl-3 py-1 border-l border-tn-bg-highlight flex items-start gap-3 hover:border-tn-blue transition-colors"
							>
								{"icon" in item && item.icon && (
									<Image
										src={item.icon}
										alt={item.name}
										width={28}
										height={28}
										className={`rounded flex-shrink-0 ${
											item.name === "Neovim" ? "transform scale-75" : ""
										}`}
									/>
								)}
								<div>
									<div className="text-tn-yellow">{item.name}</div>
									<div className="text-tn-fg-dark text-xs mt-0.5">
										{item.description}
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export function ApplicationsTab() {
	return (
		<div className="md:h-full grid grid-cols-1 md:grid-cols-2">
			{panes.map((pane, index) => (
				                <Pane
				                    key={pane.title}
				                    pane={pane}
				                    index={index}
				                    startDelay={index * 400}
				                />			))}
		</div>
	);
}
