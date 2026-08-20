import React from "react";
import {
  FileEdit,
  CheckCircle2,
  Tags,
  Sparkles,
  FileText,
  Languages,
  BarChart3,
  BookMarked,
  ArrowRight,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

const Dashboard = ({ stats, setActiveTab }) => {
  const QUICK_ACTIONS = [
    {
      title: "Writing Assistant",
      desc: "Comprehensive rich editor with live error highlights & analysis.",
      id: "writing-assistant",
      icon: FileEdit,
      color: "bg-teal-500"
    },
    {
      title: "Grammar & Spell Check",
      desc: "Deep grammatical audit & instant error fixes.",
      id: "grammar-check",
      icon: CheckCircle2,
      color: "bg-emerald-500"
    },
    {
      title: "Parts of Speech Analyzer",
      desc: "Color-coded linguistic breakdown for 9 grammatical classes.",
      id: "parts-of-speech",
      icon: Tags,
      color: "bg-indigo-500"
    },
    {
      title: "AI Improve & Rewriter",
      desc: "Transform text into 10 professional tones & styles.",
      id: "ai-improve",
      icon: Sparkles,
      color: "bg-violet-500"
    },
    {
      title: "Paragraph Generator",
      desc: "Generate tailored paragraphs by topic, length & tone.",
      id: "paragraph-generator",
      icon: FileText,
      color: "bg-amber-500"
    },
    {
      title: "Multilingual Translator",
      desc: "Translate across 16 global languages effortlessly.",
      id: "translator",
      icon: Languages,
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white p-6 lg:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI English Writing & Learning Platform</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
            Elevate Your English Writing with <span className="text-teal-300">Textify</span>
          </h1>
          <p className="text-slate-200 text-sm lg:text-base leading-relaxed">
            Your all-in-one assistant for spell checking, grammar correction, parts of speech tagging, AI rewriting, paragraph generation, and document exports.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("writing-assistant")}
              className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Open Writing Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://www.linkedin.com/in/suhas-s-081b84335"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all"
            >
              Created by Suhas S
            </a>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Quality Score</p>
            <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.score || 95}<span className="text-xs text-slate-400 font-normal">/100</span>
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Words Checked</p>
            <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.words || 0}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Reading Time</p>
            <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.readingTime || "1 min"}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Languages</p>
            <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white">
              16 Supported
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Quick Actions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                onClick={() => setActiveTab(act.id)}
                className="group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${act.color} text-white flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
