import { createHighlighter } from "shiki";
import { GITHUB_RAW_BASE, DOTFILES_MANIFEST } from "./manifest";
import type { DotfileEntry, TokenizedDotfile, TokenizedLine } from "./types";

async function fetchDotfile(entry: DotfileEntry): Promise<string> {
  const url = `${GITHUB_RAW_BASE}/${entry.path}`;
  const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

  if (!response.ok) {
    throw new Error(`Failed to fetch ${entry.path}: ${response.statusText}`);
  }

  return response.text();
}

export async function fetchAndTokenizeDotfiles(): Promise<TokenizedDotfile[]> {
  const highlighter = await createHighlighter({
    themes: ["tokyo-night"],
    langs: ["shellscript", "bash"],
  });

  const results: TokenizedDotfile[] = [];

  for (const entry of DOTFILES_MANIFEST) {
    try {
      const content = await fetchDotfile(entry);
      const { tokens } = highlighter.codeToTokens(content, {
        lang: entry.language,
        theme: "tokyo-night",
      });

      const lines: TokenizedLine[] = tokens.map((lineTokens) => ({
        tokens: lineTokens.map((t) => ({
          content: t.content,
          color: t.color || "#a9b1d6", // Tokyo Night default foreground
        })),
      }));

      results.push({
        path: entry.path,
        filename: entry.path.split("/").pop() || entry.path,
        language: entry.language,
        lines,
      });
    } catch (error) {
      console.error(`Error processing ${entry.path}:`, error);
    }
  }

  highlighter.dispose();
  return results;
}
