import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers
function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading config file:', e);
  }
  return {
    mentorName: 'Aditya Thakare',
    mentorTitle: 'Relationship & Conscious Intimacy Mentor',
    communityName: 'Monkhood',
    communityJoinUrl: 'https://join.monkhoodclub.com',
    checkoutUrl: 'https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf',
    googleSheetsWebhook: 'https://script.google.com/macros/s/AKfycbzmwl31w0HaVBtwrRaFGJxV-GlBvMijC1a_NmW_941ywqMEl6tOdDf4DJpw4MarOZaG/exec',
    sessionDuration: '30 Minutes',
    sessionFormat: 'Private 1-on-1 Video Session (100% Confidential)',
    sessionInvestment: 'Exclusive Monkhood Community Member Access',
    currency: 'INR',
    notificationEmail: 'monkhoodlife@gmail.com'
  };
}

function writeConfig(data: any) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function readSubmissions(): any[] {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading submissions file:', e);
  }
  return [];
}

function writeSubmissions(data: any[]) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// API Routes
app.get('/api/config', (_req, res) => {
  res.json(readConfig());
});

app.post('/api/config', (req, res) => {
  try {
    const current = readConfig();
    const updated = { ...current, ...req.body };
    writeConfig(updated);
    res.json({ success: true, config: updated });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/submissions', (_req, res) => {
  const submissions = readSubmissions();
  res.json(submissions);
});

app.get('/api/check-status', (req, res) => {
  const query = String(req.query.q || '').trim().toLowerCase();
  if (!query) {
    return res.status(400).json({ error: 'Email, phone, or application ID is required' });
  }
  const submissions = readSubmissions();
  const digits = query.replace(/\D/g, '');
  const match = submissions.find(s => {
    if (s.id && s.id.toLowerCase() === query) return true;
    if (s.email && s.email.toLowerCase() === query) return true;
    if (digits.length >= 7 && s.phone) {
      const sDigits = s.phone.replace(/\D/g, '');
      if (sDigits && (sDigits.includes(digits) || digits.includes(sDigits))) return true;
    }
    return false;
  });
  if (!match) {
    return res.status(404).json({ error: 'No application found matching this email or ID.' });
  }
  res.json({
    found: true,
    id: match.id,
    fullName: match.fullName,
    status: match.status,
    timestamp: match.timestamp,
    preferredSlot: match.preferredSlot,
    breakthroughArea: match.breakthroughArea
  });
});

app.post('/api/submit', async (req, res) => {
  try {
    const body = req.body || {};
    const submissions = readSubmissions();
    const config = readConfig();

    const newSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      status: 'New',
      notes: '',
      ...body
    };

    submissions.unshift(newSubmission);
    writeSubmissions(submissions);

    // Optional webhook forwarding to Google Sheets or Zapier
    if (config.googleSheetsWebhook && config.googleSheetsWebhook.trim().startsWith('http')) {
      try {
        const webhookUrl = config.googleSheetsWebhook.trim();
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSubmission),
          redirect: 'follow'
        })
          .then(async (response) => {
            const respText = await response.text();
            console.log(`[Google Sheets Webhook] HTTP ${response.status}:`, respText.substring(0, 150));
          })
          .catch(err => console.warn('[Google Sheets Webhook Error]:', err));
      } catch (err) {
        console.warn('Webhook trigger error:', err);
      }
    }

    res.json({
      success: true,
      id: newSubmission.id,
      redirectUrl: config.checkoutUrl || 'https://rzp.io/l/aditya-thakare-session'
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.patch('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const submissions = readSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    submissions[index] = { ...submissions[index], ...req.body };
    writeSubmissions(submissions);
    res.json({ success: true, submission: submissions[index] });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const submissions = readSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    writeSubmissions(filtered);
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/export-csv', (_req, res) => {
  const submissions = readSubmissions();
  const headers = [
    'ID',
    'Timestamp',
    'Status',
    'Full Name',
    'Email',
    'Phone',
    'Gender',
    'Location',
    'Current Journey',
    'Breakthrough Area',
    'Untapped Potential',
    'Ready for Direction',
    'Committed to Roadmap',
    'Ready to Invest Energy',
    'Why Aditya Thakare',
    'Desired Breakthrough & Vision',
    'Preferred Slot',
    'Notes'
  ];

  const csvRows = [headers.join(',')];

  for (const s of submissions) {
    const escapeCsv = (val: any) => {
      if (val === undefined || val === null) return '""';
      const clean = String(val).replace(/"/g, '""').replace(/\r?\n/g, ' ');
      return `"${clean}"`;
    };

    const row = [
      escapeCsv(s.id),
      escapeCsv(s.timestamp),
      escapeCsv(s.status),
      escapeCsv(s.fullName),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.gender),
      escapeCsv(s.location),
      escapeCsv(s.currentJourney),
      escapeCsv(s.breakthroughArea),
      escapeCsv(s.untappedPotential),
      escapeCsv(s.readyForDirection),
      escapeCsv(s.committedToRoadmap),
      escapeCsv(s.investEnergy),
      escapeCsv(s.whyMentor || s.whyAditya || s.whyDeepanshu),
      escapeCsv(s.breakthroughVision),
      escapeCsv(s.preferredSlot),
      escapeCsv(s.notes)
    ];
    csvRows.push(row.join(','));
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="aditya_thakare_1on1_submissions.csv"');
  res.send(csvRows.join('\n'));
});

// Vite Middleware integration for dev and production
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
