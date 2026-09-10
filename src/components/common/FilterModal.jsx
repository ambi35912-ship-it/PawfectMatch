import React from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

export default function FilterModal({ isOpen, onClose, filters, setFilters }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-200 border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-warm-100">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Discovery Filters
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Refine compatible playmates for Milo
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="py-5 space-y-6">
          
          {/* Species */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Pet Species
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Pets', emoji: '🐾' },
                { id: 'dogs', label: 'Dogs Only', emoji: '🐕' },
                { id: 'cats', label: 'Cats Only', emoji: '🐈' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilters({ ...filters, species: item.id })}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    filters.species === item.id
                      ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-sm'
                      : 'border-warm-200 bg-warm-50/50 text-slate-600 hover:bg-warm-100'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Maximum Distance
              </label>
              <span className="text-xs font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full">
                Within {filters.maxDistance} km
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={filters.maxDistance}
              onChange={(e) => setFilters({ ...filters, maxDistance: Number(e.target.value) })}
              className="w-full accent-coral-500 h-2 bg-warm-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>1 km</span>
              <span>12 km</span>
              <span>25 km</span>
            </div>
          </div>

          {/* Energy Match */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Energy & Play Tempo
            </label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Calm & Gentle', 'Moderate', 'High Energy', 'Endless Zoomies'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilters({ ...filters, energy: lvl })}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    filters.energy === lvl
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-warm-50 text-slate-600 border-warm-200 hover:bg-warm-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Size Class */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Size Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'Any Size' },
                { id: 'small', label: 'Small (<25lb)' },
                { id: 'medium', label: 'Medium' },
                { id: 'large', label: 'Large (50lb+)' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFilters({ ...filters, size: s.id })}
                  className={`p-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                    filters.size === s.id
                      ? 'border-coral-500 bg-coral-50 text-coral-600'
                      : 'border-warm-200 bg-warm-50/50 text-slate-600'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Health Verified Only Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Verified Vaccinations Only
                </div>
                <div className="text-[10px] text-slate-500">
                  Rabies and core shots verified with veterinary clinic
                </div>
              </div>
            </div>
            <button
              onClick={() => setFilters({ ...filters, verifiedVaccinated: !filters.verifiedVaccinated })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                filters.verifiedVaccinated ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  filters.verifiedVaccinated ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-warm-100 flex items-center gap-3">
          <button
            onClick={() => setFilters({ species: 'all', maxDistance: 10, energy: 'All', size: 'all', verifiedVaccinated: true })}
            className="px-4 py-3 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white text-sm font-extrabold shadow-lg shadow-coral-500/25 transition-all active:scale-[0.98]"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}
