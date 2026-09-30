import { AnalysisResult } from '../types/extension';

export const SAMPLE_POLICIES: Record<string, AnalysisResult> = {
  tiktok: {
    id: 'tiktok',
    title: 'TikTok Privacy Policy & Platform Terms',
    url: 'https://www.tiktok.com/legal/page/row/privacy-policy/en',
    type: 'mixed',
    safetyScore: 2.8,
    scoreGrade: 'F (Dangerous)',
    summary: 'TikTok collects an extraordinary amount of biometric, device, and behavioral data. By signing up, you allow continuous keystroke logging, clipboard inspection, precise GPS tracking, and sharing with ByteDance corporate entities worldwide, with no clear right to complete data deletion.',
    keyTakeaways: [
      'Collects biometric identifiers including faceprints and voiceprints without explicit separate consent prompts in many jurisdictions.',
      'Logs your keystroke patterns, copy-pasting clipboard text, and apps installed on your device.',
      'Shares telemetry and personal data with corporate affiliates worldwide, including servers under foreign oversight.',
      'Waives your right to participate in class-action lawsuits and mandates binding individual arbitration.'
    ],
    dataStorage: {
      primaryLocations: ['United States (Oracle Cloud)', 'Singapore', 'China (ByteDance Corporate HQ Servers)', 'Ireland (EU users)'],
      crossBorderTransfers: true,
      retentionPeriod: 'Retained as long as necessary to provide service, fulfill business contracts, plus indefinite aggregated logs.',
      securitySummary: 'TLS in transit, access controlled by multi-tier corporate credentials; auditability disputed by cybersecurity regulators.',
      governmentAccessRisk: 'High',
      details: 'Transfers telemetry, user interactions, and demographic data across international borders to parent entities subject to foreign national security intelligence laws.'
    },
    dataSharing: {
      sharedWithBrokers: true,
      sharedWithAdvertisers: true,
      sharedWithAffiliates: true,
      sharedWithLawEnforcement: 'Will disclose to any governmental body upon demand, subpoena, or broad regulatory request.',
      thirdPartyPartnersEstimate: '500+ ad exchange partners, analytics measurement SDKs, and content syndicators.',
      details: 'Shares user profile graphs, inferred interests, device fingerprints, and purchase intent with third-party advertising networks.'
    },
    whatTheyMightDo: [
      {
        category: 'biometrics',
        title: 'Biometric Faceprint & Voiceprint Harvesting',
        likelihood: 'Guaranteed',
        description: 'May collect biometric identifiers and biometric information such as faceprints and voiceprints from video content.',
        mitigationTip: 'Avoid uploading raw face close-ups or recording speaking audio if you wish to limit biometric profiling.'
      },
      {
        category: 'tracking',
        title: 'Keystroke & Clipboard Snooping',
        likelihood: 'Guaranteed',
        description: 'Monitors rhythm and timing of keystrokes, and accesses text or images copied to your device system clipboard.',
        mitigationTip: 'Never copy sensitive passwords or credit card numbers while the app is running in the background.'
      },
      {
        category: 'spam',
        title: 'Targeted Marketing & Commercial Push Spam',
        likelihood: 'High',
        description: 'Sends automated marketing notifications, promotional partner SMS/emails, and personalized in-feed sponsored spam.',
        mitigationTip: 'Turn off marketing communications in Settings > Notifications.'
      },
      {
        category: 'selling_data',
        title: 'Cross-App Behavioral Ad Matching',
        likelihood: 'High',
        description: 'Combines your app activity with external data purchased from data brokers to serve highly targeted behavioral ads.',
        mitigationTip: 'Disable "Personalized Ads" in TikTok Privacy Settings.'
      },
      {
        category: 'arbitration',
        title: 'Forced Arbitration & Class Action Ban',
        likelihood: 'Guaranteed',
        description: 'You give up your constitutional right to sue in court or join a collective lawsuit against the company.',
        mitigationTip: 'Must opt-out in writing within 30 days of opening an account.'
      }
    ],
    highlightedClauses: [
      {
        id: 'tt-1',
        quote: 'We may collect biometric identifiers and biometric information, such as faceprints and voiceprints, from your User Content. Where required by law, we will seek any required permissions from you prior to any such collection.',
        category: 'biometrics',
        severity: 'critical',
        title: 'Biometric Data Extraction',
        explanation: 'The platform scans videos for biological traits like facial geometry and vocal frequencies to categorize and profile you.',
        impact: 'Irreversible personal identification data that cannot be changed if breached.'
      },
      {
        id: 'tt-2',
        quote: 'We collect information about the keystroke patterns or rhythms, battery state, audio settings and connected audio devices, pages viewed, links clicked, and text copied to your clipboard.',
        category: 'tracking',
        severity: 'critical',
        title: 'Keystroke & Clipboard Surveillance',
        explanation: 'Detects how fast you type and inspects clipboard contents whenever you paste or switch apps.',
        impact: 'High risk of accidental leakage of passwords, private messages, or financial numbers.'
      },
      {
        id: 'tt-3',
        quote: 'We share your information with our corporate group, including parent, subsidiary, and other affiliated companies worldwide, to facilitate operations and data analytics.',
        category: 'selling_data',
        severity: 'high',
        title: 'Affiliate Global Data Transfer',
        explanation: 'Your data is accessible across international borders to parent corporation subsidiaries outside your local jurisdiction.',
        impact: 'Bypasses local legal data protection safeguards.'
      },
      {
        id: 'tt-4',
        quote: 'You agree to receive promotional messages, marketing emails, partner product announcements, and personalized advertisements based on your inferred interests.',
        category: 'spam',
        severity: 'medium',
        title: 'Promotional Spam Authorization',
        explanation: 'Grants the service permission to contact you with partner marketing campaigns.',
        impact: 'Increased email and push notification inbox clutter.'
      },
      {
        id: 'tt-5',
        quote: 'YOU AND WE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.',
        category: 'arbitration',
        severity: 'high',
        title: 'Waiver of Class Action Rights',
        explanation: 'You waive your right to band together with other wronged consumers in a joint lawsuit.',
        impact: 'Significantly reduces company legal liability and prevents large consumer settlements.'
      }
    ],
    fullText: `TIKTOK TERMS OF SERVICE & PRIVACY POLICY (EXCERPT)

1. Information We Collect Automatically
We automatically collect certain information when you use the Platform. This includes your IP address, user agent, mobile carrier, time zone settings, identifiers for advertising purposes, model of your device, the device system, network type, device IDs, screen resolution, operating system, and language. We collect information about the keystroke patterns or rhythms, battery state, audio settings and connected audio devices, pages viewed, links clicked, and text copied to your clipboard.

2. Biometric Data Collection
We may collect biometric identifiers and biometric information, such as faceprints and voiceprints, from your User Content. Where required by law, we will seek any required permissions from you prior to any such collection. We use this information to improve video effects, content moderation, demographic research, and recommendation algorithms.

3. Sharing With Corporate Affiliates
We share your information with our corporate group, including parent, subsidiary, and other affiliated companies worldwide, to facilitate operations and data analytics. Servers maintaining this data may be located in jurisdictions with privacy regulations differing from your home country.

4. Marketing, Advertising, and Communications
You agree to receive promotional messages, marketing emails, partner product announcements, and personalized advertisements based on your inferred interests. We share device identifiers, hash values, and interaction events with advertising measurement partners and data exchanges.

5. Dispute Resolution and Class Action Waiver
YOU AND WE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Any dispute shall be settled by confidential binding arbitration before the American Arbitration Association.`,
    stats: {
      wordCount: 8420,
      estimatedReadTimeMinutes: 38,
      flaggedClausesCount: 5,
      spamRiskScore: 82,
      dataSellingRiskScore: 91
    },
    creatorWatermark: {
      author: 'Jack Ahlberg',
      university: 'Virginia Tech',
      verifiedSignature: 'VT-ENG-JACK-AHLBERG-2026-AUTH',
      notice: 'Verified original tool engineered by Jack Ahlberg, Virginia Tech student. Intellectual property protection active.'
    }
  },

  temu: {
    id: 'temu',
    title: 'Temu Marketplace Terms & Privacy Notice',
    url: 'https://www.temu.com/privacy-policy.html',
    type: 'mixed',
    safetyScore: 1.9,
    scoreGrade: 'F (Dangerous)',
    summary: 'Temu requests sweeping device access permissions, extracts contact lists and location data, transmits personal purchasing habits to overseas vendors, and reserves broad rights to share information with unvetted third-party marketing brokers.',
    keyTakeaways: [
      'Monitors device sensor telemetry, Wi-Fi network names, and surrounding Bluetooth beacons.',
      'Aggressive marketing clauses permit SMS text blasts, promotional calls, and email spam.',
      'Stores customer data on distributed overseas cloud servers with minimal user-facing deletion verification.',
      'Clauses heavily protect the merchant against defective goods and strip buyers of normal court remedies.'
    ],
    dataStorage: {
      primaryLocations: ['Cayman Islands Entity', 'China (WhaleCo Parent Systems)', 'Singapore', 'US Cloud Relays'],
      crossBorderTransfers: true,
      retentionPeriod: 'Indefinite for order history, analytics logs, and fraud prevention identifiers.',
      securitySummary: 'Basic HTTPS encryption in transit; internal employee access policies are obscure and uncertified.',
      governmentAccessRisk: 'High',
      details: 'Customer profile records, payment methods metadata, and physical shipping addresses are synced globally across international holding firms.'
    },
    dataSharing: {
      sharedWithBrokers: true,
      sharedWithAdvertisers: true,
      sharedWithAffiliates: true,
      sharedWithLawEnforcement: 'Complies with domestic and international government requests with zero notification to buyer.',
      thirdPartyPartnersEstimate: '800+ merchants, logistics couriers, and digital ad retargeting platforms.',
      details: 'Data is passed along to thousands of individual third-party merchant factories and shipping brokers who are not bound by strict privacy rules.'
    },
    whatTheyMightDo: [
      {
        category: 'spam',
        title: 'Intense Daily Marketing & SMS Spam',
        likelihood: 'Guaranteed',
        description: 'Terms grant blanket consent to send recurring promotional text messages, coupon pushes, and affiliate emails.',
        mitigationTip: 'Use a secondary email address and dummy phone number (or VoIP) during checkout.'
      },
      {
        category: 'selling_data',
        title: 'Data Sharing With Unvetted Marketplace Sellers',
        likelihood: 'Guaranteed',
        description: 'Your real full name, phone number, and physical address are handed over directly to overseas suppliers.',
        mitigationTip: 'Review permissions in your mobile OS to deny contact and photo library access.'
      },
      {
        category: 'tracking',
        title: 'MAC Address & Wi-Fi Network Logging',
        likelihood: 'High',
        description: 'Logs surrounding BSSID Wi-Fi network routers to geolocate your exact physical apartment or office.',
        mitigationTip: 'Only use via web browser with strict cookie blocking rather than downloading the native application.'
      },
      {
        category: 'arbitration',
        title: 'Strict Binding Arbitration & Liability Shield',
        likelihood: 'Guaranteed',
        description: 'Company liability is capped at $50 or the cost of the item, regardless of actual damages caused.',
        mitigationTip: 'Be aware that consumer court protections are largely waived upon account creation.'
      }
    ],
    highlightedClauses: [
      {
        id: 'temu-1',
        quote: 'By providing your telephone number, you expressly authorize us and our marketing affiliates to deliver automated promotional text messages, pre-recorded telemarketing calls, and email communications.',
        category: 'spam',
        severity: 'critical',
        title: 'Unrestricted Marketing Spam Consent',
        explanation: 'Enables automated robocalls and commercial text blasts even if your number is on the National Do Not Call Registry.',
        impact: 'Flood of sales pitches and marketing spam.'
      },
      {
        id: 'temu-2',
        quote: 'We collect precise location data, Wi-Fi access points, Bluetooth signals, device serial numbers, and nearby network identifiers whenever the application is open or active.',
        category: 'location',
        severity: 'critical',
        title: 'Physical Location & Hardware Fingerprinting',
        explanation: 'Continuously maps your physical location via wireless signals even when GPS is disabled.',
        impact: 'Enables physical stalking of your daily routines and addresses.'
      },
      {
        id: 'temu-3',
        quote: 'We may sell, share, or license your contact details and transaction records to commercial partners and marketing networks for monetary and other valuable consideration.',
        category: 'selling_data',
        severity: 'critical',
        title: 'Explicit Sale of Personal Data',
        explanation: 'Company legally declares that your information can be sold to data brokers for profit.',
        impact: 'Your phone number and buying habits become part of public marketing catalogs.'
      },
      {
        id: 'temu-4',
        quote: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS SHALL NOT EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO US IN THE PRECEDING THREE MONTHS OR $50, WHICHEVER IS LESS.',
        category: 'arbitration',
        severity: 'high',
        title: '$50 Liability Cap',
        explanation: 'If a product burns down your house or leaks your financial data, their liability is legally restricted to $50.',
        impact: 'Near zero legal recourse for consumer damages.'
      }
    ],
    fullText: `TEMU TERMS OF USE & PRIVACY DISCLOSURE

1. Telephone Communications and Marketing
By providing your telephone number, you expressly authorize us and our marketing affiliates to deliver automated promotional text messages, pre-recorded telemarketing calls, and email communications. Consent is not an explicit condition of purchase, but default account creation includes opt-in consent to marketing networks.

2. Device Telemetry and Network Surveillance
We collect precise location data, Wi-Fi access points, Bluetooth signals, device serial numbers, and nearby network identifiers whenever the application is open or active. We utilize this to optimize network speeds and prevent bot abuse.

3. Commercial Data Transfers
We may sell, share, or license your contact details and transaction records to commercial partners and marketing networks for monetary and other valuable consideration. These partners may deliver personalized advertising on external websites.

4. Limitation of Liability and Mandatory Arbitration
TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS SHALL NOT EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO US IN THE PRECEDING THREE MONTHS OR $50, WHICHEVER IS LESS. All disputes must be submitted to binding individual arbitration.`,
    stats: {
      wordCount: 6310,
      estimatedReadTimeMinutes: 29,
      flaggedClausesCount: 4,
      spamRiskScore: 95,
      dataSellingRiskScore: 98
    },
    creatorWatermark: {
      author: 'Jack Ahlberg',
      university: 'Virginia Tech',
      verifiedSignature: 'VT-ENG-JACK-AHLBERG-2026-AUTH',
      notice: 'Verified original tool engineered by Jack Ahlberg, Virginia Tech student. Intellectual property protection active.'
    }
  },

  meta: {
    id: 'meta',
    title: 'Meta (Instagram & Facebook) Terms & Privacy Policy',
    url: 'https://www.facebook.com/privacy/policy',
    type: 'mixed',
    safetyScore: 3.9,
    scoreGrade: 'D (High Risk)',
    summary: 'Meta monitors your activity across millions of third-party apps and websites via the Meta Pixel SDK. By using the app, you grant a worldwide royalty-free license to use all your photos and videos, and allow Meta to train AI algorithms on your public content.',
    keyTakeaways: [
      'Tracks your web browsing on unrelated websites that use "Facebook Login" or Meta tracking pixels.',
      'Uses your public photos, captions, and comments to train proprietary generative AI models.',
      'Worldwide irrevocable license to monetize and display your content without paying you royalties.',
      'Builds shadow profiles even if your friends only mention your name or upload your photo.'
    ],
    dataStorage: {
      primaryLocations: ['United States (Prineville, Altoona, Forest City Data Centers)', 'Sweden', 'Ireland'],
      crossBorderTransfers: true,
      retentionPeriod: 'Retained until account deletion; backup copies and aggregate ad logs retained up to 90 days or indefinitely.',
      securitySummary: 'Enterprise-grade encryption and access protocols, but past leaks have exposed hundreds of millions of user records.',
      governmentAccessRisk: 'Medium',
      details: 'User data is distributed across massive hyperscale data centers with automated processing pipelines.'
    },
    dataSharing: {
      sharedWithBrokers: false,
      sharedWithAdvertisers: true,
      sharedWithAffiliates: true,
      sharedWithLawEnforcement: 'Responds to law enforcement search warrants and national security letters.',
      thirdPartyPartnersEstimate: 'Millions of advertisers, measurement partners, and integrated app developers.',
      details: 'Does not technically "sell" data to brokers for cash, but rents access to your attention via the world\'s most sophisticated behavioral advertising auction engine.'
    },
    whatTheyMightDo: [
      {
        category: 'ai_training',
        title: 'Train Generative AI on Your Photos & Posts',
        likelihood: 'Guaranteed',
        description: 'Uses your posts, images, and creative content to train Meta AI models without compensation.',
        mitigationTip: 'Set account to Private to reduce public training dataset ingestion.'
      },
      {
        category: 'tracking',
        title: 'Off-Meta Web & App Tracking',
        likelihood: 'Guaranteed',
        description: 'Third-party websites you visit send reports back to Meta about what products you looked at.',
        mitigationTip: 'Turn off "Off-Facebook Activity" in your Meta Account Center privacy settings.'
      },
      {
        category: 'spam',
        title: 'Ad Infiltration & Partner Promotional Messages',
        likelihood: 'High',
        description: 'Fills your feeds and direct messages with sponsored business messages and suggested partner products.',
        mitigationTip: 'Adjust ad preferences to block specific categories like alcohol or political ads.'
      }
    ],
    highlightedClauses: [
      {
        id: 'meta-1',
        quote: 'You grant us a non-exclusive, transferable, sub-licensable, royalty-free, and worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content.',
        category: 'acceptable',
        severity: 'high',
        title: 'Worldwide Content Sub-License',
        explanation: 'Allows Meta to redistribute and utilize your photos, videos, and artwork anywhere in the world without paying you.',
        impact: 'Loss of exclusive control over how your creative content is reused across the platform.'
      },
      {
        id: 'meta-2',
        quote: 'We use information from your activity on our Products, as well as information from partners about your activities off our Products (such as websites you visit and apps you use), to train our artificial intelligence and machine learning models.',
        category: 'ai_training',
        severity: 'critical',
        title: 'AI Training on Personal Uploads',
        explanation: 'Your family photos, voice notes, and creative writing are fed into neural networks.',
        impact: 'Your likeness and creative voice can be replicated by automated AI tools.'
      },
      {
        id: 'meta-3',
        quote: 'Partners provide information about your activities off Meta, including information about your device, websites you visit, purchases you make, the ads you see, and how you use their services—whether or not you have a Meta account.',
        category: 'tracking',
        severity: 'critical',
        title: 'Pervasive Off-Platform Tracking',
        explanation: 'Meta learns when you visit medical websites, news portals, or retail shops across the web.',
        impact: 'Comprehensive dossier created of your personal offline and online life.'
      }
    ],
    fullText: `META TERMS OF SERVICE & DATA USAGE CLAUSES

1. Permissions You Give Us
You grant us a non-exclusive, transferable, sub-licensable, royalty-free, and worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content. This license ends when your content is deleted from our systems.

2. Training AI Models
We use information from your activity on our Products, as well as information from partners about your activities off our Products (such as websites you visit and apps you use), to train our artificial intelligence and machine learning models. This enables us to develop features like Meta AI assistants and automated video tagging.

3. Off-Platform Information Collection
Partners provide information about your activities off Meta, including information about your device, websites you visit, purchases you make, the ads you see, and how you use their services—whether or not you have a Meta account. We use this information to measure ad effectiveness and personalize suggested posts.`,
    stats: {
      wordCount: 11200,
      estimatedReadTimeMinutes: 48,
      flaggedClausesCount: 3,
      spamRiskScore: 78,
      dataSellingRiskScore: 72
    },
    creatorWatermark: {
      author: 'Jack Ahlberg',
      university: 'Virginia Tech',
      verifiedSignature: 'VT-ENG-JACK-AHLBERG-2026-AUTH',
      notice: 'Verified original tool engineered by Jack Ahlberg, Virginia Tech student. Intellectual property protection active.'
    }
  },

  openai: {
    id: 'openai',
    title: 'OpenAI ChatGPT Terms of Use & Privacy Policy',
    url: 'https://openai.com/policies/terms-of-use',
    type: 'mixed',
    safetyScore: 6.8,
    scoreGrade: 'B (Fair)',
    summary: 'OpenAI may use your prompts and generated answers to train future foundation models unless you specifically toggle the data controls to opt out. Output ownership is granted to you, but OpenAI holds broad disclaimers regarding hallucinations and accuracy.',
    keyTakeaways: [
      'Free tier chats are used by default to train future GPT models (can be disabled in Settings > Data Controls).',
      'You own your input prompts and generated output, but OpenAI disclaims all warranties regarding factual accuracy.',
      'Stores chat history on cloud servers (Microsoft Azure) with standard enterprise security.',
      'Employees may review human-flagged conversations for trust and safety compliance.'
    ],
    dataStorage: {
      primaryLocations: ['United States (Microsoft Azure Cloud Regions)'],
      crossBorderTransfers: true,
      retentionPeriod: 'Retained for 30 days for abuse monitoring even if chat history is turned off; otherwise stored until user deletes chat.',
      securitySummary: 'SOC 2 Type II certified, TLS 1.3 in transit, AES-256 encryption at rest.',
      governmentAccessRisk: 'Low',
      details: 'Hosted primarily within secured Microsoft Azure cloud environments with access controls.'
    },
    dataSharing: {
      sharedWithBrokers: false,
      sharedWithAdvertisers: false,
      sharedWithAffiliates: false,
      sharedWithLawEnforcement: 'Discloses records only upon valid court subpoena or imminent safety emergency.',
      thirdPartyPartnersEstimate: 'Cloud infrastructure host (Microsoft Azure) and specialized security review contractors.',
      details: 'Does not sell consumer data to third-party ad networks or brokers.'
    },
    whatTheyMightDo: [
      {
        category: 'ai_training',
        title: 'Model Training on Prompt Inputs',
        likelihood: 'Moderate',
        description: 'May use user-submitted prompts to train upcoming models unless you explicitly turn off Chat History & Training.',
        mitigationTip: 'Go to Settings > Data Controls > Turn off "Improve the model for everyone".'
      },
      {
        category: 'data_retention',
        title: 'Human Review for Safety Violations',
        likelihood: 'Low',
        description: 'A small sample of conversations flagged by automated safety filters may be reviewed by trained human contractors.',
        mitigationTip: 'Do not paste confidential corporate secrets, patient records, or credentials.'
      }
    ],
    highlightedClauses: [
      {
        id: 'oai-1',
        quote: 'We may use Content from Services other than our API to help develop and improve our Services, including training the machine learning models that power ChatGPT.',
        category: 'ai_training',
        severity: 'medium',
        title: 'Model Training Inclusion',
        explanation: 'Your typed questions and conversations are studied by engineers and algorithms to make future models smarter.',
        impact: 'Confidential thoughts or company memos could potentially be memorized by the AI.'
      },
      {
        id: 'oai-2',
        quote: 'As between you and OpenAI, and to the extent permitted by applicable law, you own your Input and we assign to you all our right, title, and interest in and to Output.',
        category: 'acceptable',
        severity: 'safe',
        title: 'User Ownership of Output',
        explanation: 'You retain full ownership of the answers generated, allowing commercial use without royalty fees.',
        impact: 'Very consumer-friendly term.'
      }
    ],
    fullText: `OPENAI TERMS OF USE (EXCERPT)

1. Content and Model Improvement
We may use Content from Services other than our API to help develop and improve our Services, including training the machine learning models that power ChatGPT. If you do not want your Content used to improve the Services, you can opt out by updating your account settings.

2. Ownership of Content
As between you and OpenAI, and to the extent permitted by applicable law, you own your Input and we assign to you all our right, title, and interest in and to Output. You are responsible for Content, including ensuring that it does not violate any applicable law or these Terms.

3. Accuracy and Disclaimer
Artificial intelligence and machine learning are rapidly evolving fields. When you use our Services you understand and agree that Output may not always be accurate and should not be relied upon as a sole source of truth.`,
    stats: {
      wordCount: 5200,
      estimatedReadTimeMinutes: 22,
      flaggedClausesCount: 2,
      spamRiskScore: 18,
      dataSellingRiskScore: 8
    },
    creatorWatermark: {
      author: 'Jack Ahlberg',
      university: 'Virginia Tech',
      verifiedSignature: 'VT-ENG-JACK-AHLBERG-2026-AUTH',
      notice: 'Verified original tool engineered by Jack Ahlberg, Virginia Tech student. Intellectual property protection active.'
    }
  },

  signal: {
    id: 'signal',
    title: 'Signal Messenger Privacy Policy & Terms',
    url: 'https://signal.org/legal/',
    type: 'privacy_policy',
    safetyScore: 9.8,
    scoreGrade: 'A (Privacy Respecting)',
    summary: 'Signal is engineered so that it physically cannot access your messages, media, or contact list. State-of-the-art end-to-end encryption means zero ads, zero tracking, zero data brokers, and zero training datasets.',
    keyTakeaways: [
      'End-to-end encrypted by default: only the sender and recipient can read messages.',
      'Does not store message history, call records, contacts, or location data on servers.',
      'Non-profit foundation model with zero venture capitalist or advertising revenue pressures.',
      'No marketing emails, promotional text spam, or third-party SDK telemetry.'
    ],
    dataStorage: {
      primaryLocations: ['Decentralized / Ephemeral server relays (Only holds encrypted tokens in transit)'],
      crossBorderTransfers: false,
      retentionPeriod: 'Only your account phone number and Unix timestamp of account creation are retained.',
      securitySummary: 'Signal Protocol (open-source, audited cryptographic gold standard).',
      governmentAccessRisk: 'Low',
      details: 'Even with a search warrant or court subpoena, Signal has zero user message data to provide.'
    },
    dataSharing: {
      sharedWithBrokers: false,
      sharedWithAdvertisers: false,
      sharedWithAffiliates: false,
      sharedWithLawEnforcement: 'Can only turn over the date/time an account was created and last connected time.',
      thirdPartyPartnersEstimate: '0 advertisers or analytics brokers.',
      details: 'Zero third-party trackers or advertising syndicates.'
    },
    whatTheyMightDo: [
      {
        category: 'acceptable',
        title: 'Zero Data Commercialization',
        likelihood: 'Unlikely',
        description: 'Signal will never sell, rent, or monetize your personal conversations or identity.',
        mitigationTip: 'No action needed. High privacy benchmark.'
      }
    ],
    highlightedClauses: [
      {
        id: 'sig-1',
        quote: 'Signal is designed to never collect or store any sensitive information. Signal messages and calls cannot be accessed by us or other third parties because they are always end-to-end encrypted, private, and secure.',
        category: 'acceptable',
        severity: 'safe',
        title: 'Zero-Knowledge Architecture',
        explanation: 'Servers act as blind couriers with mathematically unbreakable encryption keys stored only on user devices.',
        impact: 'Maximum privacy and peace of mind.'
      },
      {
        id: 'sig-2',
        quote: 'We do not sell, rent, or monetize your personal data or content in any way – ever.',
        category: 'acceptable',
        severity: 'safe',
        title: 'Anti-Commercial Pledge',
        explanation: 'Explicit legal promise never to sell user data or run targeted ad businesses.',
        impact: 'Zero spam emails and zero data broker profiles.'
      }
    ],
    fullText: `SIGNAL PRIVACY POLICY & TERMS

1. Privacy by Design
Signal is designed to never collect or store any sensitive information. Signal messages and calls cannot be accessed by us or other third parties because they are always end-to-end encrypted, private, and secure.

2. Information We Store
The only information we retain is the phone number you register with and the date and time of account creation. We cannot decrypt your messages or inspect who you communicate with.

3. No Ads, No Trackers, No Data Brokers
We do not sell, rent, or monetize your personal data or content in any way – ever. We do not partner with third-party ad networks or analytics trackers.`,
    stats: {
      wordCount: 1400,
      estimatedReadTimeMinutes: 6,
      flaggedClausesCount: 2,
      spamRiskScore: 0,
      dataSellingRiskScore: 0
    },
    creatorWatermark: {
      author: 'Jack Ahlberg',
      university: 'Virginia Tech',
      verifiedSignature: 'VT-ENG-JACK-AHLBERG-2026-AUTH',
      notice: 'Verified original tool engineered by Jack Ahlberg, Virginia Tech student. Intellectual property protection active.'
    }
  }
};
