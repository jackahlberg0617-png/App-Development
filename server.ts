import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Creator Attribution metadata
const CREATOR_METADATA = {
  author: 'Jack Ahlberg',
  university: 'Virginia Tech',
  verifiedSignature: 'VT-ENG-JACK-AHLBERG-2026-AUTH',
  notice: 'Engineered and created by Virginia Tech student Jack Ahlberg. All rights reserved. Original IP.'
};

// Fallback smart NLP heuristic analyzer when Gemini API is unavailable or for rapid parsing
function analyzeHeuristic(text: string, title: string = 'Custom Policy', url: string = 'https://custom-policy.local') {
  const lower = text.toLowerCase();
  
  // Scoring deductions
  let deductions = 0;
  const highlightedClauses: any[] = [];
  const whatTheyMightDo: any[] = [];

  // 1. Biometrics
  if (lower.includes('biometric') || lower.includes('faceprint') || lower.includes('voiceprint') || lower.includes('facial recognition')) {
    deductions += 2.5;
    highlightedClauses.push({
      id: 'clause-bio',
      quote: text.slice(Math.max(0, lower.indexOf('biometric') - 30), Math.min(text.length, lower.indexOf('biometric') + 140)) || 'Collection of biometric identifiers and scans.',
      category: 'biometrics',
      severity: 'critical',
      title: 'Biometric Identifiers Collected',
      explanation: 'Scans your physical characteristics (face, voice, or body geometry).',
      impact: 'Irreversible biological identification.'
    });
    whatTheyMightDo.push({
      category: 'biometrics',
      title: 'Biometric Likeness Scanning',
      likelihood: 'High',
      description: 'May extract facial geometry or vocal characteristics for algorithmic training and recognition.',
      mitigationTip: 'Avoid posting clean face or voice recordings.'
    });
  }

  // 2. Keystrokes & Clipboard
  if (lower.includes('keystroke') || lower.includes('clipboard') || lower.includes('typing rhythm')) {
    deductions += 2.0;
    highlightedClauses.push({
      id: 'clause-key',
      quote: text.slice(Math.max(0, lower.indexOf('clipboard') - 30), Math.min(text.length, lower.indexOf('clipboard') + 140)) || 'Monitors keystroke dynamics and clipboard text.',
      category: 'tracking',
      severity: 'critical',
      title: 'Keystroke & Clipboard Surveillance',
      explanation: 'Detects typing tempo and checks text copied to your clipboard.',
      impact: 'Can capture sensitive passwords, crypto addresses, or private messages.'
    });
    whatTheyMightDo.push({
      category: 'tracking',
      title: 'Clipboard & Typing Surveillance',
      likelihood: 'Guaranteed',
      description: 'Inspects snippets you copy and paste across apps.',
      mitigationTip: 'Never copy sensitive passwords while using this app.'
    });
  }

  // 3. Selling / Brokers
  const sellsData = lower.includes('sell') && (lower.includes('personal data') || lower.includes('information') || lower.includes('third party') || lower.includes('monetary'));
  if (sellsData || lower.includes('data broker') || lower.includes('valuable consideration')) {
    deductions += 2.5;
    highlightedClauses.push({
      id: 'clause-sell',
      quote: 'We may disclose, share, or transfer personal records to commercial partners and data aggregators.',
      category: 'selling_data',
      severity: 'critical',
      title: 'Commercial Data Monetization',
      explanation: 'Grants rights to sell or exchange your profile with third-party advertisers.',
      impact: 'Your identity and habits are traded in digital ad markets.'
    });
    whatTheyMightDo.push({
      category: 'selling_data',
      title: 'Selling Data to Third-Party Brokers',
      likelihood: 'High',
      description: 'Trades user profiles with marketing agencies and credit/background aggregators.',
      mitigationTip: 'Exercise Do Not Sell My Personal Information (CCPA/GDPR) requests.'
    });
  }

  // 4. Marketing spam
  if (lower.includes('promotional') || lower.includes('marketing email') || lower.includes('telemarketing') || lower.includes('commercial messages')) {
    deductions += 1.2;
    highlightedClauses.push({
      id: 'clause-spam',
      quote: 'You agree to receive commercial messages, marketing announcements, and affiliate promotional offers.',
      category: 'spam',
      severity: 'medium',
      title: 'Promotional Marketing & Spam Consent',
      explanation: 'Authorizes automated promotional campaigns to your contact channels.',
      impact: 'Inbox congestion and unwanted promotional calls.'
    });
    whatTheyMightDo.push({
      category: 'spam',
      title: 'Automated Marketing & Spam Emails',
      likelihood: 'High',
      description: 'Regular promotional blasts, affiliate offers, and partner discount emails.',
      mitigationTip: 'Use email aliases or immediately unsubscribe upon registration.'
    });
  }

  // 5. Arbitration & Class Action Waiver
  if (lower.includes('arbitration') || lower.includes('class action') || lower.includes('jury trial') || lower.includes('individual capacity')) {
    deductions += 1.5;
    highlightedClauses.push({
      id: 'clause-arb',
      quote: 'You agree that any dispute will be resolved exclusively through confidential binding arbitration, waiving rights to a jury trial or class action.',
      category: 'arbitration',
      severity: 'high',
      title: 'Mandatory Binding Arbitration & Class Action Ban',
      explanation: 'Surrenders your constitutional right to sue in civil court or join collective lawsuits.',
      impact: 'Severely curtails compensation in case of corporate misconduct or data breaches.'
    });
    whatTheyMightDo.push({
      category: 'arbitration',
      title: 'Forced Waiver of Legal Court Rights',
      likelihood: 'Guaranteed',
      description: 'Shields the company from collective lawsuits and jury oversight.',
      mitigationTip: 'Look for the 30-day mail-in arbitration opt-out address in the agreement.'
    });
  }

  // 6. Location tracking
  if (lower.includes('precise location') || lower.includes('gps') || lower.includes('geolocation') || lower.includes('bluetooth beacon')) {
    deductions += 1.2;
    whatTheyMightDo.push({
      category: 'location',
      title: 'Continuous Physical Location Tracking',
      likelihood: 'High',
      description: 'Records your physical whereabouts, frequent destinations, and movement velocity.',
      mitigationTip: 'Set location permission to "While Using App" or "Never".'
    });
  }

  const rawScore = Math.max(1.0, Math.min(9.9, 10.0 - deductions));
  const safetyScore = Math.round(rawScore * 10) / 10;
  let scoreGrade = 'C (Caution)';
  if (safetyScore >= 8.5) scoreGrade = 'A (Privacy Respecting)';
  else if (safetyScore >= 7.0) scoreGrade = 'B (Fair)';
  else if (safetyScore >= 5.0) scoreGrade = 'C (Caution)';
  else if (safetyScore >= 3.0) scoreGrade = 'D (High Risk)';
  else scoreGrade = 'F (Dangerous)';

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return {
    id: 'analyzed-' + Date.now(),
    title: title || 'Scanned Agreement',
    url: url || 'Current Webpage',
    type: 'mixed',
    safetyScore,
    scoreGrade,
    summary: `This agreement covers a user agreement with an estimated ${deductions > 3 ? 'severe' : 'moderate'} level of data gathering. The company reserves broad permissions over usage telemetry, communications, and liability limitation.`,
    keyTakeaways: [
      deductions > 4 ? 'Significant privacy exposures detected in clauses.' : 'Standard operational data collected.',
      sellsData ? 'Shares or sells personal records with advertising brokers.' : 'Data shared primarily with essential service providers.',
      lower.includes('arbitration') ? 'Class action lawsuits and jury trials are prohibited.' : 'Standard dispute jurisdiction applies.',
      lower.includes('spam') || lower.includes('promotional') ? 'Automatic opt-in to marketing communications and partner offers.' : 'Marketing preferences can be managed.'
    ],
    dataStorage: {
      primaryLocations: ['United States Cloud Infrastructure (AWS / GCP / Azure)'],
      crossBorderTransfers: lower.includes('transfer') || lower.includes('jurisdiction') || lower.includes('international'),
      retentionPeriod: 'Retained as long as necessary for business and fraud prevention purposes.',
      securitySummary: 'Industry-standard transmission protocols.',
      governmentAccessRisk: deductions > 3 ? 'High' : 'Medium',
      details: 'Data stored in distributed cloud environments subject to lawful subpoena and regulatory disclosure.'
    },
    dataSharing: {
      sharedWithBrokers: sellsData,
      sharedWithAdvertisers: lower.includes('advertising') || lower.includes('marketing') || lower.includes('partners'),
      sharedWithAffiliates: lower.includes('affiliate') || lower.includes('subsidiary'),
      sharedWithLawEnforcement: 'Complies with official warrants, legal requests, and national regulatory summons.',
      thirdPartyPartnersEstimate: sellsData ? 'Dozens to hundreds of ad networks and analytic platforms.' : 'Essential infrastructure partners only.',
      details: 'Discloses user behavioral events and identifiers to marketing measurement services and vendors.'
    },
    whatTheyMightDo,
    highlightedClauses,
    fullText: text,
    stats: {
      wordCount,
      estimatedReadTimeMinutes: Math.max(1, Math.round(wordCount / 220)),
      flaggedClausesCount: highlightedClauses.length,
      spamRiskScore: lower.includes('spam') || lower.includes('promotional') ? 75 : 25,
      dataSellingRiskScore: sellsData ? 88 : 30
    },
    creatorWatermark: CREATOR_METADATA
  };
}

