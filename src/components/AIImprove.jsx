import React, { useState } from "react";
import { Sparkles, Copy, Download, RefreshCw, Check, ArrowRight, ArrowRightLeft } from "lucide-react";
import { improveTextWithAI } from "../utils/aiEngine";
import { exportToPDF } from "../utils/exportPDF";
import { exportToDOCX } from "../utils/exportDOCX";

const MODES = [
  "Fix Grammar",
  "Make Professional",
  "Make Academic",
  "Make Simple",
  "Make Concise",
  "Expand",
  "Improve Vocabulary",
  "Improve Clarity",
  "Make Formal",
  "Make Casual"
];

const AIImprove = ({ text, setText }) => {
  const [selectedMode, setSelectedMode] = useState("Make Professional");
  const [improvedText, setImprovedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [replaced, setReplaced] = useState(false);

  const handleImprove = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await improveTextWithAI(text, selectedMode);
      setImprovedText(res.improvedText);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedText || text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplace = () => {
    if (improvedText) {
      setText(improvedText);
      setReplaced(true);
      setTimeout(() => setReplaced(false), 2000);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Text Improvement & Rewriter
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Transform tone, enhance vocabulary, increase clarity, or expand text across 10 specialized modes.
          </p>
        </div>

        <button
          onClick={handleImprove}
          disabled={loading || !text.trim()}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? "Processing..." : "Transform Text"}</span>
        </button>
      </div>

      {/* Mode Selector */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Transformation Mode
        </h3>
        <div className="flex flex-wrap gap-2">
          {MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedMode === mode
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Text */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Original Input Text
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-sm text-slate-800 dark:text-slate-200 min-h-[220px] whitespace-pre-wrap leading-relaxed">
              {text || <span className="italic text-slate-400">Enter text in the Writing Assistant...</span>}
            </div>
          </div>
        </div>

        {/* Improved Output */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                AI Improved Output ({selectedMode})
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-sm text-slate-900 dark:text-slate-100 min-h-[220px] whitespace-pre-wrap leading-relaxed">
              {improvedText || <span className="italic text-slate-400">Click "Transform Text" to generate improved version...</span>}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              disabled={!improvedText}
              className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handleReplace}
              disabled={!improvedText}
              className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              {replaced ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              <span>{replaced ? "Replaced!" : "Replace Original"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImprove;
