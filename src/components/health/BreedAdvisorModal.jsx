import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Stethoscope, AlertTriangle, Calendar, Info, Clock } from 'lucide-react';
import { breedProfiles } from '../../data/breedHealthAdvisor';

export default function BreedAdvisorModal({ isOpen, onClose, currentBreed, onAddToCalendar }) {
  if (!isOpen) return null;

  const [selectedBreed, setSelectedBreed] = useState(currentBreed || 'Golden Retriever');
  const availableBreeds = Object.keys(breedProfiles).filter(b => b !== 'Default Dog');
  const profile = breedProfiles[selectedBreed] || breedProfiles['Golden Retriever'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                VCI Companion Health Advisor
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Breed Health & Vaccine Guide
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Breed Selector Chips */}
        <div className="py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select Breed Guide
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {availableBreeds.map((breed) => (
              <button
                key={breed}
                onClick={() => setSelectedBreed(breed)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedBreed === breed
                    ? 'bg-coral-500 border-coral-500 text-white shadow-xs'
                    : 'bg-warm-50 border-warm-200 text-slate-600 hover:bg-warm-100'
                }`}
              >
                {breed}
              </button>
            ))}
          </div>
        </div>

        {/* Breed Lifestyle & Predisposition Card */}
        <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200/80 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-extrabold text-slate-900">
              {selectedBreed} Clinical Profile
            </h3>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Guideline Verified
            </span>
          </div>

          <div className="text-xs text-slate-600 mb-3 leading-relaxed">
            <strong>Lifestyle Factor:</strong> {profile.lifestyleRisk}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Key Breed Health Watchpoints
            </span>
            <ul className="space-y-1">
              {profile.predispositions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Schedule Timeline */}
        <div className="space-y-2.5 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Recommended Preventive Milestones
          </span>

          {profile.recommendedCare.map((care) => (
            <div
              key={care.id}
              className="p-3.5 rounded-2xl bg-white border border-warm-200 shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-extrabold text-slate-900">
                  {care.title}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  care.urgency === 'high' ? 'bg-coral-50 text-coral-600 border border-coral-200' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  Due in {care.dueInDays} days
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                {care.reason}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-warm-100">
                <span>Frequency: <strong>{care.recommendedFrequency}</strong></span>
                <button
                  onClick={() => onAddToCalendar({
                    title: `Vet Reminder: ${care.title} for ${selectedBreed}`,
                    location: 'Veterinary Clinic',
                    description: care.reason
                  })}
                  className="font-bold text-coral-600 hover:text-coral-700 flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Set Calendar Reminder</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
        >
          Done
        </button>

      </div>
    </div>
  );
}
