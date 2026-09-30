import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, FileText, Database, Share2, 
  Mail, Gavel, Sparkles, GraduationCap, X, ExternalLink, ChevronRight,
  Info, CheckCircle2, Lock, Flame
} from 'lucide-react';
import { AnalysisResult, HighlightedClause, PotentialAction } from '../types/extension';

interface Props {
  data: AnalysisResult;
  onClose?: () => void;
  onSelectClause?: (clause: HighlightedClause) => void;
  selectedClauseId?: string | null;
}

export const ExtensionPopupModal: React.FC<Props> = ({ 
  data, 
  onClose, 
  onSelectClause,
  selectedClauseId 
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'clauses' | 'storage' | 'actions'>('summary');

  const getScoreColor = (score: number) => {
    if (score < 4) return { border: 'border-rose-500', text: 'text-rose-500', bg: 'bg-rose-500/10' };
    if (score < 7) return { border: 'border-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { border: 'border-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10' };
  };

  const scoreTheme = getScoreColor(data.safetyScore);

  return (
    <div className="w-[390px] max-w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 font-sans text-xs">
      {/* Top Extension Chrome Header */}
      <div className="bg-slate-800/90 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
            🛡️
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              Better Safe Then Sorry
            </div>
            <div className="text-[10px] text-slate-400">Privacy & Terms Guardian</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Virginia Tech Jack Ahlberg Badge */}
          <div 
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#E87722]/80"
            style={{ backgroundColor: '#861F41', color: '#ffffff' }}
            title="Created by Virginia Tech Student Jack Ahlberg"
          >
            <span className="text-[#E87722] font-black">VT</span>
            <span>Jack Ahlberg</span>
          </div>

          {onClose && (
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700 transition"
              title="Close popup"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Safety Score / 10 Hero Card */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900/90 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-full border-4 ${scoreTheme.border} ${scoreTheme.bg} flex flex-col items-center justify-center shadow-inner`}>
            <span className={`text-xl font-extrabold leading-none ${scoreTheme.text}`}>
              {data.safetyScore.toFixed(1)}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold">/10</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-sm ${scoreTheme.text}`}>
                {data.scoreGrade}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-[180px]">
              {data.title}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
              <span className="text-rose-400 font-medium">
                {data.highlightedClauses.length} risks flagged
              </span>
              <span>•</span>
              <span>{data.stats.estimatedReadTimeMinutes} min read saved</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('clauses')}
          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow transition"
        >
          View Risks
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-slate-850 border-b border-slate-800 text-[11px] font-medium px-2">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2 text-center border-b-2 transition ${
            activeTab === 'summary' 
              ? 'border-blue-400 text-blue-400 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('clauses')}
          className={`flex-1 py-2 text-center border-b-2 transition flex items-center justify-center gap-1 ${
            activeTab === 'clauses' 
              ? 'border-blue-400 text-blue-400 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Clauses ({data.highlightedClauses.length})
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`flex-1 py-2 text-center border-b-2 transition ${
            activeTab === 'storage' 
              ? 'border-blue-400 text-blue-400 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Data & Share
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-2 text-center border-b-2 transition ${
            activeTab === 'actions' 
              ? 'border-blue-400 text-blue-400 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Spam & Actions
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-3.5 flex-1 overflow-y-auto max-h-[380px] space-y-3">
        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <div className="space-y-3">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <h4 className="text-[12px] font-bold text-white flex items-center gap-1.5 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                What You Are Signing Up For
              </h4>
              <p className="text-slate-300 text-[11.5px] leading-relaxed">
                {data.summary}
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <h4 className="text-[12px] font-bold text-white flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Key Takeaways
              </h4>
              <ul className="space-y-1.5">
                {data.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-[11px]">
                    <span className="text-rose-400 font-black mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Spam & Marketing Risk</span>
                <span className={`text-sm font-bold ${data.stats.spamRiskScore > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {data.stats.spamRiskScore > 60 ? 'High' : 'Moderate'} ({data.stats.spamRiskScore}%)
                </span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Data Selling & Brokers</span>
                <span className={`text-sm font-bold ${data.stats.dataSellingRiskScore > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {data.stats.dataSellingRiskScore > 60 ? 'Active' : 'Restricted'} ({data.stats.dataSellingRiskScore}%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CLAUSES TAB */}
        {activeTab === 'clauses' && (
          <div className="space-y-2.5">
            <div className="text-[11px] text-slate-400 flex items-center justify-between pb-1">
              <span>Click a clause to locate it in the document:</span>
              <span className="text-rose-400 font-semibold">{data.highlightedClauses.length} Flagged</span>
            </div>

            {data.highlightedClauses.map((clause) => {
              const isSelected = selectedClauseId === clause.id;
              const severityBorder = 
                clause.severity === 'critical' ? 'border-l-rose-500' :
                clause.severity === 'high' ? 'border-l-orange-500' :
                clause.severity === 'medium' ? 'border-l-amber-500' : 'border-l-emerald-500';

              return (
                <div
                  key={clause.id}
                  onClick={() => onSelectClause && onSelectClause(clause)}
                  className={`bg-slate-800/90 border border-slate-700/80 border-l-4 ${severityBorder} p-3 rounded-lg cursor-pointer transition hover:bg-slate-750 ${
                    isSelected ? 'ring-2 ring-blue-500 bg-slate-800' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-white text-[11.5px] flex items-center gap-1">
                      {clause.severity === 'critical' && <Flame className="w-3 h-3 text-rose-500" />}
                      {clause.title}
                    </span>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      clause.severity === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      clause.severity === 'high' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                      clause.severity === 'medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {clause.severity}
                    </span>
                  </div>

                  <p className="text-[10.5px] text-slate-300 italic bg-slate-900/60 p-2 rounded border border-slate-800 mb-1.5 line-clamp-3">
                    "{clause.quote}"
                  </p>

                  <p className="text-[11px] text-slate-300">
                    {clause.explanation}
                  </p>

                  <div className="mt-1.5 text-[10px] text-rose-300 font-medium flex items-center gap-1">
                    <span>⚠️ Impact:</span> {clause.impact}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DATA STORAGE & SHARING TAB */}
        {activeTab === 'storage' && (
          <div className="space-y-3">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <h4 className="text-[12px] font-bold text-white flex items-center gap-1.5 mb-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                Where Your Data Is Stored
              </h4>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-start gap-1">
                  <span className="text-slate-400 font-medium">Locations:</span>
                  <span className="font-semibold text-white">
                    {data.dataStorage.primaryLocations.join(', ')}
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-slate-400 font-medium">Cross-Border Transfers:</span>
                  <span className={data.dataStorage.crossBorderTransfers ? 'text-amber-400 font-semibold' : 'text-emerald-400'}>
                    {data.dataStorage.crossBorderTransfers ? 'Yes (International Server Synchronization)' : 'Domestic Only'}
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-slate-400 font-medium">Retention Period:</span>
                  <span>{data.dataStorage.retentionPeriod}</span>
                </div>
                <div className="mt-2 text-slate-400 text-[10.5px] bg-slate-900/50 p-2 rounded border border-slate-800">
                  {data.dataStorage.details}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <h4 className="text-[12px] font-bold text-white flex items-center gap-1.5 mb-1.5">
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                Who They Share It With
              </h4>
              <div className="space-y-2 text-[11px] text-slate-300">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className={`p-2 rounded border ${data.dataSharing.sharedWithBrokers ? 'bg-rose-950/40 border-rose-800/50 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    <strong>Data Brokers:</strong> {data.dataSharing.sharedWithBrokers ? 'Shared / Sold' : 'Not Sold'}
                  </div>
                  <div className={`p-2 rounded border ${data.dataSharing.sharedWithAdvertisers ? 'bg-amber-950/40 border-amber-800/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    <strong>Ad Exchanges:</strong> {data.dataSharing.sharedWithAdvertisers ? 'Yes' : 'No'}
                  </div>
                </div>

                <div className="text-[10.5px] text-slate-300 bg-slate-900/50 p-2 rounded border border-slate-800">
                  {data.dataSharing.details}
                </div>
                <div className="text-[10px] text-slate-400">
                  <strong>Law Enforcement:</strong> {data.dataSharing.sharedWithLawEnforcement}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPAM & POTENTIAL ACTIONS TAB */}
        {activeTab === 'actions' && (
          <div className="space-y-2.5">
            <div className="text-[11px] text-slate-400">
              What this company or service might do with your information:
            </div>

            {data.whatTheyMightDo.map((action, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-white text-[11.5px] flex items-center gap-1.5">
                    {action.category === 'spam' && <Mail className="w-3.5 h-3.5 text-amber-400" />}
                    {action.category === 'arbitration' && <Gavel className="w-3.5 h-3.5 text-purple-400" />}
                    {action.title}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                    action.likelihood === 'Guaranteed' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    action.likelihood === 'High' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                    'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {action.likelihood}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mb-1.5">
                  {action.description}
                </p>
                {action.mitigationTip && (
                  <div className="text-[10px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 p-1.5 rounded flex items-start gap-1">
                    <span className="font-bold">💡 Tip:</span>
                    <span>{action.mitigationTip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extension Footer Watermark */}
      <div className="bg-slate-950 px-3 py-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-[#E87722]" />
          <span>Created by <strong className="text-white">Jack Ahlberg</strong> (Virginia Tech)</span>
        </div>
        <span className="text-slate-500">v1.0.0</span>
      </div>
    </div>
  );
};
