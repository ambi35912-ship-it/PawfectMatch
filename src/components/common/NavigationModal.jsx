import React from 'react';
import { X, Navigation, ShieldCheck } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function NavigationModal({ isOpen, onClose, destination }) {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-5 shadow-2xl border border-warm-100 max-h-[92vh] overflow-y-auto no-scrollbar space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-500 text-white flex items-center justify-center shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-coral-600">
                Live Interactive Map & Route
              </span>
              <h3 className="text-sm font-black text-slate-900 truncate max-w-[240px]">
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

        {/* Embedded Interactive Map */}
        <InteractiveMap destination={destination} />

      </div>
    </div>
  );
}
