import React, { useState } from "react";
import { FileText, RefreshCw, Copy, Download, Check, Sparkles } from "lucide-react";
import { generateParagraphWithAI } from "../utils/aiEngine";
import { exportToPDF } from "../utils/exportPDF";
import { exportToDOCX } from "../utils/exportDOCX";

const SAMPLE_TOPICS = [
  "Importance of Artificial Intelligence in Education",
  "Strategies for Effective Time Management",
  "The Future of Remote Work & Digital Collaboration",
  "Impact of Renewable Energy on Global Economy"
];

const ParagraphGenerator = () => {
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("Medium (~250 words)");
  const [tone, setTone] = useState("Professional");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [generatedResult, setGeneratedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await generateParagraphWithAI({ topic, length, tone, difficulty });
      setGeneratedResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedResult?.paragraph) {
      navigator.clipboard.writeText(generatedResult.paragraph);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePDF = () => {
    if (!generatedResult) return;
    exportToPDF({
      title: `AI Article / Essay: ${topic}`,
      content: generatedResult.paragraph,
      stats: { words: generatedResult.wordCount, tone: generatedResult.tone },
      filename: "Textify_Document"
    });
  };

  const handleDOCX = () => {
    if (!generatedResult) return;
    exportToDOCX({
      title: `AI Article / Essay: ${topic}`,
      content: generatedResult.paragraph,
      stats: { words: generatedResult.wordCount, tone: generatedResult.tone },
      filename: "Textify_Document"
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-500" />
          AI Paragraph & Long Document Generator
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Generate structured paragraphs, extended essays (~1,000 words), or comprehensive guides (~2,000+ words) on any topic.
        </p>
      </div>

      {/* Inputs Form */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Topic or Prompt
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Importance of Artificial Intelligence in Education"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[11px] text-slate-400 font-medium">Examples:</span>
            {SAMPLE_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Length (Word Count)</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold cursor-pointer"
            >
              <option value="Short (~100 words)">Short (~100 words)</option>
              <option value="Medium (~250 words)">Medium (~250 words)</option>
              <option value="Long (~500 words)">Long (~500 words)</option>
              <option value="Extended Essay (~1,000 words)">Extended Essay (~1,000 words)</option>
              <option value="Comprehensive Guide (~2,000+ words)">Comprehensive Guide (~2,000+ words)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
            >
              <option value="Professional">Professional</option>
              <option value="Academic">Academic</option>
              <option value="Simple">Simple</option>
              <option value="Creative">Creative</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? "Generating Document..." : "Generate Document"}</span>
        </button>
      </div>

      {/* Output Card */}
      {generatedResult && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Generated Document ({generatedResult.wordCount} Words)</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={handlePDF}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
              <button
                onClick={handleDOCX}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOCX</span>
              </button>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-base text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-wrap font-sans">
            {generatedResult.paragraph}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParagraphGenerator;