// API: Analyze text using Gemini 3.8 Flash
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { text, title, url } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide valid policy or terms text to analyze.' });
    }

    // If Gemini is not configured, use heuristic engine
    if (!ai) {
      console.log('Gemini API key not found; returning heuristic analysis.');
      const result = analyzeHeuristic(text, title, url);
      return res.json(result);
    }

    const truncatedText = text.slice(0, 25000); // Guard token window safely

    const prompt = `You are "Better Safe Then Sorry", a specialized Google Chrome Extension created by Virginia Tech student Jack Ahlberg.
Analyze this Privacy Policy / Terms of Service document for user privacy and security risks.

Return ONLY a valid JSON object matching this schema:
{
  "safetyScore": number (0.0 to 10.0, where 10 is maximum privacy like Signal, and 1.5 is predatory like malicious telemetry),
  "scoreGrade": string ("F (Dangerous)" | "D (High Risk)" | "C (Caution)" | "B (Fair)" | "A (Privacy Respecting)"),
  "summary": string (2-3 concise sentences summarizing what the user is actually signing up for in plain English),
  "keyTakeaways": string[] (3-5 bullet points of crucial things the user needs to know),
  "dataStorage": {
    "primaryLocations": string[] (e.g. ["United States", "China (ByteDance Servers)", "Singapore"]),
    "crossBorderTransfers": boolean,
    "retentionPeriod": string,
    "securitySummary": string,
    "governmentAccessRisk": "High" | "Medium" | "Low",
    "details": string
  },
  "dataSharing": {
    "sharedWithBrokers": boolean,
    "sharedWithAdvertisers": boolean,
    "sharedWithAffiliates": boolean,
    "sharedWithLawEnforcement": string,
    "thirdPartyPartnersEstimate": string,
    "details": string
  },
  "whatTheyMightDo": [
    {
      "category": string ("spam" | "selling_data" | "tracking" | "location" | "biometrics" | "data_retention" | "arbitration" | "ai_training"),
      "title": string,
      "likelihood": string ("Guaranteed" | "High" | "Moderate" | "Low" | "Unlikely"),
      "description": string,
      "mitigationTip": string
    }
  ],
  "highlightedClauses": [
    {
      "quote": string (exact or near-exact quote from the text that is risky or important),
      "category": string ("spam" | "selling_data" | "tracking" | "location" | "biometrics" | "data_retention" | "arbitration" | "ai_training" | "acceptable"),
      "severity": string ("critical" | "high" | "medium" | "low" | "safe"),
      "title": string,
      "explanation": string,
      "impact": string
    }
  ],
  "spamRiskScore": number (0 to 100),
  "dataSellingRiskScore": number (0 to 100)
}

Document Text to Analyze:
${truncatedText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    const parsed = JSON.parse(responseText);

    const wordCount = text.split(/\s+/).filter(Boolean).length;

    const fullResult = {
      id: 'analysis-' + Date.now(),
      title: title || 'Scanned Agreement',
      url: url || 'Current Webpage',
      type: 'mixed',
      safetyScore: Math.round(Number(parsed.safetyScore) * 10) / 10,
      scoreGrade: parsed.scoreGrade || (parsed.safetyScore > 7 ? 'B (Fair)' : 'D (High Risk)'),
      summary: parsed.summary,
      keyTakeaways: parsed.keyTakeaways || [],
      dataStorage: parsed.dataStorage || {
        primaryLocations: ['Cloud Datacenters'],
        crossBorderTransfers: true,
        retentionPeriod: 'Indefinite or until account deletion',
        securitySummary: 'Standard HTTPS',
        governmentAccessRisk: 'Medium',
        details: 'Stored on distributed cloud servers.'
      },
      dataSharing: parsed.dataSharing || {
        sharedWithBrokers: true,
        sharedWithAdvertisers: true,
        sharedWithAffiliates: true,
        sharedWithLawEnforcement: 'Upon valid legal subpoena',
        thirdPartyPartnersEstimate: 'Multiple partner networks',
        details: 'Shared with marketing and cloud vendors.'
      },
      whatTheyMightDo: parsed.whatTheyMightDo || [],
      highlightedClauses: (parsed.highlightedClauses || []).map((c: any, idx: number) => ({
        ...c,
        id: `clause-${idx + 1}`
      })),
      fullText: text,
      stats: {
        wordCount,
        estimatedReadTimeMinutes: Math.max(1, Math.round(wordCount / 220)),
        flaggedClausesCount: (parsed.highlightedClauses || []).length,
        spamRiskScore: parsed.spamRiskScore || 50,
        dataSellingRiskScore: parsed.dataSellingRiskScore || 60,
      },
      creatorWatermark: CREATOR_METADATA
    };

    return res.json(fullResult);
  } catch (error) {
    console.error('Error analyzing policy with Gemini:', error);
    // Graceful fallback to heuristic analysis so the user never sees a broken screen
    const { text, title, url } = req.body;
    const fallback = analyzeHeuristic(text || '', title, url);
    return res.json(fallback);
  }
});

// Production static file serving vs Development Vite middleware
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Better Safe Then Sorry Server active at http://0.0.0.0:${PORT}`);
    console.log('Created by Virginia Tech Student: Jack Ahlberg');
  });
}

startServer();
