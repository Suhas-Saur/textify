import React, { useState, useEffect } from "react";
import { Sparkles, Copy, RefreshCw, Check, ArrowRight } from "lucide-react";
import { improveTextWithAI } from "../utils/aiEngine";

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

  const runTransformation = async (modeToUse = selectedMode, currentText = text) => {
    if (!currentText || !currentText.trim()) {
      setImprovedText("");
      return;
    }
    setLoading(true);
    try {
      const res = await improveTextWithAI(currentText, modeToUse);
      setImprovedText(res.improvedText);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Run initial transformation on load and when text changes
  useEffect(() => {
    runTransformation(selectedMode, text);
  }, [selectedMode, text]);

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    runTransformation(mode, text);
  };

  const handleCopy = () => {
    if (improvedText) {
      navigator.clipboard.writeText(improvedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
          onClick={() => runTransformation(selectedMode, text)}
          disabled={loading || !text.trim()}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? "Transforming..." : "Re-Transform Text"}</span>
        </button>
      </div>

      {/* Mode Selector */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Transformation Mode (Click to Transform Instantly)
        </h3>
        <div className="flex flex-wrap gap-2">
          {MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => handleSelectMode(mode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMode === mode
                  ? "bg-purple-600 text-white shadow-md scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editable Original Text */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2 flex-1 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Original Input Text (Editable)
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to improve..."
              className="w-full flex-1 min-h-[220px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 text-sm focus:outline-none resize-none border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Improved Output */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Improved Output ({selectedMode})</span>
              </h3>
              {loading && <span className="text-[11px] font-semibold text-purple-500 animate-pulse">Processing AI...</span>}
            </div>
            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-sm text-slate-900 dark:text-slate-100 min-h-[220px] whitespace-pre-wrap leading-relaxed">
              {loading ? (
                <div className="flex items-center justify-center h-48 text-purple-600">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                improvedText || <span className="italic text-slate-400">Select a mode above to generate improved version...</span>
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              disabled={!improvedText || loading}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy"}</span>
            </button>

            <button
              onClick={handleReplace}
              disabled={!improvedText || loading}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {replaced ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              <span>{replaced ? "Replaced Original!" : "Replace Original"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImprove;
