import { useState } from 'react';
import Home from './Home.tsx';
import WordList from './WordList.tsx';
import Flashcards from './Flashcards.tsx';
import type { Lesson } from './types.ts';

// Typescript Concept: String literal types for view state
// This ensures we can only use these specific strings
type View = 'home' | 'wordlist' | 'flashcards';

function App() {
  // TypeScript Concept: useState with generic type parameter
  // useState<Lesson | null> means state can be a Lesson object OR null
  // We start with null because no lesson is selected yet
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');

  // TypeScript Concept: Function with typed parameter
  // handleLessonSelect takes a Lesson and returns void (nothing)
  const handleLessonSelect = (lesson: Lesson): void => {
    setSelectedLesson(lesson);
    setCurrentView('wordlist');
  };

  const handleBackToHome = (): void => {
    setSelectedLesson(null);
    setCurrentView('home');
  };

  const handleStartFlashcards = (): void => {
    setCurrentView('flashcards');
  };

  const handleNextLesson = (): void => {
    if (selectedLesson && selectedLesson.id < 10) {
      const nextLesson: Lesson = {
        id: selectedLesson.id + 1,
        title:
          selectedLesson.id === 1
            ? '2nd Most Common'
            : `
            ${selectedLesson.id + 1}
            ${getOrdinalSuffix(selectedLesson.id + 1)}
            Most Common
            `,
        range: `
            ${selectedLesson.id * 100 + 1}
            -
            ${(selectedLesson.id + 1) * 100}
            `,
        startIndex: selectedLesson.id * 100,
        endIndex: (selectedLesson.id + 1) * 100,
      };
      setSelectedLesson(nextLesson);
    }
  };

  const handlePreviousLesson = (): void => {
    if (selectedLesson && selectedLesson.id > 1) {
      const prevLesson: Lesson = {
        id: selectedLesson.id - 1,
        title:
          selectedLesson.id === 2
            ? 'Most Common 100 Words'
            : `${selectedLesson.id - 1}${getOrdinalSuffix(
                selectedLesson.id - 1
              )} Most Common`,
        range: `${(selectedLesson.id - 2) * 100 + 1}-${
          (selectedLesson.id - 1) * 100
        }`,
        startIndex: (selectedLesson.id - 2) * 100,
        endIndex: (selectedLesson.id - 1) * 100,
      };
      setSelectedLesson(prevLesson);
    }
  };

  const getOrdinalSuffix = (num: number): string => {
    if (num === 1) return 'st';
    if (num === 2) return 'nd';
    if (num === 3) return 'rd';
    return 'th';
  };

  return (
    <>
      {currentView === 'home' && <Home onLessonSelect={handleLessonSelect} />}

      {currentView === 'wordlist' && selectedLesson && (
        <WordList
          lesson={selectedLesson}
          onBack={handleBackToHome}
          onStartFlashcards={handleStartFlashcards}
          onNextLesson={handleNextLesson}
          onPreviousLesson={handlePreviousLesson}
        />
      )}

      {currentView === 'flashcards' && selectedLesson && (
        <Flashcards
          lesson={selectedLesson}
          onBack={() => setCurrentView('wordlist')}
          onHome={handleBackToHome}
        />
      )}
    </>
  );
}

export default App;
