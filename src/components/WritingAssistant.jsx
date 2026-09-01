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
  Download,
  ArrowRight,
  RefreshCw,
  Smartphone
} from "lucide-react";
import { exportToPDF } from "../utils/exportPDF";
import { exportToDOCX } from "../utils/exportDOCX";
import { checkGrammarAndSpelling } from "../utils/grammarEngine";
import { improveTextWithAI } from "../utils/aiEngine";

const AI_MODES = [
  "Make Professional",
  "Make Academic",
  "Make Simple",
  "Make Concise",
  "Expand",
  "Improve Vocabulary"
];

const WritingAssistant = ({
  text,
  setText,
  stats,
  errors,
  score,
  onApplyCorrection,
  onIgnoreError,
  setActiveTab,
  isMobileMode
}) => {
  const [sideTab, setSideTab] = useState("issues"); // "issues", "autocorrect", "aienhance"
  const [aiMode, setAiMode] = useState("Make Professional");
  const [enhancedText, setEnhancedText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [appliedAI, setAppliedAI] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingDOCX, setExportingDOCX] = useState(false);

  // Auto-corrected sentence pre-computation
  const { correctedText } = checkGrammarAndSpelling(text);

  // Auto-run AI Enhance when sideTab === "aienhance" or when mode/text changes
  const runAiEnhance = async (mode = aiMode, currentText = text) => {
    if (!currentText || !currentText.trim()) {
      setEnhancedText("");
      return;
    }
    setAiLoading(true);
    try {
      const res = await improveTextWithAI(currentText, mode);
      setEnhancedText(res.improvedText);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  // Undo / Redo History Stack
  const [history, setHistory] = useState([text]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateTextWithHistory = (newVal) => {
    const cleanVal = newVal.replace(/<[^>]*>/g, "");
    setText(cleanVal);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(cleanVal);
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

  const handleApplyAICorrected = () => {
    updateTextWithHistory(correctedText);
    setAppliedAI(true);
    setTimeout(() => setAppliedAI(false), 2000);
  };

  const handleApplyEnhanced = () => {
    if (enhancedText) {
      updateTextWithHistory(enhancedText);
      setAppliedAI(true);
      setTimeout(() => setAppliedAI(false), 2000);
    }
  };

  const handleApplyAllErrors = () => {
    updateTextWithHistory(correctedText);
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
    <div className={`p-3 sm:p-5 max-w-7xl mx-auto space-y-4 ${isMobileMode ? "space-y-5" : ""}`}>
      {/* Mobile Mode High-Readability Notice Banner */}
      {isMobileMode && (
        <div className="p-4 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 text-amber-900 dark:text-amber-200 text-sm font-extrabold flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-sm font-extrabold">Ultra-Readable Mobile Mode Active — Extra Large Text & Large Touch Buttons</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black uppercase shrink-0">
            ON
          </span>
        </div>
      )}

      {/* Editor & Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Editor Section */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden flex flex-col min-h-[500px]">
            {/* Toolbar with Large Icons in Mobile Mode */}
            <div className={`px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 ${isMobileMode ? "py-3.5 px-4" : ""}`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleFormatText("**")}
                  className={`rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-black cursor-pointer ${
                    isMobileMode ? "p-3 text-base min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 dark:bg-slate-800" : "p-2"
                  }`}
                  title="Bold (**text**)"
                >
                  <Bold className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
                </button>
                <button
                  onClick={() => handleFormatText("*")}
                  className={`rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 italic cursor-pointer ${
                    isMobileMode ? "p-3 text-base min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 dark:bg-slate-800" : "p-2"
                  }`}
                  title="Italic (*text*)"
                >
                  <Italic className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
                </button>
                <button
                  onClick={() => handleFormatText("__")}
                  className={`rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 underline cursor-pointer ${
                    isMobileMode ? "p-3 text-base min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 dark:bg-slate-800" : "p-2"
                  }`}
                  title="Underline (__text__)"
                >
                  <Underline className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
                </button>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className={`rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer ${
                    isMobileMode ? "p-3 text-base min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 dark:bg-slate-800" : "p-2"
                  }`}
                  title="Undo"
                >
                  <RotateCcw className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className={`rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer ${
                    isMobileMode ? "p-3 text-base min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 dark:bg-slate-800" : "p-2"
                  }`}
                  title="Redo"
                >
                  <RotateCw className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
                </button>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  onClick={() => updateTextWithHistory("")}
                  className={`rounded-xl text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40 cursor-pointer ${
                    isMobileMode ? "p-3 text-base min-w-[44px] min-h-[44px] flex items-center justify-center bg-rose-50 dark:bg-rose-950/40" : "p-2"
                  }`}
                  title="Clear Text"
                >
                  <Trash2 className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
                </button>
              </div>

              {/* Top Export & Copy Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`rounded-xl font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer ${
                    isMobileMode ? "py-2.5 px-3.5 text-xs sm:text-sm font-extrabold shadow-xs" : "py-1.5 px-2.5 text-xs"
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exportingPDF}
                  className={`rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer ${
                    isMobileMode ? "py-2.5 px-3.5 text-xs sm:text-sm font-extrabold" : "py-1.5 px-2.5 text-xs"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>{exportingPDF ? "PDF..." : "PDF"}</span>
                </button>
                <button
                  onClick={handleExportDOCX}
                  disabled={exportingDOCX}
                  className={`rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer ${
                    isMobileMode ? "py-2.5 px-3.5 text-xs sm:text-sm font-extrabold" : "py-1.5 px-2.5 text-xs"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>{exportingDOCX ? "DOCX..." : "DOCX"}</span>
                </button>
              </div>
            </div>

            {/* Main Text Editor Area with Expanded Mobile Font & Padding */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <textarea
                id="main-editor-textarea"
                value={text}
                onChange={(e) => updateTextWithHistory(e.target.value)}
                placeholder="Write or paste your text here..."
                className={`w-full flex-1 min-h-[360px] bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none font-sans ${
                  isMobileMode
                    ? "text-xl sm:text-2xl leading-relaxed p-2 font-medium"
                    : "text-base leading-relaxed"
                }`}
              />
            </div>

            {/* Bottom Bar Stats */}
            <div className={`px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 ${
              isMobileMode ? "text-sm py-4 px-5" : ""
            }`}>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-5">
                <span>Words: <strong className="text-slate-900 dark:text-slate-100 font-black text-sm sm:text-base">{stats.words}</strong></span>
                <span>Chars: <strong className="text-slate-900 dark:text-slate-100 font-black text-sm sm:text-base">{stats.characters}</strong></span>
                <span>Sentences: <strong className="text-slate-900 dark:text-slate-100 font-black text-sm sm:text-base">{stats.sentences}</strong></span>
                <span>Reading Time: <strong className="text-slate-900 dark:text-slate-100 font-black text-sm sm:text-base">{stats.readingTime}</strong></span>
              </div>
              <div className="text-teal-600 dark:text-teal-400 font-extrabold text-sm sm:text-base">
                Score: {score}/100
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons with Extra Large Touch Targets in Mobile Mode */}
          <div className={`grid gap-2.5 sm:gap-3 ${isMobileMode ? "grid-cols-2 sm:grid-cols-5" : "grid-cols-2 sm:grid-cols-5"}`}>
            <button
              onClick={() => setSideTab("issues")}
              className={`rounded-2xl font-black flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer ${
                isMobileMode ? "py-4 px-4 text-base border-2" : "py-2.5 px-3 text-xs border"
              } ${
                sideTab === "issues"
                  ? "bg-teal-600 text-white border-teal-500 shadow-teal-600/30"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100"
              }`}
            >
              <CheckCircle2 className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
              <span>Errors ({errors.length})</span>
            </button>

            <button
              onClick={() => {
                setSideTab("aienhance");
                runAiEnhance(aiMode, text);
              }}
              className={`rounded-2xl font-black flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer ${
                isMobileMode ? "py-4 px-4 text-base border-2" : "py-2.5 px-3 text-xs border"
              } ${
                sideTab === "aienhance"
                  ? "bg-purple-600 text-white border-purple-500 shadow-purple-600/30"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100"
              }`}
            >
              <Sparkles className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
              <span>AI Enhance</span>
            </button>

            <button
              onClick={() => setActiveTab("parts-of-speech")}
              className={`rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer ${
                isMobileMode ? "py-4 px-4 text-base" : "py-2.5 px-3 text-xs"
              }`}
            >
              <Tags className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
              <span>POS Tags</span>
            </button>

            <button
              onClick={() => setActiveTab("translator")}
              className={`rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer ${
                isMobileMode ? "py-4 px-4 text-base" : "py-2.5 px-3 text-xs"
              }`}
            >
              <Languages className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
              <span>Translate</span>
            </button>

            <button
              onClick={() => setActiveTab("writing-report")}
              className={`rounded-2xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white font-black flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                isMobileMode ? "py-4 px-4 text-base" : "py-2.5 px-3 text-xs"
              }`}
            >
              <BarChart3 className={isMobileMode ? "w-5 h-5" : "w-4 h-4"} />
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* Error Analysis Panel with Touch-Friendly Card Spacing */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-md space-y-4 min-h-[500px] flex flex-col justify-between">
            <div>
              {/* Side-by-Side Header & Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSideTab("issues")}
                    className={`rounded-xl font-black transition-all cursor-pointer ${
                      sideTab === "issues" ? "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 shadow-xs border border-teal-200/60" : "text-slate-400 hover:text-slate-600"
                    } ${isMobileMode ? "text-base py-2.5 px-4" : "text-xs py-1.5 px-3"}`}
                  >
                    Errors ({errors.length})
                  </button>
                  <button
                    onClick={() => setSideTab("autocorrect")}
                    className={`rounded-xl font-black transition-all cursor-pointer ${
                      sideTab === "autocorrect" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-xs border border-emerald-200/60" : "text-slate-400 hover:text-slate-600"
                    } ${isMobileMode ? "text-base py-2.5 px-4" : "text-xs py-1.5 px-3"}`}
                  >
                    AI Correct
                  </button>
                  <button
                    onClick={() => {
                      setSideTab("aienhance");
                      runAiEnhance(aiMode, text);
                    }}
                    className={`rounded-xl font-black transition-all cursor-pointer ${
                      sideTab === "aienhance" ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shadow-xs border border-purple-200/60" : "text-slate-400 hover:text-slate-600"
                    } ${isMobileMode ? "text-base py-2.5 px-4" : "text-xs py-1.5 px-3"}`}
                  >
                    AI Enhance
                  </button>
                </div>

                <span className={`px-3 py-1.5 rounded-full text-xs font-black ${score >= 80 ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"}`}>
                  Score: {score}
                </span>
              </div>

              {/* Document Metrics Bar */}
              <div className="grid grid-cols-2 gap-3.5 text-xs my-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Readability Rating</p>
                  <p className="font-black text-slate-900 dark:text-white text-base sm:text-lg mt-0.5">{stats.readability}</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Detected Tone</p>
                  <p className="font-black text-slate-900 dark:text-white text-base sm:text-lg mt-0.5">{stats.tone}</p>
                </div>
              </div>

              {/* TAB 1: DETECTED ISSUES LIST */}
              {sideTab === "issues" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-400">
                      Detected Issues ({errors.length})
                    </h4>
                    {errors.length > 0 && (
                      <button
                        onClick={handleApplyAllErrors}
                        className={`rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm transition-colors cursor-pointer shadow-md ${
                          isMobileMode ? "py-3 px-4 text-sm font-black" : "py-1.5 px-3"
                        }`}
                      >
                        Fix All ({errors.length}) Errors
                      </button>
                    )}
                  </div>

                  {errors.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-2">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      <p className="text-lg font-black text-emerald-900 dark:text-emerald-300">Perfect Writing!</p>
                      <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">No spelling, grammar, or punctuation errors detected.</p>
                    </div>
                  ) : (
                    <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                      {errors.map((err) => (
                        <div
                          key={err.id}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-rose-600 dark:text-rose-400 flex items-center gap-2 text-sm sm:text-base">
                              <AlertCircle className="w-5 h-5" />
                              {err.type}
                            </span>
                            <button
                              onClick={() => onIgnoreError(err.id)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                              title="Ignore"
                            >
                              <X className="w-6 h-6" />
                            </button>
                          </div>

                          <div className="space-y-2 text-sm sm:text-base">
                            <p className="text-slate-700 dark:text-slate-200 font-medium">
                              Incorrect: <span className="line-through text-rose-500 font-mono font-extrabold">{err.original}</span>
                            </p>
                            <p className="text-teal-700 dark:text-teal-300 font-extrabold">
                              Suggestion: <span className="underline font-mono font-black">{err.suggestion}</span>
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs sm:text-sm">
                              {err.explanation}
                            </p>
                          </div>

                          {/* Extra Large Tap Target Fix Button */}
                          <button
                            onClick={() => onApplyCorrection(err)}
                            className={`w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                              isMobileMode ? "py-4 text-base sm:text-lg" : "py-2.5 text-xs sm:text-sm"
                            }`}
                          >
                            <Check className="w-5 h-5" />
                            <span>Apply Fix</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SIDE-BY-SIDE AI AUTO-CORRECTED BOX */}
              {sideTab === "autocorrect" && (
                <div className="space-y-3.5">
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Corrected Output (Side-by-Side)</span>
                  </h4>

                  <div className={`p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 font-medium text-slate-900 dark:text-slate-100 leading-relaxed min-h-[260px] whitespace-pre-wrap ${
                    isMobileMode ? "text-lg sm:text-xl p-5" : "text-sm sm:text-base"
                  }`}>
                    {correctedText || <span className="italic text-slate-400">Corrected text will appear here...</span>}
                  </div>

                  <button
                    onClick={handleApplyAICorrected}
                    disabled={!text.trim() || text === correctedText}
                    className={`w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isMobileMode ? "py-4 text-base sm:text-lg" : "py-3 text-xs sm:text-sm"
                    }`}
                  >
                    {appliedAI ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    <span>{appliedAI ? "Applied All AI Corrections!" : "Replace with Corrected Text"}</span>
                  </button>
                </div>
              )}

              {/* TAB 3: SIDE-BY-SIDE AI ENHANCE BOX */}
              {sideTab === "aienhance" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Enhance Side-by-Side</span>
                    </h4>
                    {aiLoading && <RefreshCw className="w-5 h-5 text-purple-500 animate-spin" />}
                  </div>

                  {/* Mode Badges */}
                  <div className="flex flex-wrap gap-2">
                    {AI_MODES.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setAiMode(m);
                          runAiEnhance(m, text);
                        }}
                        className={`rounded-xl font-extrabold transition-all cursor-pointer ${
                          aiMode === m
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                        } ${isMobileMode ? "text-sm py-3 px-4" : "text-xs py-1.5 px-3"}`}
                      >
                        {m.replace("Make ", "")}
                      </button>
                    ))}
                  </div>

                  <div className={`p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-slate-900 dark:text-slate-100 min-h-[220px] whitespace-pre-wrap leading-relaxed ${
                    isMobileMode ? "text-lg sm:text-xl p-5" : "text-sm sm:text-base"
                  }`}>
                    {aiLoading ? (
                      <div className="flex items-center justify-center h-40 text-purple-600">
                        <RefreshCw className="w-7 h-7 animate-spin" />
                      </div>
                    ) : (
                      enhancedText || <span className="italic text-slate-400">Select mode to generate enhanced text...</span>
                    )}
                  </div>

                  <button
                    onClick={handleApplyEnhanced}
                    disabled={!enhancedText || aiLoading}
                    className={`w-full rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isMobileMode ? "py-4 text-base sm:text-lg" : "py-3 text-xs sm:text-sm"
                    }`}
                  >
                    {appliedAI ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    <span>{appliedAI ? "Applied AI Enhancement!" : "Apply AI Enhancement"}</span>
                  </button>
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
