import type { DotfileEntry } from "./types";

export const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/kevintraver/dotfiles/master";

export const DOTFILES_MANIFEST: DotfileEntry[] = [
  { path: "zsh/aliases/tools.zsh", language: "shellscript" },
  { path: "zsh/aliases/git.zsh", language: "shellscript" },
  { path: "zsh/aliases/filesystem.zsh", language: "shellscript" },
  { path: "zsh/aliases/development.zsh", language: "shellscript" },
  { path: "zsh/aliases/networking.zsh", language: "shellscript" },
  { path: "yabai/scripts/focus_meeting.sh", language: "bash" },
];
