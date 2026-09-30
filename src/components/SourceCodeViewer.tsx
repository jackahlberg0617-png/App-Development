import React, { useState } from 'react';
import { Code2, Copy, Check, Download, FileText, Layers, ShieldCheck } from 'lucide-react';
import { getExtensionSourceFiles, ExtensionFile } from '../utils/extensionBundle';

interface Props {
  onDownloadZip: () => void;
}

export const SourceCodeViewer: React.FC<Props> = ({ onDownloadZip }) => {
  const files = getExtensionSourceFiles();
  const [selectedFile, setSelectedFile] = useState<ExtensionFile>(files[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-slate-100">
      {/* Top Header */}
      <div className="bg-slate-850 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Extension Source Code Inspector
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                Manifest V3
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Inspect and verify the real Chrome Extension codebase authored by Jack Ahlberg (Virginia Tech)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDownloadZip}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Ready Extension (.zip)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: File Explorer Sidebar + Code Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
        {/* File List Sidebar */}
        <div className="bg-slate-950/80 border-r border-slate-800 p-3 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Package Files</span>
          </div>

          {files.map((file) => {
            const isSelected = selectedFile.name === file.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-slate-500">📄</span>
                  <span className="truncate">{file.name}</span>
                </div>
                {file.name === 'manifest.json' && (
                  <span className="text-[9px] bg-[#861F41] text-[#E87722] px-1 rounded font-sans font-bold">
                    VT
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-6 pt-4 border-t border-slate-800/80 px-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-[#E87722] font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Attribution Verified</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              All files are watermarked with Jack Ahlberg's Virginia Tech authorship and copyright metadata.
            </p>
          </div>
        </div>

        {/* Code Content Panel */}
        <div className="md:col-span-3 flex flex-col bg-slate-950">
          {/* File Tab Header */}
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white">
                {selectedFile.path}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                — {selectedFile.description}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium flex items-center gap-1.5 transition border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Code Container */}
          <div className="p-4 flex-1 overflow-auto max-h-[520px] font-mono text-xs leading-relaxed text-slate-300">
            <pre className="whitespace-pre overflow-x-auto selection:bg-blue-600/40">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
