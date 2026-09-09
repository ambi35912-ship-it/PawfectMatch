import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check } from 'lucide-react';

export default function RescheduleModal({ isOpen, onClose, playdate, onConfirmReschedule }) {
  if (!isOpen || !playdate) return null;

  const [date, setDate] = useState('Sunday, Mar 15');
  const [time, setTime] = useState('11:00 AM - 12:30 PM');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmReschedule({
      ...playdate,
      dateTime: `${date} • ${time}`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600">
              Propose New Time
            </span>
            <h3 className="text-base font-black text-slate-900">
              Reschedule Playdate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Suggested Meetup Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Sunday, Mar 15', 'Saturday, Mar 21', 'Sunday, Mar 22', 'Next Tuesday'].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDate(d)}
                  className={`py-2 px-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
                    date === d
                      ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-xs'
                      : 'border-warm-200 bg-warm-50 text-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['9:30 AM - 11:00 AM', '11:00 AM - 12:30 PM', '3:30 PM - 5:00 PM', '5:00 PM - 6:30 PM'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`py-2 px-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
                    time === t
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-warm-200 bg-warm-50 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-warm-50 border border-warm-200/70 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-coral-500 inline mr-1" />
            <span>Venue remains at: <strong>{playdate.location || 'Alta Plaza Off-Leash Dog Park'}</strong></span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Send Counter-Proposal
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
