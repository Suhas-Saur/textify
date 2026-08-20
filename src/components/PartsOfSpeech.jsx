import React, { useState, useMemo } from "react";
import { analyzePartsOfSpeech, checkGrammarAndSpelling } from "../utils/grammarEngine";
import { Tags, AlertCircle, CheckCircle2, Filter, Check } from "lucide-react";

const POS_COLORS = {
  Noun: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800",
  Verb: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  Adjective: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800",
  Adverb: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800",
  Pronoun: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800",
  Preposition: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-800",
  Conjunction: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300 border-pink-300 dark:border-pink-800",
  Interjection: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800",
  Determiner: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-800"
};

const PartsOfSpeech = ({ text }) => {
  const [filterMode, setFilterMode] = useState("all"); // "all", "errors"

  const { tokens, categoryCounts } = useMemo(() => analyzePartsOfSpeech(text), [text]);
  const { errors } = useMemo(() => checkGrammarAndSpelling(text), [text]);

  const totalWords = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  // Map errors to words/phrases
  const errorMap = useMemo(() => {
    const map = new Map();
    errors.forEach((err) => {
      const origLower = err.original.toLowerCase();
      map.set(origLower, err);
      // also split individual words of multi-word error original
      origLower.split(/\s+/).forEach((w) => {
        if (!map.has(w)) map.set(w, err);
      });
    });
    return map;
  }, [errors]);

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tags className="w-5 h-5 text-indigo-600" />
            Parts of Speech & Error Sentence Analyzer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Linguistic breakdown of your text categorized into 9 grammatical classes with live sentence error highlighting.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === "all" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All Words ({tokens.filter((t) => t.isWord).length})
          </button>
          <button
            onClick={() => setFilterMode("errors")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterMode === "errors" ? "bg-rose-600 text-white shadow-xs" : "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Errored Parts ({errors.length})</span>
          </button>
        </div>
      </div>

      {/* Category Breakdown & Error Summary */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Grammatical Breakdown & Error Count
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${errors.length > 0 ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"}`}>
            {errors.length} Sentence Errors Detected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Error Counter Badge */}
          <div className="px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 text-xs font-extrabold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Sentence Errors</span>
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px]">
              {errors.length}
            </span>
          </div>

          {Object.entries(categoryCounts).map(([cat, count]) => {
            const percentage = totalWords > 0 ? Math.round((count / totalWords) * 100) : 0;
            return (
              <div
                key={cat}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${POS_COLORS[cat] || "bg-slate-100"}`}
              >
                <span>{cat}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-black/30 text-[10px]">
                  {count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Errored Sentence Highlights List */}
      {errors.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Identified Errored Sentence Parts ({errors.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {errors.map((err) => (
              <div
                key={err.id}
                className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {err.type}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-2 py-0.5 rounded-md">
                    {err.category}
                  </span>
                </div>

                <p className="text-slate-800 dark:text-slate-200">
                  Faulty Part: <span className="line-through text-rose-600 font-mono font-bold bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-rose-300 dark:border-rose-800">{err.original}</span>
                </p>
                <p className="text-emerald-700 dark:text-emerald-300 font-bold">
                  Suggested Correction: <span className="underline font-mono bg-emerald-50 dark:bg-emerald-950 px-1 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">{err.suggestion}</span>
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  {err.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Color-Coded Word & Sentence View */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interactive Syntax & Sentence Error View
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 italic">
            Red bordered tags indicate detected sentence errors
          </span>
        </div>

        {!text.trim() ? (
          <div className="p-8 text-center text-slate-400 text-xs italic">
            Enter text in the Writing Assistant to view Parts of Speech breakdown.
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 leading-relaxed flex flex-wrap gap-1.5 items-baseline">
            {tokens.map((token, i) => {
              if (!token.isWord) {
                return (
                  <span key={i} className="text-slate-700 dark:text-slate-300 font-sans">
                    {token.text}
                  </span>
                );
              }

              const cleanToken = token.text.replace(/[^a-zA-Z]/g, "").toLowerCase();
              const hasError = errorMap.has(cleanToken);
              const errorInfo = errorMap.get(cleanToken);

              if (filterMode === "errors" && !hasError) {
                return null;
              }

              if (hasError) {
                return (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-600 text-white border-2 border-rose-400 dark:border-rose-300 shadow-md inline-flex items-center gap-1 cursor-help"
                    title={`Sentence Error: "${token.text}" → Suggestion: "${errorInfo?.suggestion}" (${errorInfo?.explanation})`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{token.text}</span>
                    <span className="text-[9px] font-mono bg-black/40 px-1 rounded text-rose-100 uppercase">
                      [ERR: {errorInfo?.suggestion}]
                    </span>
                  </span>
                );
              }

              return (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${POS_COLORS[token.pos]} shadow-2xs inline-flex items-center gap-1 cursor-default`}
                  title={`${token.text} → ${token.pos}`}
                >
                  <span>{token.text}</span>
                  <span className="text-[9px] opacity-75 font-mono uppercase">[{token.pos.slice(0, 3)}]</span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsOfSpeech;
