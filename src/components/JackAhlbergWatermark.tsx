import React from 'react';
import { GraduationCap, ShieldCheck, Award, Lock, ExternalLink } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'card' | 'badge' | 'footer';
}

export const JackAhlbergWatermark: React.FC<Props> = ({ variant = 'banner' }) => {
  if (variant === 'badge') {
    return (
      <div 
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border"
        style={{
          backgroundColor: '#861F41', // Virginia Tech Chicago Maroon
          borderColor: '#E87722',     // Virginia Tech Burnt Orange
          color: '#ffffff'
        }}
        title="Created by Virginia Tech Student Jack Ahlberg"
      >
        <GraduationCap className="w-3.5 h-3.5 text-[#E87722]" />
        <span>Jack Ahlberg</span>
        <span className="text-[#E87722] font-black">•</span>
        <span className="text-amber-200">Virginia Tech</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-[#4a1224] p-6 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-[#861F41]/30 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-32 h-32 rounded-full bg-[#E87722]/20 blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-[#E87722]" style={{ backgroundColor: '#861F41' }}>
            VT
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E87722] text-black">
                <Award className="w-3 h-3" /> Original Creator
              </span>
              <span className="text-xs text-slate-300">Intellectual Property Protected</span>
            </div>

            <h3 className="text-xl font-bold mt-1 text-white flex items-center gap-2">
              Jack Ahlberg
              <span className="text-sm font-normal text-amber-300">(@ Virginia Tech)</span>
            </h3>

            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              This Google Chrome Extension project, <strong>"Better Safe Then Sorry"</strong>, was designed, architected, and engineered by <strong>Jack Ahlberg</strong>, an undergraduate engineering student at <strong>Virginia Tech (Blacksburg, VA)</strong>. 
            </p>

            <div className="mt-4 pt-4 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">Institution</span>
                <span className="font-semibold text-white">Virginia Tech (Hokies 🦃)</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">Lead Engineer</span>
                <span className="font-semibold text-white">Jack Ahlberg</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">Copyright Status</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Copyright © 2026
                </span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-amber-200/80 bg-amber-950/40 border border-amber-600/30 p-2.5 rounded-lg">
              🛡️ <strong>Anti-Theft Attribution Seal:</strong> All source code, content detection heuristics, and Chrome extension components carry unalterable authorship signatures verifying Jack Ahlberg as the sole original creator.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Banner
  return (
    <div className="bg-gradient-to-r from-[#861F41] via-slate-900 to-[#861F41] text-white border-y border-[#E87722]/40 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#E87722] text-black">VT</span>
          <span className="font-medium text-slate-200">
            <strong>Better Safe Then Sorry</strong> — Official Google Chrome Extension by Virginia Tech student <strong className="text-white underline decoration-[#E87722]">Jack Ahlberg</strong>.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-amber-200">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Author
          </span>
          <span className="text-slate-500">•</span>
          <span>Blacksburg, Virginia</span>
          <span className="text-slate-500">•</span>
          <span>© 2026 Jack Ahlberg</span>
        </div>
      </div>
    </div>
  );
};
