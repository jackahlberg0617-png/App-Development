import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, RotateCw, Lock, Shield, 
  ExternalLink, Sparkles, AlertTriangle, Eye, Info, X,
  CheckCircle2, Flame, Mail, Gavel, HelpCircle
} from 'lucide-react';
import { AnalysisResult, HighlightedClause } from '../types/extension';
import { ExtensionPopupModal } from './ExtensionPopupModal';

interface Props {
  data: AnalysisResult;
  onSelectSample: (id: string) => void;
  currentSampleId: string;
  onOpenCustomScan: () => void;
}

export const BrowserSimulator: React.FC<Props> = ({
  data,
  onSelectSample,
  currentSampleId,
  onOpenCustomScan
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClause, setSelectedClause] = useState<HighlightedClause | null>(null);
  const [highlightFilter, setHighlightFilter] = useState<'all' | 'critical' | 'spam' | 'selling_data' | 'arbitration'>('all');
  const [inPageWidgetDismissed, setInPageWidgetDismissed] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Reset widget dismissed state when switching policies
  useEffect(() => {
    setInPageWidgetDismissed(false);
    setSelectedClause(null);
  }, [data.id]);

  const getScoreBadgeColor = (score: number) => {
    if (score < 4) return 'bg-rose-600 text-white';
    if (score < 7) return 'bg-amber-500 text-slate-900';
    return 'bg-emerald-600 text-white';
  };

  const handleClauseClick = (clause: HighlightedClause) => {
    setSelectedClause(clause);
    // Find highlighted element and scroll smoothly to it
    const el = document.getElementById(`doc-clause-${clause.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Render document text with in-line highlights
  const renderHighlightedDocument = () => {
    const text = data.fullText;
    const clauses = data.highlightedClauses;

    // Filter clauses if user chose filter
    const activeClauses = highlightFilter === 'all' 
      ? clauses 
      : clauses.filter(c => c.category === highlightFilter || c.severity === highlightFilter);

    // Build replacement segments
    // For simplicity, we parse paragraphs and replace quotes
    const paragraphs = text.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      let elements: React.ReactNode[] = [para];

      activeClauses.forEach((clause) => {
        const nextElements: React.ReactNode[] = [];

        elements.forEach((segment) => {
          if (typeof segment !== 'string') {
            nextElements.push(segment);
            return;
          }

          // Case-insensitive substring matching of clause quote keywords
          const quoteSnippet = clause.quote.slice(0, 45); // match first portion
          const matchIndex = segment.toLowerCase().indexOf(quoteSnippet.toLowerCase());

          if (matchIndex !== -1) {
            const before = segment.slice(0, matchIndex);
            const matchedText = segment.slice(matchIndex, matchIndex + clause.quote.length);
            const after = segment.slice(matchIndex + clause.quote.length);

            if (before) nextElements.push(before);

            const isSelected = selectedClause?.id === clause.id;
            let markStyle = 'bg-rose-500/20 text-rose-200 border-b-2 border-rose-500';
            if (clause.severity === 'high') markStyle = 'bg-orange-500/20 text-orange-200 border-b-2 border-orange-500';
            if (clause.severity === 'medium') markStyle = 'bg-amber-500/20 text-amber-200 border-b-2 border-amber-500';
            if (clause.severity === 'safe') markStyle = 'bg-emerald-500/20 text-emerald-200 border-b-2 border-emerald-500';

            nextElements.push(
              <mark
                key={`mark-${clause.id}-${pIdx}`}
                id={`doc-clause-${clause.id}`}
                onClick={() => setSelectedClause(clause)}
                className={`relative px-1 py-0.5 rounded cursor-pointer transition font-medium ${markStyle} ${
                  isSelected ? 'ring-2 ring-blue-400 bg-blue-500/30' : 'hover:brightness-125'
                }`}
                title={`Flagged by Better Safe Then Sorry: ${clause.title}`}
              >
                {matchedText}
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black bg-rose-600 text-white -translate-y-1">
                  !
                </span>
              </mark>
            );

            if (after) nextElements.push(after);
          } else {
            nextElements.push(segment);
          }
        });

        elements = nextElements;
      });

      return (
        <p key={pIdx} className="mb-4 leading-relaxed text-slate-300 text-sm">
          {elements}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Policy Preset Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Test Scenarios:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'tiktok', label: 'TikTok (Biometrics)', score: 2.8 },
              { id: 'temu', label: 'Temu (Data Selling & Spam)', score: 1.9 },
              { id: 'meta', label: 'Meta (Cross-Site Tracking)', score: 3.9 },
              { id: 'openai', label: 'ChatGPT (AI Training)', score: 6.8 },
              { id: 'signal', label: 'Signal (Privacy Gold Standard)', score: 9.8 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectSample(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  currentSampleId === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                  item.score < 4 ? 'bg-rose-950 text-rose-300' :
                  item.score < 7 ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {item.score}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenCustomScan}
          className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 transition ml-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Paste Any Terms / Scan URL</span>
        </button>
      </div>

      {/* Realistic Chrome Browser Frame */}
      <div className="relative rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden flex flex-col">
        {/* Chrome Tab Bar */}
        <div className="bg-slate-950 px-3 pt-2.5 flex items-center justify-between border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            {/* Window Controls (Mac style) */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Active Tab */}
            <div className="flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-t-lg border-t border-x border-slate-700 text-xs text-white max-w-xs shadow-sm">
              <span className="text-blue-400">📄</span>
              <span className="truncate font-medium">{data.title}</span>
              <span className="text-slate-400 hover:text-white cursor-pointer ml-1">×</span>
            </div>
            <div className="text-slate-500 text-xs px-2 py-1 hover:text-slate-300 cursor-pointer">+</div>
          </div>

          <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1">
            <span>Chrome Browser Emulator</span>
          </div>
        </div>

        {/* Chrome Navigation Toolbar with Extension Icon */}
        <div className="bg-slate-850 px-3 py-2 border-b border-slate-800 flex items-center gap-2.5">
          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-1 hover:text-white rounded hover:bg-slate-750 transition" title="Back">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:text-white rounded hover:bg-slate-750 transition" title="Forward">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:text-white rounded hover:bg-slate-750 transition" title="Reload">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox / Address Bar */}
          <div className="flex-1 bg-slate-900 border border-slate-700/80 rounded-full px-3 py-1 text-xs text-slate-300 flex items-center gap-2 shadow-inner">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="truncate select-all text-slate-200">{data.url}</span>
          </div>

          {/* Chrome Extensions Toolbar Area */}
          <div className="relative flex items-center gap-1.5">
            {/* The "Better Safe Then Sorry" Extension Icon */}
            <button
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className={`relative p-1.5 rounded-lg border transition flex items-center justify-center ${
                isPopupOpen 
                  ? 'bg-blue-600/30 border-blue-500 shadow-md ring-2 ring-blue-500/50' 
                  : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
              }`}
              title="Click to open Better Safe Then Sorry extension popup (Jack Ahlberg)"
            >
              <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">
                🛡️
              </div>

              {/* Real-time Extension Badge on Chrome Toolbar */}
              <span className={`absolute -top-1 -right-1 text-[9px] font-black px-1 rounded-full shadow-sm leading-tight ${getScoreBadgeColor(data.safetyScore)}`}>
                {data.safetyScore.toFixed(1)}
              </span>
            </button>

            {/* Click to open badge guide tooltip */}
            <button
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 hidden md:flex items-center gap-1 bg-blue-950/40 border border-blue-800/50 px-2 py-1 rounded-md"
            >
              <span>Extension Active</span>
              <span className="text-[10px] bg-blue-600 text-white px-1 rounded">Click Icon</span>
            </button>

            {/* Simulated Extension Popup (Floats directly underneath extension icon) */}
            {isPopupOpen && (
              <div className="absolute right-0 top-10 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                <ExtensionPopupModal
                  data={data}
                  onClose={() => setIsPopupOpen(false)}
                  onSelectClause={(clause) => handleClauseClick(clause)}
                  selectedClauseId={selectedClause?.id}
                />
              </div>
            )}
          </div>
        </div>

        {/* Webpage Content Viewport */}
        <div className="relative min-h-[500px] max-h-[650px] overflow-y-auto bg-slate-950 p-6 sm:p-8" ref={textContainerRef}>
          {/* Webpage Header Simulation */}
          <div className="max-w-4xl mx-auto pb-6 mb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  Official Legal Agreement
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {data.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Last Updated: Current Term Cycle • Reading Time: ~{data.stats.estimatedReadTimeMinutes} minutes
                </p>
              </div>

              {/* Clause Filter Pill Toolbar */}
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
                <span className="text-[10px] text-slate-400 px-1 font-semibold">Highlight:</span>
                <button
                  onClick={() => setHighlightFilter('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    highlightFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({data.highlightedClauses.length})
                </button>
                <button
                  onClick={() => setHighlightFilter('critical')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    highlightFilter === 'critical' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Critical
                </button>
                <button
                  onClick={() => setHighlightFilter('spam')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    highlightFilter === 'spam' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Spam
                </button>
                <button
                  onClick={() => setHighlightFilter('arbitration')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    highlightFilter === 'arbitration' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Arbitration
                </button>
              </div>
            </div>

            {/* Extension Active Banner on Webpage */}
            <div className="mt-4 bg-blue-950/40 border border-blue-800/40 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-base">🛡️</span>
                <span>
                  <strong>Better Safe Then Sorry:</strong> Scanned {data.stats.wordCount.toLocaleString()} words. Flagged <strong>{data.highlightedClauses.length} clauses</strong> with potential privacy or consumer risk.
                </span>
              </div>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="text-blue-400 hover:text-blue-300 font-semibold underline text-xs"
              >
                Open Extension Report
              </button>
            </div>
          </div>

          {/* Webpage Main Text Body with In-Line Clause Highlights */}
          <div className="max-w-4xl mx-auto font-serif">
            {renderHighlightedDocument()}
          </div>

          {/* Floating Selected Clause Inspector Card */}
          {selectedClause && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-lg bg-slate-900 border-2 border-blue-500 rounded-2xl shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                    selectedClause.severity === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    selectedClause.severity === 'high' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                    selectedClause.severity === 'medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {selectedClause.severity} risk
                  </span>
                  <h4 className="font-bold text-sm text-white">
                    {selectedClause.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedClause(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="my-2 p-2 bg-slate-950/80 rounded-lg border border-slate-800 italic text-xs text-slate-300">
                "{selectedClause.quote}"
              </div>

              <p className="text-xs text-slate-300 mb-2">
                {selectedClause.explanation}
              </p>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800">
                <span className="text-rose-400 font-semibold">
                  ⚠️ Impact: {selectedClause.impact}
                </span>
                <span className="text-slate-400 text-[10px]">
                  Flagged by Jack Ahlberg's Extension
                </span>
              </div>
            </div>
          )}

          {/* Simulated In-Page Floating Extension Widget (Injected by Content Script) */}
          {!inPageWidgetDismissed && (
            <div className="sticky bottom-4 ml-auto w-72 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md z-30 transition-all hover:scale-[1.02]">
              <div className="bg-slate-800/90 px-3 py-2 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🛡️</span>
                  <span className="font-bold text-xs text-white">Better Safe Then Sorry</span>
                </div>
                <button
                  onClick={() => setInPageWidgetDismissed(true)}
                  className="text-slate-400 hover:text-white text-sm leading-none"
                  title="Minimize widget"
                >
                  &times;
                </button>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-300">Safety Score:</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded ${getScoreBadgeColor(data.safetyScore)}`}>
                    {data.safetyScore.toFixed(1)} / 10
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 mb-2.5 leading-snug">
                  Found <strong className="text-rose-400">{data.highlightedClauses.length} high-risk clauses</strong> on this page.
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow transition"
                  >
                    Inspect Full Report
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-[#E87722] font-semibold flex items-center justify-between">
                  <span>🎓 Created by Jack Ahlberg</span>
                  <span className="text-slate-400">Virginia Tech</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
