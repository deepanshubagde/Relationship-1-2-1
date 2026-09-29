import React, { useState, useEffect } from 'react';
import { ViewStep, FormQuestions, Submission, FunnelConfig } from './types';
import { GatewayView } from './components/GatewayView';
import { NonMemberView } from './components/NonMemberView';
import { MemberFormView } from './components/MemberFormView';
import { SuccessView } from './components/SuccessView';
import { AdminPortal } from './components/AdminPortal';
import { ConfigModal } from './components/ConfigModal';

const DEFAULT_CONFIG: FunnelConfig = {
  mentorName: 'Aditya Sakhare',
  mentorTitle: 'Relationship & Conscious Intimacy Mentor',
  communityName: 'Monkhood',
  communityJoinUrl: 'https://join.monkhoodclub.com',
  checkoutUrl: 'https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf',
  googleSheetsWebhook: 'https://script.google.com/macros/s/AKfycbzmwl31w0HaVBtwrRaFGJxV-GlBvMijC1a_NmW_941ywqMEl6tOdDf4DJpw4MarOZaG/exec',
  sessionDuration: '30 Minutes',
  sessionFormat: 'Private 1-on-1 Video Session (100% Confidential)',
  sessionInvestment: 'Exclusive Monkhood Community Member Access',
  currency: 'INR',
  notificationEmail: 'monkhoodlife@gmail.com',
};

export default function App() {
  // Starts from Overview & Eligibility Gateway
  const [currentStep, setCurrentStep] = useState<ViewStep>('gateway');
  const [config, setConfig] = useState<FunnelConfig>(DEFAULT_CONFIG);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Fetch initial config and submissions
  useEffect(() => {
    fetchConfig();
    fetchSubmissions();
  }, []);

  // Keyboard shortcut listener (Ctrl+Shift+A for Admin, Ctrl+Shift+S for Settings)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          setCurrentStep('admin');
        } else if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          setShowConfigModal(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn('Could not fetch config from server, using defaults:', err);
    }
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.warn('Could not fetch submissions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateConfig = async (updated: Partial<FunnelConfig>) => {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
      }
    } catch (err) {
      console.error('Failed to save config:', err);
    }
  };

  const handleSubmitForm = (formData: FormQuestions) => {
    setIsSubmitting(true);
    const targetCheckout = config.checkoutUrl || 'https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf';
    const sheetsWebhook = config.googleSheetsWebhook || 'https://script.google.com/macros/s/AKfycbzmwl31w0HaVBtwrRaFGJxV-GlBvMijC1a_NmW_941ywqMEl6tOdDf4DJpw4MarOZaG/exec';

    const payload = {
      ...formData,
      isMember: true,
      timestamp: new Date().toISOString(),
    };

    // 1. Send data to server / Cloudflare Pages Function using keepalive
    try {
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(err => console.warn('Background submit error:', err));
    } catch (err) {
      console.warn('Dispatch error:', err);
    }

    // 2. Direct client-side forward to Google Sheets with keepalive as dual-failsafe
    if (sheetsWebhook && sheetsWebhook.startsWith('http')) {
      try {
        fetch(sheetsWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(err => console.warn('Direct sheets webhook warning:', err));
      } catch (err) {
        console.warn('Direct webhook warning:', err);
      }
    }

    // 3. Click and Go! Immediate sub-millisecond redirect to checkout link (No preview, no delay)
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = targetCheckout;
      } else {
        window.location.href = targetCheckout;
      }
    } catch {
      window.location.href = targetCheckout;
    }
  };

  const handleUpdateStatus = async (id: string, status: Submission['status']) => {
    try {
      await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, status } : s))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, notes } : s))
      );
    } catch (err) {
      console.error('Error updating notes:', err);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    try {
      await fetch(`/api/submissions/${id}`, {
        method: 'DELETE',
      });
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-slate-900 flex flex-col font-sans selection:bg-rose-500/20 selection:text-rose-900 overflow-x-hidden">
      {/* Main View Router */}
      <main className="flex-1">
        {currentStep === 'gateway' && (
          <GatewayView
            mentorName={config.mentorName}
            communityName={config.communityName}
            onSelectMembership={isMember => {
              if (isMember) {
                setCurrentStep('form');
              } else {
                setCurrentStep('non-member');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdmin={() => setCurrentStep('admin')}
          />
        )}

        {currentStep === 'non-member' && (
          <NonMemberView
            mentorName={config.mentorName}
            communityName={config.communityName}
            joinUrl={config.communityJoinUrl}
            onGoBack={() => {
              setCurrentStep('gateway');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onProceedAnyway={() => {
              setCurrentStep('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'form' && (
          <MemberFormView
            mentorName={config.mentorName}
            communityName={config.communityName}
            onSubmit={handleSubmitForm}
            isSubmitting={isSubmitting}
            onGoBack={() => {
              setCurrentStep('gateway');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'success' && (
          <SuccessView
            submission={lastSubmission}
            config={config}
            onReset={() => {
              setCurrentStep('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdmin={() => {
              setCurrentStep('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'admin' && (
          <AdminPortal
            submissions={submissions}
            config={config}
            onUpdateStatus={handleUpdateStatus}
            onUpdateNotes={handleUpdateNotes}
            onDeleteSubmission={handleDeleteSubmission}
            onRefresh={fetchSubmissions}
            onOpenSettings={() => setShowConfigModal(true)}
            onBackToForm={() => {
              setCurrentStep('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Discreet Footer */}
      <footer className="py-6 border-t border-slate-200/60 text-center text-xs text-slate-400">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-center">
          <span>{config.mentorName} · 1-on-1 Relationship Mentorship</span>
        </div>
      </footer>

      {/* Settings Modal */}
      <ConfigModal
        config={config}
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSave={handleUpdateConfig}
      />
    </div>
  );
}
