import React from "react";
import {
  LayoutDashboard,
  FileEdit,
  CheckCircle2,
  Tags,
  Sparkles,
  FileText,
  Languages,
  BarChart3,
  BookMarked,
  Sun,
  Moon,
  Linkedin,
  Feather
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "writing-assistant", label: "Writing Assistant", icon: FileEdit },
  { id: "grammar-check", label: "Grammar & Spell Check", icon: CheckCircle2 },
  { id: "parts-of-speech", label: "Parts of Speech", icon: Tags },
  { id: "ai-improve", label: "AI Improve", icon: Sparkles },
  { id: "paragraph-generator", label: "Paragraph Generator", icon: FileText },
  { id: "translator", label: "Translator", icon: Languages },
  { id: "writing-report", label: "Writing Report", icon: BarChart3 },
  { id: "dictionary", label: "My Dictionary", icon: BookMarked }
];

const Sidebar = ({ activeTab, setActiveTab, darkMode, setDarkMode, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-56 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                  Text<span className="text-teal-600 dark:text-teal-400">ify</span>
                </h1>
                <p className="text-[9px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">
                  AI Platform
                </p>
              </div>
            </div>
          </div>

          {/* Compact Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 shadow-xs border border-teal-200/60 dark:border-teal-800/60 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 pointer-events-none ${isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-400"}`} />
                  <span className="pointer-events-none truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Theme & Profile Badge */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 pointer-events-none">
              {darkMode ? <Moon className="w-3.5 h-3.5 text-teal-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{darkMode ? "Dark" : "Light"}</span>
            </span>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors pointer-events-none ${darkMode ? "bg-teal-600" : "bg-slate-300"}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${darkMode ? "translate-x-4" : "translate-x-0"}`} />
            </div>
          </button>

          {/* Creator Profile Badge */}
          <a
            href="https://www.linkedin.com/in/suhas-s-081b84335"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2.5 rounded-xl bg-gradient-to-r from-teal-900/10 to-emerald-900/10 dark:from-teal-950/40 dark:to-emerald-950/40 border border-teal-200/50 dark:border-teal-800/50 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                  SS
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Suhas S
                  </p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400">Creator & Lead Dev</p>
                </div>
              </div>
              <Linkedin className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
