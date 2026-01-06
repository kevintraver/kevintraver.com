export interface Token {
  content: string;
  color: string;
}

export interface TokenizedLine {
  tokens: Token[];
}

export interface TokenizedDotfile {
  path: string;
  filename: string;
  language: string;
  lines: TokenizedLine[];
}

export interface DotfileEntry {
  path: string;
  language: "shellscript" | "bash";
}
