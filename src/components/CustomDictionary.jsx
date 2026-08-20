import React, { useState } from "react";
import { BookMarked, Plus, Trash2, Search, Check } from "lucide-react";

const CustomDictionary = ({ dictionary, onAddWord, onRemoveWord }) => {
  const [newWord, setNewWord] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newWord.trim()) {
      onAddWord(newWord.trim());
      setNewWord("");
    }
  };

  const filteredWords = dictionary.filter((w) =>
    w.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-teal-600" />
          My Custom Dictionary
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add custom terms, brand names, and jargon to prevent them from being flagged as spelling errors.
        </p>
      </div>

      {/* Add Word Form & Search */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Enter custom word to add (e.g. Textify)..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!newWord.trim()}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Word</span>
          </button>
        </form>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search custom dictionary..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Dictionary Saved Words List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Saved Words ({dictionary.length})
        </h3>

        {filteredWords.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs italic">
            No words found in your custom dictionary.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filteredWords.map((word) => (
              <div
                key={word}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-medium text-slate-800 dark:text-slate-200 group"
              >
                <span className="truncate">{word}</span>
                <button
                  onClick={() => onRemoveWord(word)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove word"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDictionary;
