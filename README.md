# Textify - AI English Writing, Grammar & Learning Platform 🚀

[![Creator](https://img.shields.io/badge/Created%20By-Suhas%20S-0d9488?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/suhas-s-081b84335)
[![Repository](https://img.shields.io/badge/GitHub-Suhas--Saur%2Ftextify-181717?style=for-the-badge&logo=github)](https://github.com/Suhas-Saur/textify)
[![Framework](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Bundler](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Textify** is an all-in-one AI-powered English writing, grammar checking, sentence error analysis, text rewriting, translation, and long-document generation platform. Built as a high-performance web platform, Textify combines the capabilities of Grammarly, QuillBot, and LanguageTool into a unified, side-by-side responsive workspace.

Developed & Maintained by **[Suhas S](https://www.linkedin.com/in/suhas-s-081b84335)**.

---

## 🌟 Comprehensive Features

### 1. ✍️ Writing Assistant (Side-by-Side Workspace)
- **Side-by-Side Analysis Panel**: View detected errors, AI auto-corrections, and AI enhancements right next to your main text editor without page redirects.
- **Rich Interactive Editor**: Real-time tracking of word count, character count, sentence count, and estimated reading time.
- **Clean Formatting Toolbar**: Bold (`**bold**`), italic (`*italic*`), underline (`__underline__`), clear formatting, undo, redo, and copy options.
- **One-Click Corrections**: Apply individual fixes or use **"Fix All Errors"** to resolve all spelling, grammar, and subject-verb mismatches instantly.

### 2. 🔍 Grammar & Advanced Sentence Engine
- **Complex Grammar Parser**: Rule-based + AI detection for subject-verb agreement, plural noun verb mismatches, prepositions, articles, tense errors, repeated words, and parallel verb structures.
- **Shorthand & Typo Expansion**: Detects informal shorthand (`vry` → `very`, `mrning` → `morning`, `gud` → `good`) and sentence-start capitalization issues.
- **Categorized Issue Lists**: Filter by Spelling, Grammar, or Punctuation with 1-click correction buttons.

### 3. 🏷️ Parts of Speech & Sentence Error Analyzer
- **Dual Syntax & Error View**: Classifies words into 9 grammatical classes while highlighting errored parts of sentences in bright rose error badges.
- **Filter Toggle**: Easily switch between **"All Words"** and **"Errored Parts Only"** to pinpoint flawed sentence structures.

### 4. ✨ AI Text Rewriter & Improvement
- **10 Instant Rewrite Modes**:
  - `Fix Grammar`, `Make Professional`, `Make Academic`, `Make Simple`, `Make Concise`, `Expand`, `Improve Vocabulary`, `Improve Clarity`, `Make Formal`, `Make Casual`.
- **Instant Auto-Transform**: Clicking any mode button automatically transforms the text with zero extra clicks.

### 5. 📝 AI Document & Essay Generator (Up to 2,000+ Words)
- **Flexible Length Options**:
  - `Short (~100 words)`
  - `Medium (~250 words)`
  - `Long (~500 words)`
  - `Extended Essay (~1,000 words)`
  - `Comprehensive Guide (~2,000+ words)`
- **Structured Multi-Section Generation**: Generates full articles complete with Executive Overviews, Technical Sections, Empirical Case Studies, and Conclusions.

### 6. 🌐 Multilingual AI Translator
- **16 Global & Regional Languages**: Supports English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, French, German, Spanish, Portuguese, Arabic, Chinese, Japanese, and Korean.
- **Instant Auto-Translate & Loading Feedback**: Select any target language for instant side-by-side script translation with animated loading overlays.

### 7. 📊 Writing Quality Report
- **Quality Score (0 - 100)**: Visual score gauge with Flesch-Kincaid readability scoring, tone analysis, error distribution, and actionable recommendations.

### 8. 📄 Working Client-Side Exports (PDF & DOCX)
- **PDF Generation (`jspdf`)**: Generates multi-page formatted PDFs with metadata, tables, and page numbers.
- **DOCX Generation (`docx`)**: Creates valid Microsoft Word `.docx` files preserving headings and paragraph formatting.

### 9. 📚 Custom Dictionary
- Save custom terms, brand names, and jargon to `localStorage` to avoid false-positive spelling alerts.

### 10. 🌙 Dark Theme Default & Sleek Sidebar
- Defaults to Dark Mode for high contrast readability with a compact sidebar navigation.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS, Lucide React Icons
- **PDF Engine**: `jspdf`
- **DOCX Engine**: `docx`
- **Grammar & NLP Layer**: Custom Linguistic Rule Engine & Heuristic AI Rewriter
- **Persistence**: Browser `localStorage`

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Local Installation

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

Open `http://localhost:5173` (or assigned port) in your browser to test Textify.

---

## 📦 Production Build

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## 👤 Author & Links

Designed and developed by **Suhas S**.

- 🔗 **LinkedIn Profile**: [Suhas S on LinkedIn](https://www.linkedin.com/in/suhas-s-081b84335)
- 🐙 **GitHub Profile**: [@Suhas-Saur](https://github.com/Suhas-Saur)
- 🌐 **GitHub Repository**: [https://github.com/Suhas-Saur/textify](https://github.com/Suhas-Saur/textify)

---

## 📄 License

This project is licensed under the MIT License.
