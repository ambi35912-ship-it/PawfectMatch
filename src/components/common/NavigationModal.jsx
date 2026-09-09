import React from 'react';
import { X, MapPin, Navigation, Car, Footprints, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

export default function NavigationModal({ isOpen, onClose, destination }) {
  if (!isOpen || !destination) return null;

  const encodedAddress = encodeURIComponent(`${destination.name || destination.locationName}, ${destination.address}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodedAddress}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600">
                Turn-by-Turn Navigation
              </span>
              <h3 className="text-base font-black text-slate-900 truncate max-w-[240px]">
                {destination.name || destination.locationName}
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

        {/* Route Preview Card */}
        <div className="my-4 p-4 rounded-2xl bg-warm-50/80 border border-warm-200/80">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">
                {destination.address}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {destination.distance || '0.9 mi from Marina District, SF'}
              </div>
            </div>
          </div>

          {/* Transit Estimates */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-warm-200/60">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-warm-200/60">
              <Car className="w-4 h-4 text-slate-700" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Driving</span>
                <span className="text-xs font-black text-slate-900">~6 mins</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-warm-200/60">
              <Footprints className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Dog Walk</span>
                <span className="text-xs font-black text-slate-900">~18 mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Park & Off-leash Notice */}
        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-slate-700 mb-4 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pet Amenities at Location:</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Fenced perimeter, dog water fountains, waste disposal stations, and shade trees available on site.
          </p>
        </div>

        {/* Live Map Link Buttons */}
        <div className="space-y-2 pt-1">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-coral-500/25 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <span>Open in Apple Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

      </div>
    </div>
  );
}
