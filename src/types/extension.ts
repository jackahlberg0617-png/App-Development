export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export type ClauseCategory = 
  | 'spam' 
  | 'selling_data' 
  | 'tracking' 
  | 'location' 
  | 'biometrics' 
  | 'data_retention' 
  | 'arbitration' 
  | 'unilateral_changes' 
  | 'ai_training' 
  | 'acceptable';

export interface HighlightedClause {
  id: string;
  quote: string;
  category: ClauseCategory;
  severity: RiskSeverity;
  title: string;
  explanation: string;
  impact: string;
}

export interface PotentialAction {
  category: ClauseCategory;
  title: string;
  likelihood: 'Guaranteed' | 'High' | 'Moderate' | 'Low' | 'Unlikely';
  description: string;
  mitigationTip?: string;
}

export interface DataStorageInfo {
  primaryLocations: string[];
  crossBorderTransfers: boolean;
  retentionPeriod: string;
  securitySummary: string;
  governmentAccessRisk: 'High' | 'Medium' | 'Low';
  details: string;
}

export interface DataSharingInfo {
  sharedWithBrokers: boolean;
  sharedWithAdvertisers: boolean;
  sharedWithAffiliates: boolean;
  sharedWithLawEnforcement: string;
  thirdPartyPartnersEstimate: string;
  details: string;
}

export interface AnalysisResult {
  id: string;
  title: string;
  url: string;
  type: 'privacy_policy' | 'terms_of_service' | 'mixed';
  safetyScore: number; // 0.0 to 10.0
  scoreGrade: 'F (Dangerous)' | 'D (High Risk)' | 'C (Caution)' | 'B (Fair)' | 'A (Privacy Respecting)';
  summary: string;
  keyTakeaways: string[];
  dataStorage: DataStorageInfo;
  dataSharing: DataSharingInfo;
  whatTheyMightDo: PotentialAction[];
  highlightedClauses: HighlightedClause[];
  fullText: string;
  stats: {
    wordCount: number;
    estimatedReadTimeMinutes: number;
    flaggedClausesCount: number;
    spamRiskScore: number; // 0 - 100
    dataSellingRiskScore: number; // 0 - 100
  };
  creatorWatermark: {
    author: string;
    university: string;
    verifiedSignature: string;
    notice: string;
  };
}
