import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Star, CheckCircle, Navigation, ShieldCheck, Sun, Info } from 'lucide-react';

export default function PlaydatesView({
  playdates,
  spots,
  onOpenScheduleModal,
  onSelectSpot,
  onNavigate,
  onViewSpotDetails
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'spots'

  return (
    <div className="flex-1 min-h-0 flex flex-col p-4 max-w-md mx-auto w-full overflow-y-auto no-scrollbar pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Playdates & Spots
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organized meetups & top-rated local parks
          </p>
        </div>

        <button
          onClick={() => onOpenScheduleModal()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs shadow-md shadow-coral-500/25 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Playdate</span>
        </button>
      </div>

      {/* Segmented Switcher */}
      <div className="flex p-1 rounded-2xl bg-warm-200/60 mb-4 shrink-0">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Scheduled ({playdates.length})
        </button>
        <button
          onClick={() => setActiveTab('spots')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'spots'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Pet-Friendly Spots ({spots.length})
        </button>
      </div>

      {/* Content depending on tab */}
      {activeTab === 'upcoming' ? (
        <div className="space-y-3.5">
          {playdates.map((pd) => (
            <div
              key={pd.id}
              className="p-4 rounded-3xl bg-white border border-warm-200/80 shadow-card hover:shadow-card-hover transition-all shrink-0"
            >
              {/* Top status & weather */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-warm-100">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    pd.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  }`}
                >
                  <CheckCircle className="w-3 h-3" />
                  {pd.status}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{pd.weather}</span>
                </div>
              </div>

              {/* Title & Pet */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {pd.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    with <strong>{pd.petName}</strong> ({pd.petBreed}) & {pd.ownerName}
                  </div>
                </div>

                <img
                  src={pd.petAvatar}
                  alt={pd.petName}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-coral-500/80 shrink-0"
                />
              </div>

              {/* Date, Time & Location */}
              <div className="mt-3.5 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-coral-500 shrink-0" />
                  <span>{pd.date} • {pd.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{pd.locationName} ({pd.address})</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-warm-100">
                {pd.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-warm-50 text-slate-600 text-[10px] font-semibold border border-warm-200/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onViewSpotDetails({
                    name: pd.locationName,
                    address: pd.address,
                    title: pd.title,
                    dateTime: `${pd.date} • ${pd.time}`,
                    status: pd.status,
                    partnerName: pd.petName,
                    partnerOwner: pd.ownerName
                  })}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                  title="View full park and playdate details"
                >
                  <Info className="w-3.5 h-3.5 text-slate-600" />
                  <span>More Info</span>
                </button>
                <button
                  onClick={() => onNavigate({ name: pd.locationName, address: pd.address })}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Navigate</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Spots tab */
        <div className="space-y-4">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="rounded-3xl bg-white border border-warm-200/80 overflow-hidden shadow-card group shrink-0"
            >
              {/* Photo */}
              <div
                onClick={() => onViewSpotDetails(spot)}
                className="relative h-36 w-full overflow-hidden bg-slate-800 cursor-pointer"
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {spot.type}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[11px] shadow-md">
                  <Star className="w-3 h-3 fill-slate-950 stroke-none" />
                  <span>{spot.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-baseline justify-between cursor-pointer" onClick={() => onViewSpotDetails(spot)}>
                  <h3 className="text-sm font-extrabold text-slate-900 hover:text-coral-600 transition-colors">
                    {spot.name}
                  </h3>
                  <span className="text-xs font-bold text-coral-600 shrink-0">
                    {spot.distance}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{spot.address}</span>
                </div>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {spot.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-warm-50 text-slate-700 text-[10px] font-semibold border border-warm-200/60"
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                </div>

                {/* Schedule here & Navigate buttons */}
                <div className="flex gap-2 mt-3.5">
                  <button
                    onClick={() => onNavigate(spot)}
                    className="py-2 px-3 rounded-xl bg-warm-100 hover:bg-warm-200 font-bold text-xs text-slate-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-slate-600" />
                    <span>Map</span>
                  </button>

                  <button
                    onClick={() => onSelectSpot(spot)}
                    className="flex-1 py-2 px-3 rounded-xl bg-coral-50 hover:bg-coral-100 hover:text-coral-700 border border-coral-200 font-bold text-xs text-coral-600 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-coral-500" />
                    <span>Propose Playdate Here</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
