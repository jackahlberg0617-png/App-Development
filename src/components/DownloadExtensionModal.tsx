import React, { useState } from 'react';
import { Download, CheckCircle2, FolderArchive, ArrowRight, ShieldCheck, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { generateExtensionZipBlob } from '../utils/extensionBundle';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadExtensionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const zipBlob = await generateExtensionZipBlob();
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'better-safe-then-sorry-jack-ahlberg-vt.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Banner with Virginia Tech Accent */}
        <div className="bg-gradient-to-r from-[#861F41] via-slate-800 to-blue-900 p-6 border-b border-slate-700 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl shadow-lg">
                🛡️
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87722]">
                  Google Chrome Extension (Manifest V3)
                </span>
                <h2 className="text-2xl font-black text-white">
                  Better Safe Then Sorry
                </h2>
                <p className="text-xs text-slate-300">
                  Created & Engineered by <strong>Jack Ahlberg</strong> • Virginia Tech
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition text-lg"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Action Box */}
          <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                Ready-to-Install Chrome Extension
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  .zip
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Contains full Manifest V3 source: popup, background service worker, in-page clause highlighter content script, icons, and legal attribution.
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition flex-shrink-0"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Packaging Zip...</span>
                </>
              ) : downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Downloaded! Click again to re-download</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Extension (.zip)</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Step Installation Guide */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span>How to Install into Google Chrome (Takes 30 Seconds)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex flex-col">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs mb-2">
                  1
                </div>
                <strong className="text-xs text-white mb-1">Unzip the Archive</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Extract the downloaded <code className="text-blue-300 text-[10px]">.zip</code> file onto your desktop or documents folder.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex flex-col">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs mb-2">
                  2
                </div>
                <strong className="text-xs text-white mb-1">Open Chrome Extensions</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  In Chrome, navigate to <code className="text-blue-300 text-[10px]">chrome://extensions</code> and switch <strong>Developer mode</strong> ON in top right.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex flex-col">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs mb-2">
                  3
                </div>
                <strong className="text-xs text-white mb-1">Click "Load Unpacked"</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Click the <strong>Load unpacked</strong> button and select the extracted folder. The extension is now running!
                </p>
              </div>
            </div>
          </div>

          {/* Legal / Authorship Seal */}
          <div className="p-3.5 rounded-xl bg-[#861F41]/30 border border-[#E87722]/40 flex items-center justify-between text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E87722]" />
              <span>
                <strong>Original Work by Jack Ahlberg</strong> • Virginia Tech Hokies 🦃 • All code signed & protected
              </span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:inline">Blacksburg, VA</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-850 px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
