import React from "react";
import { Menu, FilePlus, Download, Smartphone, Monitor } from "lucide-react";

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

const Navbar = ({ activeTab, setIsMobileOpen, onResetText, onExportPDF, isMobileMode, setIsMobileMode }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {TITLE_MAP[activeTab] || "Textify Platform"}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            Powered by Textify AI Engine • Created by Suhas S
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile / Desktop View Mode Switcher Toggle Button */}
        <button
          onClick={() => setIsMobileMode(!isMobileMode)}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
            isMobileMode
              ? "bg-amber-500 hover:bg-amber-600 border-amber-400 text-slate-950 shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
          title="Switch View Mode (Mobile Touch-Optimized vs Desktop)"
        >
          {isMobileMode ? <Smartphone className="w-4 h-4 text-slate-950" /> : <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
          <span>{isMobileMode ? "Mobile Mode" : "Desktop Mode"}</span>
        </button>

        <button
          onClick={onResetText}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Draft</span>
        </button>

        <button
          onClick={onExportPDF}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
