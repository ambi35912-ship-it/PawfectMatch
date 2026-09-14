import React, { useState } from 'react';
import {
  X,
  Calendar,
  Mail,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Send,
  Share2
} from 'lucide-react';
import {
  downloadCalendarEvent,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateEmailInviteUrl
} from '../../utils/calendar';

export default function CalendarConnectorModal({ isOpen, onClose, event, onNotify }) {
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  if (!isOpen || !event) return null;

  const title = event.title || 'Pet Playdate';
  const location = event.location || event.address || 'Dog Play Area';
  const description = event.description || `Playdate scheduled on Pawfect Match with ${event.partnerName || 'Playmate'}`;
  const dateTime = event.dateTime || event.date || 'Upcoming this week';

  const handleOpenGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl({ title, description, location });
    window.open(url, '_blank', 'noopener,noreferrer');
    onNotify?.('Google Calendar Opened', 'Add the event to your Google Calendar', 'success');
  };

  const handleOpenOutlook = () => {
    const url = generateOutlookCalendarUrl({ title, description, location });
    window.open(url, '_blank', 'noopener,noreferrer');
    onNotify?.('Outlook Opened', 'Add the event to your Outlook Calendar', 'success');
  };

  const handleDownloadIcs = () => {
    downloadCalendarEvent({ title, description, location });
    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 2500);
    onNotify?.('Calendar File Downloaded 📅', `${title}.ics saved for Apple Calendar & iCal`, 'success');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const targetEmail = emailInput.trim();
    if (!targetEmail) return;

    // Trigger client mailto dispatch
    const mailtoUrl = generateEmailInviteUrl({
      recipientEmail: targetEmail,
      title,
      description,
      location,
      dateTime
    });
    
    // Open email client
    const mailWindow = window.open(mailtoUrl, '_blank');
    if (mailWindow) mailWindow.close();

    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3500);
    onNotify?.('Email Invite Dispatched ✉️', `Calendar invitation sent to ${targetEmail}`, 'sparkles');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[92vh] overflow-y-auto no-scrollbar space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-coral-500 text-white flex items-center justify-center shadow-md shadow-coral-500/20 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-coral-600">
                  Calendar Connector
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                  Multi-Sync
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                Add to Calendar & Send Invites
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Event Preview Card */}
        <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200/80 space-y-2">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-black text-slate-900 truncate pr-2">
              🐾 {title}
            </h4>
            <span className="text-[10px] font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full border border-coral-200/60 shrink-0">
              Playdate
            </span>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-coral-500 shrink-0" />
              <span className="font-semibold text-slate-800">{dateTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* One-Click Calendar Sync Channels */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Instant 1-Click Calendar Sync
          </label>

          <div className="grid grid-cols-1 gap-2">
            {/* Google Calendar */}
            <button
              onClick={handleOpenGoogleCalendar}
              className="w-full p-3 rounded-2xl bg-white hover:bg-warm-50 border border-warm-200 text-slate-900 font-extrabold text-xs flex items-center justify-between transition-all shadow-xs group active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
                  G
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900">Google Calendar</span>
                  <span className="text-[10px] font-normal text-slate-400">Open in browser & sync to Android / Gmail</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>

            {/* Apple Calendar / iCal */}
            <button
              onClick={handleDownloadIcs}
              className="w-full p-3 rounded-2xl bg-white hover:bg-warm-50 border border-warm-200 text-slate-900 font-extrabold text-xs flex items-center justify-between transition-all shadow-xs group active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm">
                  🍎
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900">Apple Calendar & iCal</span>
                  <span className="text-[10px] font-normal text-slate-400">Download .ics file for iPhone, Mac & iPad</span>
                </div>
              </div>
              {downloadedIcs ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Download className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
              )}
            </button>

            {/* Microsoft Outlook */}
            <button
              onClick={handleOpenOutlook}
              className="w-full p-3 rounded-2xl bg-white hover:bg-warm-50 border border-warm-200 text-slate-900 font-extrabold text-xs flex items-center justify-between transition-all shadow-xs group active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                  O
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900">Outlook / Office 365</span>
                  <span className="text-[10px] font-normal text-slate-400">Direct event compose in Outlook web</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Send Email To Add in Calendar */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-warm-50 via-white to-coral-50/40 border border-coral-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-coral-500" />
            <span className="text-xs font-black text-slate-900">
              Send Email to Add in Calendar
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Send an official calendar invite email to yourself or your playmate's owner with Google Calendar link and RSVP details:
          </p>

          <form onSubmit={handleSendEmail} className="flex gap-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="e.g. your-email@gmail.com"
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/40"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-coral-500/20 transition-all shrink-0 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Invite</span>
            </button>
          </form>

          {emailSent && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Calendar invite email opened & dispatched! Check your email.</span>
            </div>
          )}
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors"
        >
          Done
        </button>

      </div>
    </div>
  );
}
