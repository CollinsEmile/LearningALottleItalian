import type { Lesson } from './types.ts';

// TypeScript Concept: We can define the props interface inline or separately
// Props = properties passed to a component from its parent
interface HomeProps {
  onLessonSelect: (lesson: Lesson) => void; // Function that takes a Lesson and returns nothing
}

function Home({ onLessonSelect }: HomeProps) {
  // TypeScript Concept: Array<Lesson> = array of Lesson objects
  // We could also write: Lesson[]
  const lessons: Array<Lesson> = [
    {
      id: 1,
      title: 'Most Common 100 Words',
      range: '1-100',
      startIndex: 0,
      endIndex: 100,
    },
    {
      id: 2,
      title: '2nd Most Common',
      range: '101-200',
      startIndex: 100,
      endIndex: 200,
    },
    {
      id: 3,
      title: '3rd Most Common',
      range: '201-300',
      startIndex: 200,
      endIndex: 300,
    },
    {
      id: 4,
      title: '4th Most Common',
      range: '301-400',
      startIndex: 300,
      endIndex: 400,
    },
    {
      id: 5,
      title: '5th Most Common',
      range: '401-500',
      startIndex: 400,
      endIndex: 500,
    },
    {
      id: 6,
      title: '6th Most Common',
      range: '501-600',
      startIndex: 500,
      endIndex: 600,
    },
    {
      id: 7,
      title: '7th Most Common',
      range: '601-700',
      startIndex: 600,
      endIndex: 700,
    },
    {
      id: 8,
      title: '8th Most Common',
      range: '701-800',
      startIndex: 700,
      endIndex: 800,
    },
    {
      id: 9,
      title: '9th Most Common',
      range: '801-900',
      startIndex: 800,
      endIndex: 900,
    },
    {
      id: 10,
      title: '10th Most Common',
      range: '901-1000',
      startIndex: 900,
      endIndex: 1000,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-2">
          Learning A Lottle Italian
        </h1>
        <p className="text-xl text-gray-600">
          Master the 1,000 most common Italian words
        </p>
      </div>

      {/* Lesson Grid */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Choose Your Lesson
        </h2>

        {/* TypeScript Concept: map() with type inference
            - lessons is Lesson[]
            - TypeScript knows 'lesson' is type Lesson
            - key prop needs to be unique (we use lesson.id)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className="bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 text-left transition-all duration-200 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 mt-1">Words {lesson.range}</p>
                </div>
                <div className="text-4xl">{lesson.id}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
