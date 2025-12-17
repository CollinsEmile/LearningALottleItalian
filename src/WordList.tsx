import type { Word, Lesson } from './types.ts';
import wordsData from './data/words.json';

// TypeScript Concept: Props interface with multiple callback functions
interface WordListProps {
  lesson: Lesson;
  onBack: () => void;
  onStartFlashcards: () => void;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
}

function WordList({
  lesson,
  onBack,
  onStartFlashcards,
  onNextLesson,
  onPreviousLesson,
}: WordListProps) {
  // TypeScript Concept: Type assertion and array slicing
  // Get only the words for this specific lesson
  const allWords = wordsData as Word[];
  const lessonWords = allWords.slice(lesson.startIndex, lesson.endIndex);

  // TypeScript Concept: Boolean expressions for conditional rendering
  const hasPrevious = lesson.id > 1;
  const hasNext = lesson.id < 10;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-red-50">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
              ← Home
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Words {lesson.range} ({lessonWords.length} words)
            </p>
            <button
              onClick={onStartFlashcards}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-sm">
              Start Flashcards →
            </button>
          </div>
        </div>
      </div>

      {/* Word List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-semibold text-gray-700 border-b border-gray-200">
            <div className="col-span-2">Rank</div>
            <div className="col-span-5">Italian</div>
            <div className="col-span-5">English</div>
          </div>

          {/* Word Rows */}
          {/* TypeScript Concept: map with index parameter
              We use word.rank as key since it's unique for each word
          */}
          {lessonWords.map((word) => (
            <div
              key={word.rank}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-2 text-gray-500 font-medium">
                #{word.rank}
              </div>
              <div className="col-span-5 text-gray-800 font-semibold">
                {word.italian}
              </div>
              <div className="col-span-5 text-gray-600">{word.english}</div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onPreviousLesson}
            disabled={!hasPrevious}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              hasPrevious
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            ← Previous Lesson
          </button>

          <button
            onClick={onBack}
            className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors">
            Back to Home
          </button>

          <button
            onClick={onNextLesson}
            disabled={!hasNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              hasNext
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
}

export default WordList;
