import React, { useState } from "react";
import { CheckCircle2, Check, X, ShieldAlert, Sparkles } from "lucide-react";

const GrammarChecker = ({ errors, onApplyCorrection, onIgnoreError, onApplyAll, text, setText }) => {
  const [filter, setFilter] = useState("all");

  const filteredErrors = errors.filter((e) => {
    if (filter === "all") return true;
    if (filter === "spelling") return e.type.toLowerCase().includes("spelling");
    if (filter === "grammar") return e.type.toLowerCase().includes("grammar") || e.type.toLowerCase().includes("verb");
    return true;
  });

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            Grammar & Spell Checker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Detect and resolve spelling errors, subject-verb agreement issues, preposition mistakes, and punctuation.
          </p>
        </div>

        {errors.length > 0 && (
          <button
            onClick={onApplyAll}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply All Fixes ({errors.length})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === "all" ? "bg-teal-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100"
          }`}
        >
          All Issues ({errors.length})
        </button>
        <button
          onClick={() => setFilter("spelling")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === "spelling" ? "bg-teal-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100"
          }`}
        >
          Spelling
        </button>
        <button
          onClick={() => setFilter("grammar")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === "grammar" ? "bg-teal-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100"
          }`}
        >
          Grammar
        </button>
      </div>

      {/* Errors Cards List */}
      {filteredErrors.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Text is Clean!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            No grammatical or spelling issues match the selected filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredErrors.map((err) => (
            <div
              key={err.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[11px] font-bold">
                    {err.type}
                  </span>
                  <button
                    onClick={() => onIgnoreError(err.id)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <p className="text-xs text-slate-500">Incorrect Segment:</p>
                  <p className="text-sm font-bold text-rose-600 dark:text-rose-400 line-through font-mono">
                    "{err.original}"
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 space-y-1">
                  <p className="text-xs text-teal-700 dark:text-teal-400">Suggested Fix:</p>
                  <p className="text-sm font-bold text-teal-900 dark:text-teal-200 font-mono">
                    "{err.suggestion}"
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {err.explanation}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => onApplyCorrection(err)}
                  className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Fix</span>
                </button>
                <button
                  onClick={() => onIgnoreError(err.id)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarChecker;
