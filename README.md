cat > /home/claude/italian-flashcards/README.md << 'EOF'

# 🇮🇹 Learning A Lotta Italian

An interactive flashcard app to help you learn the 1,000 most common Italian words.

## Features

- 📚 **10 Lessons** - 100 words per lesson
- 📖 **Word List View** - See all words with translations
- 🎴 **Interactive Flashcards** - Two modes:
  - Italian → English
  - English → Italian
- 🔀 **Random Shuffle** - Cards appear in random order
- 🎯 **Progress Tracking** - See which card you're on
- 🎨 **Beautiful Design** - Italian flag themed gradient

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Netlify** - Hosting

## Development

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx           # Main app with routing
├── Home.tsx          # Lesson selection page
├── WordList.tsx      # Word table view
├── Flashcards.tsx    # Interactive flashcard view
├── types.ts          # TypeScript type definitions
└── data/
    └── words.json    # 1000 Italian words
```

## Deployment

This app is deployed on Netlify. Any push to the main branch automatically deploys.

## License

MIT
EOF
