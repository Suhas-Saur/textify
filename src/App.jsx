import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import WritingAssistant from "./components/WritingAssistant";
import GrammarChecker from "./components/GrammarChecker";
import PartsOfSpeech from "./components/PartsOfSpeech";
import AIImprove from "./components/AIImprove";
import ParagraphGenerator from "./components/ParagraphGenerator";
import Translator from "./components/Translator";
import WritingReport from "./components/WritingReport";
import CustomDictionary from "./components/CustomDictionary";
import { calculateTextStats, checkGrammarAndSpelling } from "./utils/grammarEngine";
import { exportToPDF } from "./utils/exportPDF";

const DEFAULT_SAMPLE_TEXT = "Textify is an AI English writing, grammar, learning, and document generation platform. The students was preparing for their final examination, but many of them does not understand the topics properly.";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [text, setText] = useState(DEFAULT_SAMPLE_TEXT);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Dark Mode Persistence (Default to true for Dark Theme)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("textify_dark");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Mobile Mode Persistence (Auto-detect mobile screen or saved preference)
  const [isMobileMode, setIsMobileMode] = useState(() => {
    const saved = localStorage.getItem("textify_mobile_mode");
    if (saved !== null) return JSON.parse(saved);
    return window.innerWidth < 768;
  });

  useEffect(() => {
    localStorage.setItem("textify_dark", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("textify_mobile_mode", JSON.stringify(isMobileMode));
  }, [isMobileMode]);

  // Custom Dictionary Persistence
  const [dictionary, setDictionary] = useState(() => {
    const saved = localStorage.getItem("textify_dict");
    return saved ? JSON.parse(saved) : ["Textify", "Suhas", "Netlify"];
  });

  const handleAddWord = (word) => {
    if (!dictionary.includes(word)) {
      const updated = [...dictionary, word];
      setDictionary(updated);
      localStorage.setItem("textify_dict", JSON.stringify(updated));
    }
  };

  const handleRemoveWord = (word) => {
    const updated = dictionary.filter((w) => w !== word);
    setDictionary(updated);
    localStorage.setItem("textify_dict", JSON.stringify(updated));
  };

  // Real-Time Analysis
  const stats = useMemo(() => calculateTextStats(text), [text]);
  const { errors, score, correctedText } = useMemo(
    () => checkGrammarAndSpelling(text, dictionary),
    [text, dictionary]
  );

  const handleApplyCorrection = (err) => {
    setText((prev) => prev.replace(err.original, err.suggestion));
  };

  const handleIgnoreError = (errId) => {
    // Ignored dynamically for current session
  };

  const handleApplyAll = () => {
    setText(correctedText);
  };

  const handleResetText = () => {
    setText("");
  };

  const handleExportPDF = () => {
    exportToPDF({
      title: "Textify Platform Export",
      content: text,
      stats,
      errors,
      score,
      filename: "Textify_Document"
    });
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200 ${isMobileMode ? "text-base leading-relaxed" : ""}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isMobileMode={isMobileMode}
        setIsMobileMode={setIsMobileMode}
      />

      {/* Main Content Area */}
      <div className="lg:pl-60 flex-1 flex flex-col min-h-screen">
        <Navbar
          activeTab={activeTab}
          setIsMobileOpen={setIsMobileOpen}
          onResetText={handleResetText}
          onExportPDF={handleExportPDF}
          isMobileMode={isMobileMode}
          setIsMobileMode={setIsMobileMode}
        />

        <main className="flex-1 pb-12">
          {activeTab === "dashboard" && (
            <Dashboard stats={{ ...stats, score }} setActiveTab={setActiveTab} isMobileMode={isMobileMode} />
          )}

          {activeTab === "writing-assistant" && (
            <WritingAssistant
              text={text}
              setText={setText}
              stats={stats}
              errors={errors}
              score={score}
              onCheckText={() => setActiveTab("grammar-check")}
              onApplyCorrection={handleApplyCorrection}
              onIgnoreError={handleIgnoreError}
              setActiveTab={setActiveTab}
              isMobileMode={isMobileMode}
            />
          )}

          {activeTab === "grammar-check" && (
            <GrammarChecker
              errors={errors}
              onApplyCorrection={handleApplyCorrection}
              onIgnoreError={handleIgnoreError}
              onApplyAll={handleApplyAll}
              text={text}
              setText={setText}
              isMobileMode={isMobileMode}
            />
          )}

          {activeTab === "parts-of-speech" && <PartsOfSpeech text={text} isMobileMode={isMobileMode} />}

          {activeTab === "ai-improve" && <AIImprove text={text} setText={setText} isMobileMode={isMobileMode} />}

          {activeTab === "paragraph-generator" && <ParagraphGenerator isMobileMode={isMobileMode} />}

          {activeTab === "translator" && <Translator text={text} isMobileMode={isMobileMode} />}

          {activeTab === "writing-report" && (
            <WritingReport text={text} stats={stats} errors={errors} score={score} isMobileMode={isMobileMode} />
          )}

          {activeTab === "dictionary" && (
            <CustomDictionary
              dictionary={dictionary}
              onAddWord={handleAddWord}
              onRemoveWord={handleRemoveWord}
              isMobileMode={isMobileMode}
            />
          )}
        </main>

        {/* Footer Credit */}
        <footer className="py-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Textify Platform © 2026 • Designed & Built by{" "}
            <a
              href="https://www.linkedin.com/in/suhas-s-081b84335"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Suhas S
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
