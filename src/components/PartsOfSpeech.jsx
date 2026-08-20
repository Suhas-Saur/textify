import React, { useMemo } from "react";
import { analyzePartsOfSpeech } from "../utils/grammarEngine";
import { Tags, Info } from "lucide-react";

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
  const { tokens, categoryCounts } = useMemo(() => analyzePartsOfSpeech(text), [text]);

  const totalWords = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Tags className="w-5 h-5 text-indigo-600" />
          Parts of Speech Analyzer
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Linguistic breakdown of your text categorized into 9 grammatical classes with color-coded syntax highlighting.
        </p>
      </div>

      {/* Category Legend & Stats Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Grammatical Category Breakdown
        </h3>

        <div className="flex flex-wrap gap-2">
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

      {/* Interactive Color-Coded Word Canvas */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Color-Coded Text View
        </h3>

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
