import { useState, useEffect } from 'react';
import type { Word, Lesson } from './types.ts';
import wordsData from './data/words.json';

// TypeScript Concept: String literal union type for card modes
type FlashcardMode = 'italian-to-english' | 'english-to-italian';

interface FlashcardsProps {
  lesson: Lesson;
  onBack: () => void;
  onHome: () => void;
}

function Flashcards({ lesson, onBack, onHome }: FlashcardsProps) {
  // Get the words for this lesson and shuffle them
  const allWords = wordsData as Word[];
  const lessonWords = allWords.slice(lesson.startIndex, lesson.endIndex);

  // TypeScript Concept: useState with array type
  // We store shuffled words so they stay in same random order
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [mode, setMode] = useState<FlashcardMode>('italian-to-english');

  // TypeScript Concept: useEffect with dependency array
  // Shuffle words when component mounts or lesson changes
  useEffect(() => {
    const shuffled = shuffleArray([...lessonWords]);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [lesson.id]); // Only re-shuffle when lesson changes

  // TypeScript Concept: Generic function with type parameter
  // Fisher-Yates shuffle algorithm - properly typed!
  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]; // Create a copy
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // TypeScript knows these are type T, so swap is safe
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Handler functions
  const handleCardClick = (): void => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (): void => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleModeChange = (newMode: FlashcardMode): void => {
    setMode(newMode);
    setIsFlipped(false);
  };

  const handleReshuffle = (): void => {
    const shuffled = shuffleArray([...lessonWords]);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // TypeScript Concept: Early return pattern with type guards
  if (shuffledWords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading flashcards...</div>
      </div>
    );
  }

  const currentWord = shuffledWords[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < shuffledWords.length - 1;

  // Determine what to show based on mode and flip state
  const frontText =
    mode === 'italian-to-english' ? currentWord.italian : currentWord.english;
  const backText =
    mode === 'italian-to-english' ? currentWord.english : currentWord.italian;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onHome}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
              🏠 Home
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {lesson.title} - Flashcards
            </h1>
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
              ← Word List
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => handleModeChange('italian-to-english')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  mode === 'italian-to-english'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                🇮🇹 Italian → English
              </button>
              <button
                onClick={() => handleModeChange('english-to-italian')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  mode === 'english-to-italian'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                🇬🇧 English → Italian
              </button>
            </div>
            <button
              onClick={handleReshuffle}
              className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors">
              🔀 Reshuffle
            </button>
          </div>
        </div>

        {/* Progress Counter */}
        <div className="text-center mb-4">
          <p className="text-gray-600 text-lg">
            Card {currentIndex + 1} of {shuffledWords.length}
          </p>
        </div>

        {/* Flashcard */}
        <div className="flex items-center justify-center mb-8">
          <div
            onClick={handleCardClick}
            className="w-full max-w-2xl h-80 cursor-pointer perspective-1000">
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}>
              {/* Front of Card */}
              <div
                className="absolute w-full h-full backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}>
                <div className="w-full h-full bg-white rounded-2xl shadow-2xl border-4 border-green-500 flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-gray-800 mb-4">
                      {frontText}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Click to reveal translation
                    </p>
                  </div>
                </div>
              </div>

              {/* Back of Card */}
              <div
                className="absolute w-full h-full backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}>
                <div className="w-full h-full bg-green-600 rounded-2xl shadow-2xl border-4 border-green-700 flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-white mb-4">
                      {backText}
                    </p>
                    <p className="text-green-100 text-sm">Click to flip back</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`px-8 py-4 rounded-lg font-semibold transition-colors ${
              hasPrevious
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`px-8 py-4 rounded-lg font-semibold transition-colors ${
              hasNext
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            Next →
          </button>
        </div>

        {/* Keyboard Hint */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            💡 Tip: Click the card to flip, use buttons to navigate
          </p>
        </div>
      </div>
    </div>
  );
}

export default Flashcards;
