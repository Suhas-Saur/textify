import React, { useState, useEffect } from "react";
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
  RefreshCw
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
  setActiveTab
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
    // Automatically sanitize raw broken HTML tags if injected previously
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
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Expanded Grid: 7 cols Editor, 5 cols Error Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Editor Section (7 cols - 58%) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[540px]">
            {/* Toolbar */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFormatText("**")}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold cursor-pointer"
                  title="Bold (**text**)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFormatText("*")}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 italic cursor-pointer"
                  title="Italic (*text*)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFormatText("__")}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 underline cursor-pointer"
                  title="Underline (__text__)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Undo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Redo"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  onClick={() => updateTextWithHistory("")}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40 cursor-pointer"
                  title="Clear Text"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exportingPDF}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{exportingPDF ? "PDF..." : "PDF"}</span>
                </button>
                <button
                  onClick={handleExportDOCX}
                  disabled={exportingDOCX}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                className="w-full flex-1 min-h-[380px] bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none font-sans text-base leading-relaxed"
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
              onClick={() => setSideTab("issues")}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                sideTab === "issues"
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Errors ({errors.length})</span>
            </button>

            <button
              onClick={() => {
                setSideTab("aienhance");
                runAiEnhance(aiMode, text);
              }}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                sideTab === "aienhance"
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Enhance</span>
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

        {/* Substantially Larger Error Analysis Panel (5 cols - 42% width) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5 min-h-[540px] flex flex-col justify-between">
            <div>
              {/* Side-by-Side Header & Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSideTab("issues")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      sideTab === "issues" ? "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 shadow-xs" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Errors ({errors.length})
                  </button>
                  <button
                    onClick={() => setSideTab("autocorrect")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      sideTab === "autocorrect" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-xs" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    AI Correct
                  </button>
                  <button
                    onClick={() => {
                      setSideTab("aienhance");
                      runAiEnhance(aiMode, text);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      sideTab === "aienhance" ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shadow-xs" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    AI Enhance
                  </button>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${score >= 80 ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"}`}>
                  Score: {score}
                </span>
              </div>

              {/* Document Metrics Bar */}
              <div className="grid grid-cols-2 gap-3 text-xs my-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Readability Rating</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{stats.readability}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Detected Tone</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{stats.tone}</p>
                </div>
              </div>

              {/* TAB 1: DETECTED ISSUES LIST WITH WIDER CARDS */}
              {sideTab === "issues" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Detected Issues ({errors.length})
                    </h4>
                    {errors.length > 0 && (
                      <button
                        onClick={handleApplyAllErrors}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        Fix All ({errors.length}) Errors
                      </button>
                    )}
                  </div>

                  {errors.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">Perfect Writing!</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400">No spelling, grammar, or punctuation errors detected.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {errors.map((err) => (
                        <div
                          key={err.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 text-xs shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-xs">
                              <AlertCircle className="w-4 h-4" />
                              {err.type}
                            </span>
                            <button
                              onClick={() => onIgnoreError(err.id)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                              title="Ignore"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-1.5 text-xs">
                            <p className="text-slate-600 dark:text-slate-300">
                              Incorrect: <span className="line-through text-rose-500 font-mono font-bold">{err.original}</span>
                            </p>
                            <p className="text-teal-700 dark:text-teal-300 font-bold">
                              Suggestion: <span className="underline font-mono">{err.suggestion}</span>
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                              {err.explanation}
                            </p>
                          </div>

                          <button
                            onClick={() => onApplyCorrection(err)}
                            className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Check className="w-4 h-4" />
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
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Corrected Output (Side-by-Side)</span>
                  </h4>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed min-h-[260px] whitespace-pre-wrap">
                    {correctedText || <span className="italic text-slate-400">Corrected text will appear here...</span>}
                  </div>

                  <button
                    onClick={handleApplyAICorrected}
                    disabled={!text.trim() || text === correctedText}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {appliedAI ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    <span>{appliedAI ? "Applied All AI Corrections!" : "Replace with Corrected Text"}</span>
                  </button>
                </div>
              )}

              {/* TAB 3: SIDE-BY-SIDE AI ENHANCE & STYLES BOX */}
              {sideTab === "aienhance" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Enhance Side-by-Side</span>
                    </h4>
                    {aiLoading && <RefreshCw className="w-4 h-4 text-purple-500 animate-spin" />}
                  </div>

                  {/* Mode Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {AI_MODES.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setAiMode(m);
                          runAiEnhance(m, text);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          aiMode === m
                            ? "bg-purple-600 text-white shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {m.replace("Make ", "")}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-sm text-slate-900 dark:text-slate-100 min-h-[220px] whitespace-pre-wrap leading-relaxed">
                    {aiLoading ? (
                      <div className="flex items-center justify-center h-44 text-purple-600">
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      </div>
                    ) : (
                      enhancedText || <span className="italic text-slate-400">Select mode to generate enhanced text...</span>
                    )}
                  </div>

                  <button
                    onClick={handleApplyEnhanced}
                    disabled={!enhancedText || aiLoading}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {appliedAI ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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
