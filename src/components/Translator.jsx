import React, { useState, useEffect } from "react";
import { Languages, ArrowRightLeft, Copy, Download, Check, RefreshCw } from "lucide-react";
import { translateTextWithAI } from "../utils/aiEngine";
import { exportToPDF } from "../utils/exportPDF";
import { exportToDOCX } from "../utils/exportDOCX";

const LANGUAGES = [
  "English", "Hindi", "Kannada", "Tamil", "Telugu", "Malayalam",
  "Marathi", "Bengali", "French", "German", "Spanish", "Portuguese",
  "Arabic", "Chinese", "Japanese", "Korean"
];

const Translator = ({ text }) => {
  const [inputText, setInputText] = useState(text || "");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Kannada");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runTranslation = async (srcText = inputText, tgtLang = targetLang) => {
    if (!srcText || !srcText.trim()) {
      setTranslatedText("");
      return;
    }
    setLoading(true);
    try {
      const res = await translateTextWithAI(srcText, tgtLang);
      setTranslatedText(res.translatedText);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Run translation automatically on mount or when inputs/languages change
  useEffect(() => {
    runTranslation(inputText, targetLang);
  }, [inputText, targetLang, sourceLang]);

  const handleTargetLangChange = (newLang) => {
    setTargetLang(newLang);
    runTranslation(inputText, newLang);
  };

  const handleSwap = () => {
    const tempL = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempL);

    const tempT = inputText;
    setInputText(translatedText);
    setTranslatedText(tempT);
    runTranslation(translatedText, tempL);
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePDF = () => {
    if (!translatedText) return;
    exportToPDF({
      title: `Translation: ${sourceLang} → ${targetLang}`,
      content: inputText,
      correctedContent: translatedText,
      filename: `Textify_Translation_${targetLang}`
    });
  };

  const handleDOCX = () => {
    if (!translatedText) return;
    exportToDOCX({
      title: `Translation: ${sourceLang} → ${targetLang}`,
      content: inputText,
      correctedContent: translatedText,
      filename: `Textify_Translation_${targetLang}`
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" />
            Multilingual AI Translator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Translate English writing across 16 global & regional Indian languages.
          </p>
        </div>

        <button
          onClick={() => runTranslation(inputText, targetLang)}
          disabled={loading || !inputText.trim()}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
          <span>{loading ? "Translating..." : "Re-Translate"}</span>
        </button>
      </div>

      {/* Language Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Source Language
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 mt-4 transition-colors cursor-pointer"
          title="Swap Languages"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Target Language (Translates Instantly)
          </label>
          <select
            value={targetLang}
            onChange={(e) => handleTargetLangChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Translation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Box */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Original Text ({sourceLang})
          </h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text to translate..."
            className="w-full min-h-[250px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 text-sm focus:outline-none resize-none border border-slate-200/60 dark:border-slate-700/60 font-sans leading-relaxed"
          />
        </div>

        {/* Target Box */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                <span>Translation ({targetLang})</span>
              </h3>
              {loading && <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />}
            </div>
            <div className="min-h-[250px] p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-slate-900 dark:text-slate-100 text-sm leading-relaxed whitespace-pre-wrap">
              {loading ? (
                <div className="flex items-center justify-center h-48 text-blue-600">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                translatedText || <span className="italic text-slate-400">Type text or select target language...</span>
              )}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!translatedText || loading}
              className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handlePDF}
              disabled={!translatedText || loading}
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            <button
              onClick={handleDOCX}
              disabled={!translatedText || loading}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOCX</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
