import React, { useState } from 'react';
import { X, Bell, Check, Sparkles, Calendar, MessageCircle, Pill } from 'lucide-react';

export default function NotificationSettingsModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [settings, setSettings] = useState({
    matches: true,
    playdates: true,
    messages: true,
    medications: true,
    healthAlerts: false
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items = [
    { id: 'matches', title: 'New Playmate Matches', desc: 'Alert immediately when another pet parent likes your pet', icon: Sparkles },
    { id: 'playdates', title: 'Playdate RSVPs & Changes', desc: 'Updates when meetups are confirmed or rescheduled', icon: Calendar },
    { id: 'messages', title: 'Direct Messages', desc: 'Instant chat messages from fellow pet parents', icon: MessageCircle },
    { id: 'medications', title: 'Medication & Chewable Reminders', desc: 'Monthly NexGard & daily supplement alerts', icon: Pill },
  ];

  const handleSave = () => {
    onSave?.(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" />
              Notifications & Alerts
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Alert Preferences
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toggles */}
        <div className="py-4 space-y-3">
          {items.map((item) => {
            const Icon = item.icon;
            const isEnabled = settings[item.id];
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200/70 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white text-coral-500 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    isEnabled ? 'bg-coral-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all active:scale-95"
          >
            Save Notification Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
