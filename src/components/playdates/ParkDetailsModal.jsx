import React from 'react';
import { X, Star, MapPin, Navigation, Calendar, ShieldCheck, Check, Clock } from 'lucide-react';

export default function ParkDetailsModal({ isOpen, onClose, spot, onNavigate, onScheduleHere }) {
  if (!isOpen || !spot) return null;

  const parkAmenities = spot.amenities && spot.amenities.length > 0
    ? spot.amenities
    : ['Double Gated Entry', 'Fresh Water Fountain', 'Benches & Shade', 'Waste Bag Stations'];

  const parkImage = spot.image || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-warm-100 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Photo Header */}
        <div className="relative h-48 w-full bg-slate-800 shrink-0">
          <img src={parkImage} alt={spot.name || 'Dog Park'} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-coral-500 text-white inline-block mb-1">
              {spot.type || 'Fenced Dog Park'}
            </span>
            <h2 className="text-lg font-black tracking-tight drop-shadow-sm">
              {spot.name || 'Alta Plaza Dog Play Area'}
            </h2>
          </div>
        </div>

        {/* Playdate Meetup Banner if triggered from Chat or Playdate proposal */}
        {spot.playdateTitle && (
          <div className="bg-coral-50/90 border-b border-coral-200/70 px-4 py-3 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-coral-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                🐾
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-coral-600 block leading-tight">
                  Playdate Proposal Details
                </span>
                <h3 className="text-xs font-black text-slate-900 truncate">
                  {spot.playdateTitle}
                </h3>
                {spot.partnerName && (
                  <p className="text-[11px] text-slate-600 truncate">
                    With <strong>{spot.partnerName}</strong> {spot.partnerOwner ? `& ${spot.partnerOwner}` : ''}
                  </p>
                )}
                {spot.playdateDateTime && (
                  <p className="text-[10px] font-bold text-coral-700 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-coral-500" />
                    <span>{spot.playdateDateTime}</span>
                  </p>
                )}
              </div>
            </div>
            {spot.status && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-300/60 shrink-0">
                {spot.status}
              </span>
            )}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          
          {/* Quick Stats */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-warm-50 border border-warm-200/80">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-extrabold text-slate-900">{spot.rating || 4.9}</span>
              <span className="text-xs text-slate-500">({spot.reviewsCount || 184} pet parent reviews)</span>
            </div>
            <span className="text-xs font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full">
              {spot.distance || '0.9 mi'}
            </span>
          </div>

          {/* Address & Hours */}
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-900">{spot.address || 'Jackson St & Scott St, Pacific Heights'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{spot.popularHours || 'Open daily 6:00 AM - 10:00 PM'}</span>
            </div>
          </div>

          {/* Amenities checklist */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Park Features & Amenities
            </span>
            <div className="grid grid-cols-2 gap-2">
              {parkAmenities.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium p-2 rounded-xl bg-warm-50 border border-warm-100">
                  <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Review Snippet */}
          <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200/60">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-coral-500 text-white font-bold text-[10px] flex items-center justify-center">
                C
              </div>
              <span className="text-xs font-bold text-slate-900">Claire & Luna</span>
              <span className="text-[10px] text-slate-400">• Verified Visitor</span>
            </div>
            <p className="text-xs text-slate-600 italic">
              "Alta Plaza is our absolute favorite for high-speed fetch! Double gated entries make it super safe, and owners are always attentive."
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-warm-100 bg-white flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              onClose();
              onNavigate(spot);
            }}
            className="flex-1 py-3 rounded-2xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-slate-600" />
            <span>Navigate</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onScheduleHere(spot);
            }}
            className="flex-1 py-3 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-coral-500/25 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan Playdate Here</span>
          </button>
        </div>

      </div>
    </div>
  );
}
