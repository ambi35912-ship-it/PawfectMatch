import React, { useState } from 'react';
import { MapPin, Sparkles, ShieldCheck, ChevronUp, Zap, Heart, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PetCard({
  pet,
  dragX,
  isTopCard = false,
  onOpenDetails,
  stampStatus = null // 'like' | 'pass' | 'superlike' | null
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = pet.photos && pet.photos.length > 0 ? pet.photos : [pet.primaryPhoto];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl select-none bg-slate-900 flex flex-col justify-end border border-white/20">
      
      {/* Background Pet Image */}
      <img
        src={photos[photoIndex]}
        alt={pet.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-300"
        draggable={false}
      />

      {/* Multi-photo tap regions */}
      {isTopCard && photos.length > 1 && (
        <div className="absolute inset-0 z-10 flex">
          <div
            className="w-1/2 h-4/5 cursor-pointer"
            onClick={handlePrevPhoto}
            aria-label="Previous photo"
          />
          <div
            className="w-1/2 h-4/5 cursor-pointer"
            onClick={handleNextPhoto}
            aria-label="Next photo"
          />
        </div>
      )}

      {/* Photo Carousel Indicators at Top */}
      {photos.length > 1 && (
        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5 pointer-events-none">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                i === photoIndex ? 'bg-white shadow-sm' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Top Floating Badges */}
      <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Compatibility Score */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-black tracking-tight text-white">
            {pet.compatibility}% Match
          </span>
        </div>

        {/* Verified Vaccine Shield */}
        {pet.vaccinated && (
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-[11px] font-bold shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Health Verified</span>
          </div>
        )}
      </div>

      {/* Swipe Stamp Indicators (Dynamic Feedback) */}
      {isTopCard && (
        <>
          {/* LIKE Stamp */}
          <div
            id="stamp-like"
            className="absolute top-20 left-6 z-30 pointer-events-none border-[3.5px] border-emerald-400 text-emerald-400 font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl -rotate-12 uppercase tracking-wider shadow-lg bg-emerald-950/30 backdrop-blur-xs opacity-0 transition-opacity duration-75"
          >
            LIKE
          </div>

          {/* PASS Stamp */}
          <div
            id="stamp-pass"
            className="absolute top-20 right-6 z-30 pointer-events-none border-[3.5px] border-rose-500 text-rose-500 font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl rotate-12 uppercase tracking-wider shadow-lg bg-rose-950/30 backdrop-blur-xs opacity-0 transition-opacity duration-75"
          >
            PASS
          </div>
        </>
      )}

      {/* Subtle Gradient Scrim at Bottom for clean readability */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />

      {/* Bottom Pet Information Content */}
      <div className="relative z-20 p-5 sm:p-6 text-white pointer-events-none">
        
        {/* Name, Age, Gender */}
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
            {pet.name}
          </h2>
          <span className="text-xl sm:text-2xl font-light text-white/90">
            {pet.age}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
            {pet.gender}
          </span>
        </div>

        {/* Breed & Distance */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-white/80 mt-1">
          <span className="font-semibold text-white/95">{pet.breed}</span>
          <span>•</span>
          <div className="flex items-center gap-1 text-white/90">
            <MapPin className="w-3.5 h-3.5 text-coral-400 shrink-0" />
            <span>{pet.distance}</span>
          </div>
        </div>

        {/* Play Style Quote / Headline */}
        {pet.playStyle && (
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/95">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate font-medium">
              Prefers: <span className="font-bold">{pet.playStyle}</span>
            </span>
          </div>
        )}

        {/* Personality Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {pet.personality?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/10"
            >
              #{tag}
            </span>
          ))}
          {pet.personality && pet.personality.length > 3 && (
            <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white/80">
              +{pet.personality.length - 3} more
            </span>
          )}
        </div>

        {/* Expand Details Trigger */}
        <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between pointer-events-auto">
          <span className="text-[11px] text-white/70 flex items-center gap-1 font-medium">
            <ChevronUp className="w-3.5 h-3.5 animate-bounce text-coral-400" />
            Tap or swipe up for full pet profile
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(pet);
            }}
            className="text-xs font-bold text-coral-300 hover:text-coral-200 underline decoration-coral-400/50 underline-offset-2 py-1 px-2"
          >
            View Details
          </button>
        </div>

      </div>

    </div>
  );
}
