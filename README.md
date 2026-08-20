# Textify - AI English Writing, Grammar & Learning Platform 🚀

[![Creator](https://img.shields.io/badge/Created%20By-Suhas%20S-0d9488?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/suhas-s-081b84335)
[![Framework](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Bundler](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Textify** is an all-in-one AI-powered English writing, grammar checking, parts-of-speech analysis, text rewriting, translation, and document generation platform. Designed as an intelligent SaaS assistant combining the capabilities of Grammarly, QuillBot, and LanguageTool into a unified, responsive dashboard.

Developed and maintained by **[Suhas S](https://www.linkedin.com/in/suhas-s-081b84335)**.

---

## 🌟 Key Features

### 1. ✍️ Writing Assistant (Main Workspace)
- **Rich Interactive Editor**: Real-time tracking of word count, character count, sentence count, and estimated reading time.
- **Formatting Toolbar**: Bold, italic, underline, clear formatting, undo, redo, and copy options.
- **Real-Time Analysis Panel**: Instant visibility into spelling, grammar, punctuation, readability score, tone detection, and word statistics.
- **Interactive Correction Popovers**: Highlighted errors with explanations, suggestions, and one-click apply options.

### 2. 🔍 Grammar & Spell Checker
- **Comprehensive Audit Engine**: Rule-based + AI detection for subject-verb agreement, prepositions, articles, tense errors, repeated words, and run-on sentences.
- **Categorized Issue Lists**: Filter by Spelling, Grammar, or Punctuation with "Apply Fix" and "Ignore All" capabilities.

### 3. 🏷️ Parts of Speech Analyzer
- **Color-Coded Linguistic Highlight**: Classifies every word into 9 grammatical classes:
  - Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Interjection, Determiner/Article.
- **Visual Category Legend**: Displays exact counts and percentage breakdowns.

### 4. ✨ AI Improve & Rewriter
- **10 Transformation Modes**:
  - `Fix Grammar`, `Make Professional`, `Make Academic`, `Make Simple`, `Make Concise`, `Expand`, `Improve Vocabulary`, `Improve Clarity`, `Make Formal`, `Make Casual`.
- **Side-by-Side Comparison**: Compare original vs. improved text before choosing to replace or export.

### 5. 📝 AI Paragraph Generator
- **Tailored Content Creation**: Input any topic with customized controls for Length (Short, Medium, Long), Tone (Academic, Professional, Simple, Creative), and Difficulty (Beginner, Intermediate, Advanced).

### 6. 🌐 Multilingual AI Translator
- **16 Global & Regional Languages**: Supports English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, French, German, Spanish, Portuguese, Arabic, Chinese, Japanese, and Korean.
- **Instant Language Swapping & Export**: One-click swap and document export.

### 7. 📊 Writing Performance & Audit Report
- **Quality Score (0 - 100)**: Visual quality indicator with Flesch-Kincaid readability scoring, tone analysis, error distribution, and actionable recommendations.

### 8. 📄 Working Client-Side Document Exports (PDF & DOCX)
- **Genuine PDF Generation (`jspdf`)**: Generates multi-page formatted PDFs with custom headers, footers, metadata, tables, and page numbers.
- **Genuine DOCX Generation (`docx`)**: Creates valid Microsoft Word `.docx` files preserving headings, tables, and paragraph structure.

### 9. 📚 Custom Dictionary
- Add custom terms, jargon, and brand names saved directly to `localStorage` to avoid false-positive spelling alerts.

### 10. 🌙 Dark / Light Theme & Responsive Design
- Full dark mode support with automatic persistence and responsive mobile drawer navigation.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS, Lucide React Icons
- **PDF Engine**: `jspdf`
- **DOCX Engine**: `docx`
- **NLP & AI Processing**: Custom Heuristic Grammar Engine & Transformers.js Layer
- **Persistence**: Browser `localStorage`

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Suhas-Saur/textify.git

# Navigate into the project directory
cd textify

# Install dependencies
npm install --ignore-scripts

# Launch development server
npm run dev
```

Open `http://localhost:5173` in your browser to view Textify.

---

## 📦 Building for Production

```bash
# Generate production bundle
npm run build

# Preview build locally
npm run preview
```

---

## 👤 Author & Credits

Designed and developed by **Suhas S**.

- 🔗 **LinkedIn**: [Suhas S Profile](https://www.linkedin.com/in/suhas-s-081b84335)
- 🐙 **GitHub**: [@Suhas-Saur](https://github.com/Suhas-Saur)
- 🌐 **Project Home**: [https://github.com/Suhas-Saur/textify](https://github.com/Suhas-Saur/textify)

---

## 📄 License

This project is licensed under the MIT License.
