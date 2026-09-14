import React, { useState } from 'react';
import { X, Scale, Sparkles } from 'lucide-react';

export default function LogWeightModal({ isOpen, onClose, onSaveWeight, currentWeight }) {
  const [weightVal, setWeightVal] = useState(parseFloat(currentWeight) || 68.0);
  const [monthName, setMonthName] = useState('Apr');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weightVal) return;
    onSaveWeight({
      month: monthName,
      weight: parseFloat(weightVal)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600">
                Wellness Log
              </span>
              <h3 className="text-base font-black text-slate-900">
                Log Pet Weight
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

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          
          {/* Weight Input */}
          <div className="text-center py-2">
            <span className="text-xs font-bold text-slate-400 block mb-1">New Measurement</span>
            <div className="flex items-baseline justify-center gap-1.5">
              <input
                type="number"
                step="0.1"
                min="2"
                max="200"
                required
                value={weightVal}
                onChange={(e) => setWeightVal(e.target.value)}
                className="w-32 text-center text-4xl font-black text-slate-900 border-b-2 border-coral-500 focus:outline-none py-1"
              />
              <span className="text-lg font-bold text-slate-400">lbs</span>
            </div>
          </div>

          {/* Quick Adjust Buttons */}
          <div className="flex justify-center gap-2">
            {[-1, -0.5, +0.5, +1].map((delta) => (
              <button
                type="button"
                key={delta}
                onClick={() => setWeightVal((prev) => +(parseFloat(prev) + delta).toFixed(1))}
                className="px-2.5 py-1 rounded-xl bg-warm-100 hover:bg-warm-200 text-xs font-bold text-slate-700"
              >
                {delta > 0 ? `+${delta}` : delta}
              </button>
            ))}
          </div>

          {/* Month Entry */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Timeline Label (Month)
            </label>
            <input
              type="text"
              required
              value={monthName}
              onChange={(e) => setMonthName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-coral-500/25 transition-all"
            >
              Update Weight Trendline
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
