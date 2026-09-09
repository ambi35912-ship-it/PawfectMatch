import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Sparkles, Dog } from 'lucide-react';

export default function ScheduleModal({
  isOpen,
  onClose,
  matches,
  spots,
  preselectedPet,
  preselectedSpot,
  onSavePlaydate
}) {
  if (!isOpen) return null;

  const [selectedPetId, setSelectedPetId] = useState(
    preselectedPet ? preselectedPet.id || preselectedPet.petId : (matches[0]?.id || '')
  );
  const [selectedSpotId, setSelectedSpotId] = useState(
    preselectedSpot ? preselectedSpot.id : (spots[0]?.id || '')
  );
  const [selectedDay, setSelectedDay] = useState('Saturday, Mar 14');
  const [selectedTime, setSelectedTime] = useState('10:00 AM - 11:30 AM');
  const [playStyle, setPlayStyle] = useState('High-Energy Fetch & Zoomies');
  const [customNote, setCustomNote] = useState('');

  const targetPet = matches.find((m) => (m.id === selectedPetId || m.petId === selectedPetId)) || matches[0];
  const targetSpot = spots.find((s) => s.id === selectedSpotId) || spots[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlaydate = {
      id: `pd_${Date.now()}`,
      petName: targetPet ? (targetPet.petName || targetPet.name) : 'Luna',
      petBreed: targetPet ? targetPet.breed : 'Australian Shepherd',
      petAvatar: targetPet ? (targetPet.avatar || targetPet.primaryPhoto) : '',
      ownerName: targetPet?.ownerName || 'Pet Parent',
      title: playStyle,
      date: selectedDay,
      time: selectedTime,
      locationName: targetSpot?.name || 'Local Dog Park',
      address: targetSpot?.address || 'San Francisco, CA',
      status: 'Confirmed',
      tags: ['Fenced Dog Park', 'Water Station', 'Fresh Air'],
      weather: '65°F • Pleasant'
    };

    onSavePlaydate(newPlaydate, targetPet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-warm-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coral-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Propose Playdate
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Schedule Pet Meetup
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-5">
          
          {/* Select Playmate */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              1. Choose Playmate
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {matches.map((m) => {
                const isSelected = (m.id === selectedPetId || m.petId === selectedPetId);
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setSelectedPetId(m.id)}
                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all shrink-0 ${
                      isSelected
                        ? 'border-coral-500 bg-coral-50 text-coral-600 ring-1 ring-coral-400 shadow-xs'
                        : 'border-warm-200 bg-warm-50 text-slate-600'
                    }`}
                  >
                    <img
                      src={m.avatar}
                      alt={m.petName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="text-xs font-extrabold text-slate-900 leading-tight">
                        {m.petName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {m.breed}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Venue */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              2. Select Dog-Friendly Location
            </label>
            <div className="space-y-2">
              {spots.slice(0, 3).map((spot) => {
                const isSelected = spot.id === selectedSpotId;
                return (
                  <button
                    type="button"
                    key={spot.id}
                    onClick={() => setSelectedSpotId(spot.id)}
                    className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'border-coral-500 bg-coral-50/70 shadow-xs'
                        : 'border-warm-200/80 bg-warm-50/50 hover:bg-warm-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-slate-900 truncate">
                          {spot.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <span>{spot.type}</span>
                          <span>•</span>
                          <span className="text-coral-600 font-semibold">{spot.distance}</span>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-coral-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day & Time Quick Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              3. Date & Time
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {['Saturday, Mar 14', 'Sunday, Mar 15', 'Next Wednesday'].map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-xl text-center border transition-all ${
                    selectedDay === day
                      ? 'border-coral-500 bg-coral-500 text-white shadow-sm'
                      : 'border-warm-200 bg-warm-50 text-slate-600'
                  }`}
                >
                  {day.split(',')[0]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {['10:00 AM - 11:30 AM', '4:30 PM - 6:00 PM'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-2 text-[11px] font-bold rounded-xl text-center border transition-all ${
                    selectedTime === t
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-warm-200 bg-warm-50 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Play Style */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              4. Play Activity Focus
            </label>
            <select
              value={playStyle}
              onChange={(e) => setPlayStyle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
            >
              <option value="High-Energy Fetch & Zoomies">High-Energy Fetch & Zoomies</option>
              <option value="Gentle Sniff & Parallel Walk">Gentle Sniff & Parallel Walk</option>
              <option value="Dog Beach Splash & Sprint">Dog Beach Splash & Sprint</option>
              <option value="Dog Patio Cafe Coffee Hangout">Dog Patio Cafe Coffee Hangout</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-sm shadow-lg shadow-coral-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Send Playdate Invitation</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
