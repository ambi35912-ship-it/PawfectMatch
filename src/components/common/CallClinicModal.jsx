import React, { useState, useEffect } from 'react';
import { X, Phone, PhoneCall, PhoneOff, Mic, MicOff, Volume2, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function CallClinicModal({ isOpen, onClose, appointment }) {
  if (!isOpen) return null;

  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    let timer;
    if (isCalling) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isCalling]);

  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const clinicName = appointment?.clinic || 'Cessna Lifeline Veterinary Hospital';
  const doctor = appointment?.doctor || 'Dr. Priya Sharma, BVSc & AH';
  const phoneNum = '+91 80 4115 1234';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Veterinary Clinic Contact
              </span>
              <h3 className="text-base font-black text-slate-900 truncate">
                {clinicName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Call Simulator Screen */}
        {isCalling ? (
          <div className="py-8 text-center bg-slate-950 rounded-3xl my-4 text-white p-6 shadow-inner">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse mb-3">
              <PhoneCall className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-black text-white tracking-tight">
              {clinicName}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">{phoneNum}</p>
            <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white/10 text-emerald-300 font-mono text-xs font-bold">
              Connected • {formatCallTime(callDuration)}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic">
              "Thank you for calling {clinicName}. How may we help Milo today?"
            </p>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isMuted ? 'bg-amber-500 text-white' : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCalling(false)}
                className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 transition-all active:scale-95"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsSpeaker(!isSpeaker)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isSpeaker ? 'bg-sky-500 text-white shadow-md' : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title={isSpeaker ? "Speaker On" : "Speaker Off"}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {/* Info Card */}
            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Primary Doctor</span>
                <span className="text-xs font-black text-slate-900">{doctor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Direct Phone</span>
                <span className="text-xs font-black text-coral-600">{phoneNum}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Clinic Hours</span>
                <span className="text-xs font-medium text-slate-700">Mon-Fri 8am-6pm, Sat 9am-2pm</span>
              </div>
              <div className="pt-2 border-t border-warm-200 text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-coral-500 shrink-0" />
                <span>{appointment?.address || '148, 1st Cross, Domlur 2nd Stage, Bengaluru, Karnataka 560071'}</span>
              </div>
            </div>

            {/* Calling Options */}
            <div className="space-y-2">
              {/* Direct Tel link for mobile devices */}
              <a
                href={`tel:${phoneNum.replace(/[^0-9]/g, '')}`}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly: {phoneNum}</span>
              </a>

              {/* In-app simulated test call */}
              <button
                type="button"
                onClick={() => setIsCalling(true)}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulate In-App Clinic Call</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
