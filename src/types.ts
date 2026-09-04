export type ViewMode = 'split' | 'editor' | 'preview';

export interface ReadmeTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

export interface SectionSnippet {
  id: string;
  name: string;
  content: string;
}

export interface DocumentStats {
  characters: number;
  words: number;
  lines: number;
  readingTimeMinutes: number;
}
