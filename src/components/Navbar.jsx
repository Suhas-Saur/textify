import React from "react";
import { Menu, Sparkles, FilePlus, Download } from "lucide-react";

const TITLE_MAP = {
  dashboard: "Executive Dashboard",
  "writing-assistant": "AI Writing Assistant",
  "grammar-check": "Grammar & Spell Checker",
  "parts-of-speech": "Parts of Speech Analyzer",
  "ai-improve": "AI Text Improvement & Rewriter",
  "paragraph-generator": "AI Paragraph Generator",
  translator: "Multilingual AI Translator",
  "writing-report": "Detailed Writing Report & Analytics",
  dictionary: "Custom Dictionary"
};

const Navbar = ({ activeTab, setIsMobileOpen, onResetText, onExportPDF }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {TITLE_MAP[activeTab] || "Textify Platform"}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            Powered by Textify AI Engine • Created by Suhas S
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetText}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Draft</span>
        </button>

        <button
          onClick={onExportPDF}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Document</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
