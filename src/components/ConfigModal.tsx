import React, { useState } from 'react';
import { FunnelConfig } from '../types';
import { X, Save, Sliders, CheckCircle2 } from 'lucide-react';

interface ConfigModalProps {
  config: FunnelConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<FunnelConfig>) => Promise<void>;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<FunnelConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-semibold text-slate-900">Relationship Funnel & Integrations</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Mentor Name
            </label>
            <input
              type="text"
              value={formData.mentorName}
              onChange={e => setFormData({ ...formData, mentorName: e.target.value })}
              className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
              placeholder="Aditya Thakare"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Community Name
            </label>
            <input
              type="text"
              value={formData.communityName}
              onChange={e => setFormData({ ...formData, communityName: e.target.value })}
              className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
              placeholder="Monkhood"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Community Join URL (for Non-Members)
            </label>
            <input
              type="url"
              value={formData.communityJoinUrl}
              onChange={e => setFormData({ ...formData, communityJoinUrl: e.target.value })}
              className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
              placeholder="https://join.monkhoodclub.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Razorpay Checkout / Payment URL
            </label>
            <input
              type="url"
              value={formData.checkoutUrl}
              onChange={e => setFormData({ ...formData, checkoutUrl: e.target.value })}
              className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
              placeholder="https://rzp.io/l/aditya-thakare-session"
            />
            <p className="text-xs text-slate-500 mt-1">
              Participants will be directed to this link to lock in their slot after qualifying.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Google Sheets Webhook URL (Optional)
            </label>
            <input
              type="url"
              value={formData.googleSheetsWebhook}
              onChange={e => setFormData({ ...formData, googleSheetsWebhook: e.target.value })}
              className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
              placeholder="https://script.google.com/macros/s/.../exec"
            />
            <p className="text-xs text-slate-500 mt-1">
              Google Apps Script or Zapier webhook to auto-record submissions in a spreadsheet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Session Duration
              </label>
              <input
                type="text"
                value={formData.sessionDuration}
                onChange={e => setFormData({ ...formData, sessionDuration: e.target.value })}
                className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
                placeholder="30 Minutes"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Notification Email
              </label>
              <input
                type="email"
                value={formData.notificationEmail}
                onChange={e => setFormData({ ...formData, notificationEmail: e.target.value })}
                className="w-full bg-white border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 rounded-lg px-3.5 py-2 text-slate-900 text-sm focus:outline-none"
                placeholder="monkhoodlife@gmail.com"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
