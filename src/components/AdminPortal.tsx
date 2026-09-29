import React, { useState } from 'react';
import { Submission, FunnelConfig } from '../types';
import { Download, Sliders, Search, Trash2, Eye, Heart, RefreshCw, X } from 'lucide-react';

interface AdminPortalProps {
  submissions: Submission[];
  config: FunnelConfig;
  onUpdateStatus: (id: string, status: Submission['status']) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
  onDeleteSubmission: (id: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onOpenSettings: () => void;
  onBackToForm?: () => void;
  isLoading: boolean;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  submissions,
  config,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteSubmission,
  onRefresh,
  onOpenSettings,
  onBackToForm,
  isLoading
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [activeNoteText, setActiveNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const filtered = submissions.filter(s => {
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesSearch =
      !search ||
      s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.location?.toLowerCase().includes(search.toLowerCase()) ||
      s.breakthroughVision?.toLowerCase().includes(search.toLowerCase()) ||
      s.currentJourney?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (sub: Submission) => {
    setSelectedSub(sub);
    setActiveNoteText(sub.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedSub) return;
    setSavingNote(true);
    await onUpdateNotes(selectedSub.id, activeNoteText);
    setSelectedSub(prev => prev ? { ...prev, notes: activeNoteText } : null);
    setSavingNote(false);
  };

  const statusColors: Record<Submission['status'], string> = {
    New: 'text-rose-800 bg-rose-50 border-rose-200',
    Reviewing: 'text-amber-800 bg-amber-50 border-amber-200',
    Scheduled: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    Completed: 'text-purple-800 bg-purple-50 border-purple-200',
    Archived: 'text-slate-700 bg-slate-100 border-slate-200'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-widest mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-100 text-rose-600" />
            <span>Relationship Mentorship Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif text-slate-900 tracking-tight">
            1-on-1 Relationship Applications & Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mentor: <strong className="text-slate-900">{config.mentorName} (Aditya Sir)</strong> · Community: <strong className="text-slate-900">{config.communityName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {onBackToForm && (
            <button
              onClick={onBackToForm}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              ← Back to Form
            </button>
          )}

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Refresh submissions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <a
            href="/api/export-csv"
            download
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={onOpenSettings}
            className="px-3 py-2 text-xs font-medium text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Funnel Settings</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, relationship challenge, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20"
          />
        </div>

        {/* Status segmented tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg overflow-x-auto text-xs">
          {['All', 'New', 'Reviewing', 'Scheduled', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-rose-700 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
          <p className="text-slate-500 text-sm">No relationship applications found matching criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(sub => (
            <div
              key={sub.id}
              className="bg-white border border-slate-200 hover:border-rose-300 rounded-xl p-4 sm:p-5 transition-all shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xs font-bold text-rose-800 font-serif">
                    {sub.fullName?.substring(0, 2).toUpperCase() || 'AD'}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <span>{sub.fullName || 'Anonymous'}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded border font-medium ${statusColors[sub.status] || 'text-slate-700 border-slate-300 bg-slate-100'}`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                      <span>{sub.email}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{sub.phone}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{sub.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sub.status}
                    onChange={e => onUpdateStatus(sub.id, e.target.value as Submission['status'])}
                    className="bg-white border border-slate-300 rounded-lg text-xs px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-rose-600 cursor-pointer"
                  >
                    <option value="New">Status: New</option>
                    <option value="Reviewing">Status: Reviewing</option>
                    <option value="Scheduled">Status: Scheduled</option>
                    <option value="Completed">Status: Completed</option>
                    <option value="Archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => handleOpenDetail(sub)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors cursor-pointer"
                    title="View full answers"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete application for ${sub.fullName}?`)) {
                        onDeleteSubmission(sub.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete submission"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Core snippet preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                <div>
                  <span className="text-slate-500 block">Relationship Dynamic:</span>
                  <span className="text-slate-800 font-medium">{sub.currentJourney}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Focal Breakthrough Area:</span>
                  <span className="text-rose-700 font-medium">{sub.breakthroughArea}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submissions Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-serif text-slate-900">{selectedSub.fullName}</h3>
                <p className="text-xs text-slate-500">
                  Application ID: <span className="font-mono text-rose-700 font-semibold">{selectedSub.id}</span> · Submitted {new Date(selectedSub.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-slate-500 block text-xs">Email</span>
                  <a href={`mailto:${selectedSub.email}`} className="text-rose-700 underline font-medium">{selectedSub.email}</a>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Phone</span>
                  <a href={`tel:${selectedSub.phone}`} className="text-rose-700 underline font-medium">{selectedSub.phone}</a>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Location</span>
                  <span className="text-slate-800 font-medium">{selectedSub.location}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">06. Current Relationship Situation</span>
                  <p className="text-slate-900">{selectedSub.currentJourney}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">07. Core Conflict Dynamic / Trigger That Hurts Most</span>
                  <p className="text-slate-900">{selectedSub.breakthroughArea}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">08. Duration of Pattern & Emotional Toll</span>
                  <p className="text-slate-900">{selectedSub.untappedPotential}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">09. Previous DIY Attempts & Need for Neutral Mentorship</span>
                  <p className="text-slate-900">{selectedSub.readyForDirection}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">10. Deepest Fear If Nothing Changes (Cost of Inaction)</span>
                  <p className="text-slate-900">{selectedSub.committedToRoadmap}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">11. Readiness to Drop Ego & Look at Root Causes</span>
                  <p className="text-slate-900">{selectedSub.investEnergy}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">12. Why Aditya Sir (Personal Trust & Resonance)</span>
                  <p className="text-slate-900 whitespace-pre-wrap">{selectedSub.whyMentor}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block font-medium mb-1">13. The Raw Truth: Recent Trigger Incident & Desired Peace</span>
                  <p className="text-slate-900 whitespace-pre-wrap">{selectedSub.breakthroughVision}</p>
                </div>

                {selectedSub.preferredSlot && (
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-500 block font-medium mb-1">Preferred Timing Window</span>
                    <p className="text-slate-900">{selectedSub.preferredSlot}</p>
                  </div>
                )}
              </div>

              {/* Private Mentor Notes */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Internal Mentor Notes
                </label>
                <textarea
                  rows={3}
                  value={activeNoteText}
                  onChange={e => setActiveNoteText(e.target.value)}
                  placeholder="Case notes on attachment dynamics, emotional triggers, communication framework..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNote}
                    className="px-4 py-2 text-xs font-medium text-white bg-rose-700 hover:bg-rose-800 rounded-md transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {savingNote ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
