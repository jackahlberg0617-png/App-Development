import React from 'react';
import { 
  ShieldCheck, Download, Code2, Sparkles, GraduationCap, 
  ExternalLink, Award, FileSearch
} from 'lucide-react';
import { JackAhlbergWatermark } from './JackAhlbergWatermark';

interface Props {
  activeView: 'demo' | 'source';
  setActiveView: (view: 'demo' | 'source') => void;
  onOpenDownload: () => void;
  onOpenCustomScan: () => void;
}

export const Header: React.FC<Props> = ({
  activeView,
  setActiveView,
  onOpenDownload,
  onOpenCustomScan
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Author Watermark Banner */}
      <JackAhlbergWatermark variant="banner" />

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-xl">
              🛡️
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Better Safe Then Sorry
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 font-semibold font-mono">
                Chrome Extension
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Privacy Policy & Terms of Service Guardian • Automated Risk Highlighter
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveView('demo')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeView === 'demo'
                ? 'bg-blue-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Live Extension Simulator</span>
          </button>

          <button
            onClick={() => setActiveView('source')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeView === 'source'
                ? 'bg-blue-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCustomScan}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            title="Scan custom terms of service"
          >
            <FileSearch className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Paste Policy</span>
          </button>

          <button
            onClick={onOpenDownload}
            className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Extension</span>
          </button>
        </div>
      </div>
    </header>
  );
};
