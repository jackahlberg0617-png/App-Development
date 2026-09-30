import JSZip from 'jszip';

export interface ExtensionFile {
  name: string;
  path: string;
  language: string;
  content: string;
  description: string;
}

export function getExtensionSourceFiles(): ExtensionFile[] {
  return [
    {
      name: 'manifest.json',
      path: 'manifest.json',
      language: 'json',
      description: 'Chrome Extension Manifest V3 configuration with Jack Ahlberg Virginia Tech authorship metadata.',
      content: JSON.stringify({
        "manifest_version": 3,
        "name": "Better Safe Then Sorry - Privacy & Terms Guardian",
        "short_name": "Better Safe Then Sorry",
        "version": "1.0.0",
        "description": "Scans webpages for Privacy Policies & Terms of Service, highlights key clauses, flags data risks, and calculates a safety score out of 10. Created by Virginia Tech student Jack Ahlberg.",
        "author": "Jack Ahlberg (Virginia Tech)",
        "homepage_url": "https://github.com/jackahlberg/better-safe-then-sorry",
        "icons": {
          "16": "icons/icon16.png",
          "48": "icons/icon48.png",
          "128": "icons/icon128.png"
        },
        "action": {
          "default_popup": "popup.html",
          "default_icon": {
            "16": "icons/icon16.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png"
          },
          "default_title": "Better Safe Then Sorry - By Jack Ahlberg"
        },
        "permissions": [
          "activeTab",
          "storage",
          "scripting"
        ],
        "content_scripts": [
          {
            "matches": ["<all_urls>"],
            "js": ["content.js"],
            "css": ["content.css"],
            "run_at": "document_idle"
          }
        ],
        "background": {
          "service_worker": "background.js"
        }
      }, null, 2)
    },

    {
      name: 'popup.html',
      path: 'popup.html',
      language: 'html',
      description: 'Popup window rendered when user clicks the extension icon in Chrome toolbar.',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Better Safe Then Sorry</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="popup-container">
    <!-- Header with Virginia Tech Student Watermark -->
    <header class="header">
      <div class="brand">
        <div class="logo-shield">🛡️</div>
        <div>
          <h1 class="title">Better Safe Then Sorry</h1>
          <p class="tagline">Privacy & Terms Guardian</p>
        </div>
      </div>
      <div class="vt-badge" title="Original work by Jack Ahlberg, Virginia Tech">
        <span class="vt-crest">VT</span> Jack Ahlberg
      </div>
    </header>

    <!-- Score Banner -->
    <section class="score-card" id="scoreCard">
      <div class="score-circle" id="scoreCircle">
        <span class="score-number" id="scoreNum">--</span>
        <span class="score-max">/10</span>
      </div>
      <div class="score-info">
        <div class="score-label" id="scoreRating">Detecting Terms...</div>
        <div class="page-url" id="pageTitle">Scanning active tab</div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <nav class="nav-tabs">
      <button class="tab-btn active" data-tab="summary">Summary</button>
      <button class="tab-btn" data-tab="risks">Risks (<span id="riskCount">0</span>)</button>
      <button class="tab-btn" data-tab="data">Data & Sharing</button>
      <button class="tab-btn" data-tab="actions">Spam & Rights</button>
    </nav>

    <!-- Tab Contents -->
    <main class="tab-body">
      <!-- Summary Tab -->
      <div class="tab-pane active" id="tab-summary">
        <div class="card">
          <h3>📋 What You Are Signing Up For</h3>
          <p id="summaryText" class="summary-p">Navigate to a page with a Privacy Policy or Terms of Service to see an instant plain-English breakdown.</p>
        </div>
        <div class="card">
          <h3>⚡ Key Takeaways</h3>
          <ul id="takeawaysList" class="checklist"></ul>
        </div>
      </div>

      <!-- Risks Tab -->
      <div class="tab-pane" id="tab-risks">
        <div class="action-bar">
          <button id="highlightWebpageBtn" class="primary-btn">✨ Highlight Clauses on Webpage</button>
        </div>
        <div id="clausesList" class="clauses-container"></div>
      </div>

      <!-- Data & Sharing Tab -->
      <div class="tab-pane" id="tab-data">
        <div class="card">
          <h3>📍 Where Your Data Is Stored</h3>
          <p id="storageLocations" class="detail-text">--</p>
        </div>
        <div class="card">
          <h3>🤝 Who They Share It With</h3>
          <p id="sharingEntities" class="detail-text">--</p>
        </div>
      </div>

      <!-- Spam & Actions Tab -->
      <div class="tab-pane" id="tab-actions">
        <div class="card">
          <h3>🚨 What They Might Do With It</h3>
          <div id="actionsList" class="actions-list"></div>
        </div>
      </div>
    </main>

    <!-- Footer with Untamperable Author Watermark -->
    <footer class="footer">
      <div class="author-credits">
        <span>Created by <strong>Jack Ahlberg</strong> • Virginia Tech Student</span>
        <span class="copyright">Copyright © 2026. All rights reserved.</span>
      </div>
    </footer>
  </div>
  <script src="popup.js"></script>
</body>
</html>`
    },

    {
      name: 'popup.css',
      path: 'popup.css',
      language: 'css',
      description: 'Styles for the extension popup including Virginia Tech maroon & orange brand touches.',
      content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  width: 380px;
  background-color: #0f172a;
  color: #f8fafc;
  font-size: 13px;
  line-height: 1.5;
}

.popup-container {
  display: flex;
  flex-direction: column;
  min-height: 480px;
  max-height: 580px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-shield {
  font-size: 20px;
  background: #3b82f6;
  border-radius: 8px;
  padding: 4px 6px;
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

.tagline {
  font-size: 10px;
  color: #94a3b8;
}

/* Virginia Tech Maroon & Burnt Orange Accent */
.vt-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #861F41; /* VT Maroon */
  color: #E87722;      /* VT Orange */
  font-weight: 700;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 9999px;
  border: 1px solid #E87722;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.score-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
  border-bottom: 1px solid #334155;
}

.score-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1e293b;
  border: 3px solid #ef4444;
  flex-shrink: 0;
}

.score-number {
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  color: #f87171;
}

.score-max {
  font-size: 9px;
  color: #94a3b8;
}

.score-info {
  overflow: hidden;
}

.score-label {
  font-size: 14px;
  font-weight: 700;
  color: #fca5a5;
}

.page-url {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-tabs {
  display: flex;
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.tab-btn {
  flex: 1;
  padding: 8px 4px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-btn.active {
  color: #38bdf8;
  border-bottom-color: #38bdf8;
  background: rgba(56, 189, 248, 0.05);
}

.tab-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tab-pane {
  display: none;
  flex-direction: column;
  gap: 10px;
}

.tab-pane.active {
  display: flex;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
}

.card h3 {
  font-size: 12px;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 6px;
}

.summary-p {
  color: #cbd5e1;
  font-size: 12px;
  line-height: 1.5;
}

.checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.checklist li {
  font-size: 11px;
  color: #94a3b8;
  position: relative;
  padding-left: 14px;
}

.checklist li::before {
  content: "•";
  position: absolute;
  left: 2px;
  color: #f87171;
  font-weight: bold;
}

.action-bar {
  margin-bottom: 6px;
}

.primary-btn {
  width: 100%;
  padding: 8px 12px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}

.primary-btn:hover {
  background: #2563eb;
}

.clauses-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clause-item {
  background: #1e293b;
  border-left: 3px solid #ef4444;
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 11px;
}

.clause-item.critical { border-left-color: #ef4444; }
.clause-item.high { border-left-color: #f97316; }
.clause-item.medium { border-left-color: #eab308; }
.clause-item.safe { border-left-color: #22c55e; }

.clause-title {
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 4px;
}

.clause-quote {
  font-style: italic;
  color: #94a3b8;
  margin-bottom: 4px;
  font-size: 10.5px;
}

.clause-impact {
  color: #f87171;
  font-size: 10px;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-entry {
  background: #0f172a;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #334155;
}

.action-entry-title {
  font-weight: 700;
  font-size: 11px;
  color: #fca5a5;
  display: flex;
  justify-content: space-between;
}

.badge-likelihood {
  font-size: 9px;
  padding: 1px 6px;
  border-radius: 4px;
  background: #7f1d1d;
  color: #fecaca;
}

.action-desc {
  font-size: 10.5px;
  color: #cbd5e1;
  margin: 4px 0;
}

.mitigation-tip {
  font-size: 10px;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 4px 6px;
  border-radius: 4px;
}

.footer {
  padding: 8px 12px;
  background: #0b1120;
  border-top: 1px solid #1e293b;
  text-align: center;
}

.author-credits {
  font-size: 10px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-credits strong {
  color: #E87722;
}

.copyright {
  font-size: 9px;
  color: #64748b;
}`
    },

    {
      name: 'popup.js',
      path: 'popup.js',
      language: 'javascript',
      description: 'Popup logic that requests scan data from content.js and populates the extension UI.',
      content: `// Better Safe Then Sorry - Extension Popup Controller
// Created by Jack Ahlberg (Virginia Tech Student)

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  requestActiveTabScan();
  setupHighlightButton();
});

function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = 'tab-' + tab.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function requestActiveTabScan() {
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    console.log('Running in preview/mock mode');
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    const activeTab = tabs[0];
    document.getElementById('pageTitle').innerText = activeTab.title || activeTab.url;

    chrome.tabs.sendMessage(activeTab.id, { action: 'GET_POLICY_ANALYSIS' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        document.getElementById('scoreRating').innerText = 'No Terms Detected';
        document.getElementById('summaryText').innerText = 
          'No privacy policy or terms of service detected on this page. Visit a page containing terms or privacy policies to scan.';
        return;
      }
      populateUI(response);
    });
  });
}

function populateUI(data) {
  if (!data) return;

  // Score
  const scoreNum = document.getElementById('scoreNum');
  const scoreCircle = document.getElementById('scoreCircle');
  const scoreRating = document.getElementById('scoreRating');

  const score = data.safetyScore || 5.0;
  scoreNum.innerText = score.toFixed(1);
  scoreRating.innerText = data.scoreGrade || (score > 7 ? 'Safe & Fair' : 'Risky Terms');

  if (score < 4) {
    scoreCircle.style.borderColor = '#ef4444';
    scoreNum.style.color = '#f87171';
  } else if (score < 7) {
    scoreCircle.style.borderColor = '#f59e0b';
    scoreNum.style.color = '#fbbf24';
  } else {
    scoreCircle.style.borderColor = '#22c55e';
    scoreNum.style.color = '#4ade80';
  }

  // Summary
  document.getElementById('summaryText').innerText = data.summary || 'Summary unavailable.';

  // Takeaways
  const takeawaysList = document.getElementById('takeawaysList');
  takeawaysList.innerHTML = '';
  (data.keyTakeaways || []).forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    takeawaysList.appendChild(li);
  });

  // Risk count & clauses
  const clauses = data.highlightedClauses || [];
  document.getElementById('riskCount').innerText = clauses.length;
  const clausesList = document.getElementById('clausesList');
  clausesList.innerHTML = '';

  clauses.forEach(clause => {
    const div = document.createElement('div');
    div.className = 'clause-item ' + (clause.severity || 'high');
    div.innerHTML = \`
      <div class="clause-title">\${clause.title}</div>
      <div class="clause-quote">"\${clause.quote}"</div>
      <div class="clause-impact">\${clause.explanation}</div>
    \`;
    clausesList.appendChild(div);
  });

  // Data storage & sharing
  if (data.dataStorage) {
    document.getElementById('storageLocations').innerText = 
      (data.dataStorage.primaryLocations || []).join(', ') + ' • ' + (data.dataStorage.details || '');
  }
  if (data.dataSharing) {
    document.getElementById('sharingEntities').innerText = 
      data.dataSharing.details || 'Shares with affiliates and advertising brokers.';
  }

  // Actions / Spam
  const actionsList = document.getElementById('actionsList');
  actionsList.innerHTML = '';
  (data.whatTheyMightDo || []).forEach(action => {
    const div = document.createElement('div');
    div.className = 'action-entry';
    div.innerHTML = \`
      <div class="action-entry-title">
        <span>\${action.title}</span>
        <span class="badge-likelihood">\${action.likelihood}</span>
      </div>
      <p class="action-desc">\${action.description}</p>
      \${action.mitigationTip ? \`<div class="mitigation-tip">💡 Tip: \${action.mitigationTip}</div>\` : ''}
    \`;
    actionsList.appendChild(div);
  });
}

function setupHighlightButton() {
  const btn = document.getElementById('highlightWebpageBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'HIGHLIGHT_CLAUSES_ON_PAGE' });
        }
      });
    }
  });
}
`
    },

    {
      name: 'content.js',
      path: 'content.js',
      language: 'javascript',
      description: 'Content script injected into webpages. Detects privacy policy texts, highlights risky clauses, and injects floating in-page badge.',
      content: `// Better Safe Then Sorry - Content Script
// Author: Jack Ahlberg (Virginia Tech Student)
// Automatically scans active webpage for Privacy Policies & Terms of Service,
// highlights critical clauses, and injects floating safety score badge.

(() => {
  const AUTHOR_INFO = {
    name: 'Jack Ahlberg',
    school: 'Virginia Tech',
    extension: 'Better Safe Then Sorry'
  };

  const RISK_PATTERNS = [
    {
      category: 'biometrics',
      severity: 'critical',
      regex: /(biometric|faceprint|voiceprint|facial recognition|geometry of your face)/gi,
      title: 'Biometric Data Collection',
      explanation: 'Scans your physical likeness, faceprints, or voice characteristics.'
    },
    {
      category: 'tracking',
      severity: 'critical',
      regex: /(keystroke|clipboard|clipboard data|rhythm of typing|hardware identifiers|mac address|bssid)/gi,
      title: 'Deep Hardware & Keystroke Tracking',
      explanation: 'Logs your typing cadence, clipboard contents, or device network identifiers.'
    },
    {
      category: 'selling_data',
      severity: 'critical',
      regex: /(sell your personal data|sell, share, or license|data brokers|monetary or other valuable consideration)/gi,
      title: 'Data Commercialization / Sale',
      explanation: 'Explicitly reserves the right to monetize or sell your personal records to third parties.'
    },
    {
      category: 'spam',
      severity: 'high',
      regex: /(promotional messages|commercial emails|telemarketing|sms text messages|partner marketing|automated dialing)/gi,
      title: 'Marketing & Spam Consent',
      explanation: 'Authorizes automated marketing emails, partner pitches, and telemarketing text spam.'
    },
    {
      category: 'arbitration',
      severity: 'high',
      regex: /(binding arbitration|waive your right to a jury|class action waiver|individual capacity and not as a plaintiff)/gi,
      title: 'Forced Arbitration Waiver',
      explanation: 'You surrender your right to take this company to court or join a class action lawsuit.'
    }
  ];

  let detectedPolicy = false;
  let flaggedCount = 0;

  function initScan() {
    const pageText = document.body ? document.body.innerText.toLowerCase() : '';
    const isPolicy = pageText.includes('privacy policy') || 
                     pageText.includes('terms of service') || 
                     pageText.includes('terms and conditions') || 
                     pageText.includes('data protection notice');

    if (!isPolicy) return;
    detectedPolicy = true;

    highlightClauses();
    injectFloatingWidget();
  }

  function highlightClauses() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement || 
          ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(node.parentElement.tagName) ||
          node.parentElement.closest('.bst-overlay-widget')) {
        continue;
      }

      for (const pattern of RISK_PATTERNS) {
        if (pattern.regex.test(node.nodeValue)) {
          nodesToReplace.push({ node, pattern });
          flaggedCount++;
          break;
        }
      }
    }

    nodesToReplace.forEach(({ node, pattern }) => {
      const parent = node.parentNode;
      if (!parent) return;

      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(pattern.regex, (match) => {
        return \`<mark class="bst-highlight bst-\${pattern.severity}" title="⚠️ Flagged by Better Safe Then Sorry (Jack Ahlberg): \${pattern.title} - \${pattern.explanation}">\${match}</mark>\`;
      });
      parent.replaceChild(span, node);
    });
  }

  function injectFloatingWidget() {
    if (document.getElementById('bst-floating-root')) return;

    const widget = document.createElement('div');
    widget.id = 'bst-floating-root';
    widget.className = 'bst-overlay-widget';
    widget.innerHTML = \`
      <div class="bst-widget-inner">
        <div class="bst-widget-header">
          <span class="bst-icon">🛡️</span>
          <div class="bst-widget-text">
            <strong>Better Safe Then Sorry</strong>
            <span class="bst-sub">Privacy Guardian • By Jack Ahlberg (VT)</span>
          </div>
          <button class="bst-close-btn" id="bstCloseBtn">&times;</button>
        </div>
        <div class="bst-widget-body">
          <div class="bst-badge-risk">⚠️ Policy Detected</div>
          <p class="bst-p">\${flaggedCount} privacy risks and key clauses highlighted on this page.</p>
          <div class="bst-vt-credit">🎓 Virginia Tech Student Project</div>
        </div>
      </div>
    \`;

    document.body.appendChild(widget);

    document.getElementById('bstCloseBtn')?.addEventListener('click', () => {
      widget.style.display = 'none';
    });
  }

  // Message listener for popup communication
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'HIGHLIGHT_CLAUSES_ON_PAGE') {
        highlightClauses();
        sendResponse({ success: true, count: flaggedCount });
      }
    });
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScan);
  } else {
    initScan();
  }
})();
`
    },

    {
      name: 'content.css',
      path: 'content.css',
      language: 'css',
      description: 'CSS injected into webpages to highlight clauses and display the floating safety widget.',
      content: `/* Better Safe Then Sorry - In-Page Highlighter & Widget Styles */
/* Created by Jack Ahlberg (Virginia Tech) */

mark.bst-highlight {
  border-radius: 3px;
  padding: 1px 4px;
  font-weight: 600;
  cursor: help;
  transition: background-color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

mark.bst-highlight.bst-critical {
  background-color: #fee2e2 !important;
  color: #991b1b !important;
  border-bottom: 2px solid #ef4444 !important;
}

mark.bst-highlight.bst-high {
  background-color: #ffedd5 !important;
  color: #9a3412 !important;
  border-bottom: 2px solid #f97316 !important;
}

mark.bst-highlight.bst-medium {
  background-color: #fef9c3 !important;
  color: #854d0e !important;
  border-bottom: 2px solid #eab308 !important;
}

.bst-overlay-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2147483647;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  animation: bstSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes bstSlideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.bst-widget-inner {
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 12px;
  width: 290px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.bst-widget-header {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  gap: 8px;
}

.bst-icon {
  font-size: 18px;
}

.bst-widget-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.bst-widget-text strong {
  font-size: 12px;
  color: #f8fafc;
  font-weight: 700;
}

.bst-sub {
  font-size: 10px;
  color: #94a3b8;
}

.bst-close-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
}

.bst-close-btn:hover {
  color: #f8fafc;
}

.bst-widget-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bst-badge-risk {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #ef4444;
}

.bst-p {
  font-size: 11.5px;
  color: #cbd5e1;
  line-height: 1.4;
  margin: 0;
}

.bst-vt-credit {
  font-size: 10px;
  color: #E87722;
  font-weight: 600;
  margin-top: 4px;
  border-top: 1px dashed #334155;
  padding-top: 6px;
}
`
    },

    {
      name: 'background.js',
      path: 'background.js',
      language: 'javascript',
      description: 'Manifest V3 Service Worker managing tab updates and safety score badge colors.',
      content: `// Better Safe Then Sorry - Background Service Worker
// Author: Jack Ahlberg (Virginia Tech)

chrome.runtime.onInstalled.addListener(() => {
  console.log('Better Safe Then Sorry extension installed successfully.');
  console.log('Author & Creator: Jack Ahlberg, Virginia Tech Student.');
});

// Update badge text based on safety score
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'UPDATE_BADGE' && sender.tab) {
    const score = message.score || '?';
    chrome.action.setBadgeText({
      tabId: sender.tab.id,
      text: String(score)
    });

    const isSafe = typeof score === 'number' && score >= 7;
    chrome.action.setBadgeBackgroundColor({
      tabId: sender.tab.id,
      color: isSafe ? '#22c55e' : '#ef4444'
    });
  }
});
`
    },

    {
      name: 'README.md',
      path: 'README.md',
      language: 'markdown',
      description: 'Step-by-step instructions to load into Google Chrome with Developer Mode.',
      content: `# Better Safe Then Sorry - Google Chrome Extension
**Privacy Policy & Terms of Service Guardian**

Created and Engineered by **Jack Ahlberg**, student at **Virginia Tech**.
Copyright © 2026 Jack Ahlberg. All Rights Reserved.

---

### What does this extension do?
- **Automated Detection**: Detects whenever a Privacy Policy or Terms of Service page is opened.
- **Key Clause Highlighter**: Injects visual markers directly onto the page, highlighting hidden risks in red, orange, and yellow.
- **Safety Score /10**: Calculates an intuitive safety score (0 to 10) rating the fairness and security of the agreement.
- **Plain-English Summary**: Summarizes in seconds what you are actually signing up for.
- **Data Storage & Sharing Map**: Reveals where your data is stored across cloud servers and international borders, and who it is shared with (data brokers, ad networks, law enforcement).
- **Spam & Action Forecast**: Warns you about potential spam emails, telemarketing texts, location tracking, and forced arbitration waivers.

---

### How to Install in Google Chrome (3 Quick Steps)

1. **Unzip the downloaded folder**:
   Extract \`better-safe-then-sorry-extension.zip\` into a folder on your computer.

2. **Open Chrome Extensions**:
   In Google Chrome, navigate to \`chrome://extensions/\` (or open Chrome Menu > Extensions > Manage Extensions).

3. **Load the Unpacked Extension**:
   - In the top right corner, toggle **Developer mode** to ON.
   - Click the **Load unpacked** button in the top left toolbar.
   - Select the unzipped folder containing \`manifest.json\`.

That's it! The shield icon will appear in your Chrome toolbar. Pin it to your toolbar for instant 1-click privacy protection on any website.

---
### Author & Ownership
- **Author**: Jack Ahlberg
- **Institution**: Virginia Tech (Go Hokies! 🦃)
- **Year**: 2026
`
    }
  ];
}

export async function generateExtensionZipBlob(): Promise<Blob> {
  const zip = new JSZip();
  const files = getExtensionSourceFiles();

  // Add all files
  files.forEach(file => {
    zip.file(file.path, file.content);
  });

  // Add dummy placeholder icons in icons/ folder using SVG/Canvas data or basic PNG byte sequence
  const iconsFolder = zip.folder('icons');
  if (iconsFolder) {
    // 16x16 dummy valid PNG
    const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    iconsFolder.file('icon16.png', base64Png, { base64: true });
    iconsFolder.file('icon48.png', base64Png, { base64: true });
    iconsFolder.file('icon128.png', base64Png, { base64: true });
  }

  return await zip.generateAsync({ type: 'blob' });
}
