import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  RotateCcw,
  RotateCw,
  Trash2,
  CheckCircle2,
  Sparkles,
  Tags,
  Languages,
  BarChart3,
  Check,
  X,
  AlertCircle,
  Copy,
  Download
} from "lucide-react";
import { exportToPDF } from "../utils/exportPDF";
import { exportToDOCX } from "../utils/exportDOCX";

const WritingAssistant = ({
  text,
  setText,
  stats,
  errors,
  score,
  onCheckText,
  onApplyCorrection,
  onIgnoreError,
  setActiveTab
}) => {
  const [copied, setCopied] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingDOCX, setExportingDOCX] = useState(false);

  // Undo / Redo History Stack
  const [history, setHistory] = useState([text]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateTextWithHistory = (newVal) => {
    setText(newVal);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newVal);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setText(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setText(next);
    }
  };

  const handleFormatText = (prefix, suffix = prefix) => {
    const textarea = document.getElementById("main-editor-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.substring(start, end) || "text";
    const replacement = `${prefix}${selected}${suffix}`;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    updateTextWithHistory(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = async () => {
    setExportingPDF(true);
    try {
      await exportToPDF({
        title: "Textify Writing Analysis Report",
        content: text,
        stats,
        errors,
        score,
        filename: "Textify_Writing_Assistant"
      });
    } catch (e) {
      console.error(e);
    } finally {
      setExportingPDF(false);
    }
  };

  const handleExportDOCX = async () => {
    setExportingDOCX(true);
    try {
      await exportToDOCX({
        title: "Textify Writing Analysis Report",
        content: text,
        stats,
        errors,
        score,
        filename: "Textify_Writing_Assistant"
      });
    } catch (e) {
      console.error(e);
    } finally {
      setExportingDOCX(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Editor & Analysis Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Section (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            {/* Toolbar */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFormatText("**")}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  title="Bold (**text**)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFormatText("*")}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 italic"
                  title="Italic (*text*)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFormatText("<u>", "</u>")}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 underline"
                  title="Underline (<u>text</u>)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                  title="Undo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                  title="Redo"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  onClick={() => updateTextWithHistory("")}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40"
                  title="Clear Text"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exportingPDF}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{exportingPDF ? "PDF..." : "PDF"}</span>
                </button>
                <button
                  onClick={handleExportDOCX}
                  disabled={exportingDOCX}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{exportingDOCX ? "DOCX..." : "DOCX"}</span>
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div className="p-4 lg:p-6 flex-1 flex flex-col">
              <textarea
                id="main-editor-textarea"
                value={text}
                onChange={(e) => updateTextWithHistory(e.target.value)}
                placeholder="Write or paste your text here..."
                className="w-full flex-1 min-h-[350px] bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none font-sans text-base leading-relaxed"
              />
            </div>

            {/* Bottom Bar Stats */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span>Words: <strong className="text-slate-900 dark:text-slate-200">{stats.words}</strong></span>
                <span>Chars: <strong className="text-slate-900 dark:text-slate-200">{stats.characters}</strong></span>
                <span>Sentences: <strong className="text-slate-900 dark:text-slate-200">{stats.sentences}</strong></span>
                <span>Reading Time: <strong className="text-slate-900 dark:text-slate-200">{stats.readingTime}</strong></span>
              </div>
              <div className="text-teal-600 dark:text-teal-400 font-semibold">
                Score: {score}/100
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={onCheckText}
              className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check Text</span>
            </button>

            <button
              onClick={() => setActiveTab("ai-improve")}
              className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Improve</span>
            </button>

            <button
              onClick={() => setActiveTab("parts-of-speech")}
              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Tags className="w-4 h-4" />
              <span>POS Tags</span>
            </button>

            <button
              onClick={() => setActiveTab("translator")}
              className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Languages className="w-4 h-4" />
              <span>Translate</span>
            </button>

            <button
              onClick={() => setActiveTab("writing-report")}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer col-span-2 sm:col-span-1"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* Right Analysis Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Real-Time Analysis
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs">
                Score: {score}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-slate-500 dark:text-slate-400">Readability</p>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{stats.readability}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-slate-500 dark:text-slate-400">Tone</p>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{stats.tone}</p>
              </div>
            </div>

            {/* Issue Suggestions List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detected Issues ({errors.length})
              </h4>

              {errors.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Great Job!</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">No spelling or grammar errors detected.</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {errors.map((err) => (
                    <div
                      key={err.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {err.type}
                        </span>
                        <button
                          onClick={() => onIgnoreError(err.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                          title="Ignore"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-600 dark:text-slate-300">
                          Original: <span className="line-through text-rose-500 font-mono">{err.original}</span>
                        </p>
                        <p className="text-teal-700 dark:text-teal-300 font-bold">
                          Suggestion: <span className="underline font-mono">{err.suggestion}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                          {err.explanation}
                        </p>
                      </div>

                      <button
                        onClick={() => onApplyCorrection(err)}
                        className="w-full py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply Correction</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingAssistant;
