// This file contains all our TypeScript type definitions

// Represents a single Italian word with its English translation
export interface Word {
  rank: number;
  italian: string;
  english: string;
}

// Represents a lesson (a group of 100 words)
export interface Lesson {
  id: number; // 1, 2, 3, etc.
  title: string; // "Most Common 100 Words"
  range: string; // "1-100"
  startIndex: number; // 0 (for array indexing)
  endIndex: number; // 100
}
