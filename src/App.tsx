import React, { useState } from 'react';
import { SAMPLE_POLICIES } from './data/samplePolicies';
import { AnalysisResult } from './types/extension';
import { Header } from './components/Header';
import { BrowserSimulator } from './components/BrowserSimulator';
import { SourceCodeViewer } from './components/SourceCodeViewer';
import { DownloadExtensionModal } from './components/DownloadExtensionModal';
import { CustomScannerModal } from './components/CustomScannerModal';
import { JackAhlbergWatermark } from './components/JackAhlbergWatermark';
import { GraduationCap, Heart, Shield, Lock } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'demo' | 'source'>('demo');
  const [currentSampleId, setCurrentSampleId] = useState<string>('tiktok');
  const [activePolicyData, setActivePolicyData] = useState<AnalysisResult>(SAMPLE_POLICIES.tiktok);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isCustomScanModalOpen, setIsCustomScanModalOpen] = useState<boolean>(false);

  const handleSelectSample = (id: string) => {
    if (SAMPLE_POLICIES[id]) {
      setCurrentSampleId(id);
      setActivePolicyData(SAMPLE_POLICIES[id]);
    }
  };

  const handleCustomAnalysisComplete = (result: AnalysisResult) => {
    setCurrentSampleId('custom');
    setActivePolicyData(result);
    setActiveView('demo');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header & Navigation */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onOpenCustomScan={() => setIsCustomScanModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {activeView === 'demo' && (
          <BrowserSimulator
            data={activePolicyData}
            onSelectSample={handleSelectSample}
            currentSampleId={currentSampleId}
            onOpenCustomScan={() => setIsCustomScanModalOpen(true)}
          />
        )}

        {activeView === 'source' && (
          <SourceCodeViewer
            onDownloadZip={() => setIsDownloadModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <DownloadExtensionModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <CustomScannerModal
        isOpen={isCustomScanModalOpen}
        onClose={() => setIsCustomScanModalOpen(false)}
        onAnalysisComplete={handleCustomAnalysisComplete}
      />

      {/* Permanent Footer with Jack Ahlberg Virginia Tech Attribution */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md border border-[#E87722]"
              style={{ backgroundColor: '#861F41' }}
            >
              VT
            </div>
            <div>
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <span>Better Safe Then Sorry</span>
                <span className="text-[10px] text-[#E87722] font-semibold bg-[#861F41]/40 px-2 py-0.5 rounded-full border border-[#E87722]/40">
                  Jack Ahlberg
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Created & Engineered by Virginia Tech undergraduate student <strong>Jack Ahlberg</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setActiveView('demo')}
              className="hover:text-white transition"
            >
              Extension Simulator
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveView('source')}
              className="hover:text-white transition"
            >
              Extension Manifest V3
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Download Chrome Package
            </button>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            <p className="flex items-center justify-center md:justify-end gap-1">
              <span>Go Hokies! 🦃</span>
              <span>•</span>
              <span>Copyright © 2026 Jack Ahlberg</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Blacksburg, Virginia • All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
