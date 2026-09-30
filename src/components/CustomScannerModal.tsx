import React, { useState } from 'react';
import { X, Sparkles, Loader2, FileText, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '../types/extension';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const CustomScannerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAnalysisComplete
}) => {
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScan = async () => {
    if (!inputText.trim()) {
      setError('Please paste the privacy policy or terms of service text.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          title: title.trim() || 'Custom Scanned Policy',
          url: url.trim() || 'https://custom-policy-scan.local'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze policy');
      }

      const result: AnalysisResult = await response.json();
      onAnalysisComplete(result);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError('Unable to analyze this text. Please check server connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPresetTemplate = (type: 'vpn' | 'dating' | 'dna') => {
    if (type === 'vpn') {
      setTitle('FastTunnel Free VPN - Terms & Privacy Agreement');
      setUrl('https://fasttunnel-vpn.com/terms');
      setInputText(`FASTTUNNEL FREE VPN SERVICES & PRIVACY POLICY

1. Bandwidth Sharing & Network Telemetry
By installing FastTunnel Free VPN, you agree to allow your device to act as an exit relay node for peer-to-peer network traffic when idle. We collect and record your real IP address, connection timestamps, hardware identifiers, and bandwidth consumption.

2. Monetization and Commercial Sharing
We do not charge you a subscription fee. To support our infrastructure, we partner with advertising networks and data broker exchanges. We share anonymized browsing habits, domain access logs, and approximate location with our commercial partners for monetization and personalized ad serving.

3. Marketing Communications
You expressly agree to receive marketing emails, promotional partner offers, and browser push notifications regarding affiliate software products.

4. Binding Arbitration and Governing Law
Any dispute arising from this agreement or use of the VPN shall be resolved exclusively through confidential binding arbitration in the British Virgin Islands. You waive any right to file a class action lawsuit or demand a jury trial.`);
    } else if (type === 'dating') {
      setTitle('HeartBeat Dating App - Membership Terms');
      setUrl('https://heartbeatdating.app/legal');
      setInputText(`HEARTBEAT DATING APP TERMS OF SERVICE & DATA USAGE

1. Biometric Facial Verification & Photo Rights
To verify authenticity, we may require a selfie scan. You agree that we may collect and analyze biometric facial geometry data to prevent catfish accounts and improve recommendation models. You grant us an irrevocable, perpetual, worldwide license to host, display, and analyze your photos and profile bio.

2. Precise Real-Time Geolocation Tracking
Our app continuously accesses your precise GPS coordinates, Wi-Fi BSSID beacons, and Bluetooth signals in the background to show nearby matches. This location data may be shared with safety partners and analytics measurement vendors.

3. Advertising and Commercial Affiliates
We share age, gender, sexual orientation interests, and interaction metrics with third-party advertising exchanges to deliver targeted ads. You agree to receive promotional email newsletters, SMS alerts, and partner discounts.`);
    } else if (type === 'dna') {
      setTitle('AncestryScan Genetic Health - Privacy Terms');
      setUrl('https://ancestryscan-lab.com/consent');
      setInputText(`ANCESTRYSCAN CONSUMER GENETIC TESTING CONSENT

1. Genetic Data Retention and Research Sharing
We process saliva samples to extract DNA sequence markers. By submitting a sample, you consent to indefinite storage of your de-identified genetic data in our centralized cloud research repository. We may license or share aggregated genetic variants with third-party pharmaceutical companies for drug discovery and medical research.

2. Law Enforcement Cooperation
We comply with valid search warrants, subpoenas, and court orders from domestic and international law enforcement agencies seeking genetic genealogical matching.

3. Dispute Waiver
All disputes concerning sample handling, data breaches, or accuracy must be resolved via individual binding arbitration. Class action proceedings are strictly waived.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-600 text-white font-bold text-sm">
              🛡️
            </span>
            <div>
              <h3 className="font-bold text-base text-white">
                Scan Custom Terms / Privacy Policy
              </h3>
              <p className="text-xs text-slate-400">
                Better Safe Then Sorry Engine (AI + Rule Scanner)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Quick Presets */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              Or quick-load a sample risky agreement:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadPresetTemplate('vpn')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
              >
                🔒 Free VPN Bandwidth & Exit Node Terms
              </button>
              <button
                type="button"
                onClick={() => loadPresetTemplate('dating')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
              >
                ❤️ Dating App Biometrics & Location
              </button>
              <button
                type="button"
                onClick={() => loadPresetTemplate('dna')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
              >
                🧬 Genetic Testing & Pharma Sharing
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Company / Policy Title
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Cloud Terms of Service"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Webpage URL (optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com/privacy"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Paste Privacy Policy / Terms & Conditions Text:
            </label>
            <textarea
              rows={8}
              placeholder="Paste any terms of service, privacy policy, or agreement clauses here to calculate safety score /10, detect data sharing, spam risks, and highlight dangerous clauses..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/70 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-800 px-6 py-4 border-t border-slate-700 flex items-center justify-between">
          <div className="text-[11px] text-[#E87722] font-semibold">
            🎓 Better Safe Then Sorry • Jack Ahlberg (Virginia Tech)
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleScan}
              disabled={isLoading}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Clauses...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Extension Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
