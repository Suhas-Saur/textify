import React from "react";
import { BarChart3, Download, CheckCircle2, AlertTriangle, Lightbulb, ShieldCheck } from "lucide-react";
import { exportToPDF } from "../utils/exportPDF";
import { exportToDOCX } from "../utils/exportDOCX";

const WritingReport = ({ text, stats, errors, score }) => {
  const handleExportPDF = () => {
    exportToPDF({
      title: "Textify Writing Performance & Audit Report",
      content: text,
      stats,
      errors,
      score,
      filename: "Textify_Performance_Report"
    });
  };

  const handleExportDOCX = () => {
    exportToDOCX({
      title: "Textify Writing Performance & Audit Report",
      content: text,
      stats,
      errors,
      score,
      filename: "Textify_Performance_Report"
    });
  };

  const spellingCount = errors.filter((e) => e.type.toLowerCase().includes("spelling")).length;
  const grammarCount = errors.filter((e) => e.type.toLowerCase().includes("grammar") || e.type.toLowerCase().includes("verb")).length;

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            Writing Performance & Audit Report
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Detailed analytical breakdown of document quality, readability, style, and identified corrections.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={handleExportDOCX}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download DOCX Report</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-600 to-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between items-center text-center space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-200">
            Overall Quality Score
          </h3>
          <div className="w-32 h-32 rounded-full border-4 border-teal-400 flex items-center justify-center flex-col bg-white/10 backdrop-blur-md">
            <span className="text-4xl font-extrabold">{score}</span>
            <span className="text-[10px] text-teal-200">out of 100</span>
          </div>
          <p className="text-xs text-teal-100 font-medium">
            {score >= 90 ? "★ Outstanding Quality" : score >= 75 ? "✓ Good Composition" : "⚠ Revision Recommended"}
          </p>
        </div>

        {/* Breakdown Stats */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Core Document Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 font-medium">Total Words</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stats.words}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 font-medium">Total Sentences</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stats.sentences}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 font-medium">Avg Sentence Length</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stats.avgSentenceLength} wps</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 font-medium">Reading Time</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stats.readingTime}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 font-medium">Readability</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{stats.readability}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 font-medium">Detected Tone</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{stats.tone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Breakdown & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Error Audit Summary</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs">
              <span className="font-semibold text-rose-800 dark:text-rose-300">Spelling Errors</span>
              <span className="font-bold text-rose-900 dark:text-rose-200">{spellingCount}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs">
              <span className="font-semibold text-amber-800 dark:text-amber-300">Grammar Errors</span>
              <span className="font-bold text-amber-900 dark:text-amber-200">{grammarCount}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Total Audited Issues</span>
              <span className="font-bold text-slate-900 dark:text-white">{errors.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-teal-500" />
            <span>Actionable Recommendations</span>
          </h3>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {stats.avgSentenceLength > 20 && (
              <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                • <strong>Shorten long sentences:</strong> Your average sentence length is {stats.avgSentenceLength} words. Splitting them improves readability.
              </p>
            )}
            {errors.length > 0 && (
              <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                • <strong>Apply suggested fixes:</strong> Review the {errors.length} detected issues in the Grammar Checker to boost your quality score.
              </p>
            )}
            <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              • <strong>Vocabulary expansion:</strong> Use the AI Improve module to convert simple vocabulary into professional or academic phrasing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingReport;
