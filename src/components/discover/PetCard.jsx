import React, { useState } from 'react';
import { MapPin, Sparkles, ShieldCheck, ChevronUp, Zap, Heart, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PetCard({
  pet,
  isTopCard = false,
  onOpenDetails,
  likeOpacity,
  likeScale,
  nopeOpacity,
  nopeScale,
  superLikeOpacity,
  superLikeScale
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
    <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl select-none bg-slate-900 flex flex-col justify-end border border-white/10">
      
      {/* Full Bleed Pet Photo */}
      <img
        src={photos[photoIndex]}
        alt={pet.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
        draggable={false}
      />

      {/* Multi-photo tap regions (top 60% only to avoid conflicting with swipe and profile buttons) */}
      {isTopCard && photos.length > 1 && (
        <div className="absolute inset-x-0 top-0 h-3/5 z-10 flex">
          <div
            className="w-1/2 h-full cursor-pointer"
            onClick={handlePrevPhoto}
            aria-label="Previous photo"
          />
          <div
            className="w-1/2 h-full cursor-pointer"
            onClick={handleNextPhoto}
            aria-label="Next photo"
          />
        </div>
      )}

      {/* Photo Carousel Indicators at Top */}
      {photos.length > 1 && (
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-1.5 pointer-events-none">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                i === photoIndex ? 'bg-white shadow-md' : 'bg-black/40 backdrop-blur-xs'
              }`}
            />
          ))}
        </div>
      )}

      {/* Top Floating Badges */}
      <div className="absolute top-7 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Compatibility Score */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-black tracking-tight text-white">
            {pet.compatibility}% Match
          </span>
        </div>

        {/* Verified Vaccine Shield */}
        {pet.vaccinated && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/75 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-[11px] font-bold shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Health Verified</span>
          </div>
        )}
      </div>

      {/* Dynamic Tinder Stamp Indicators (Bound to Motion Values) */}
      {isTopCard && (
        <>
          {/* LIKE Stamp (Top-Left, Emerald Green) */}
          <motion.div
            style={{
              opacity: likeOpacity || 0,
              scale: likeScale || 1
            }}
            className="absolute top-14 left-6 z-30 pointer-events-none border-[4px] border-[#20d592] text-[#20d592] font-black text-3xl sm:text-4xl px-4 py-1.5 rounded-2xl -rotate-15 uppercase tracking-widest shadow-2xl bg-emerald-950/30 backdrop-blur-xs"
          >
            LIKE
          </motion.div>

          {/* NOPE Stamp (Top-Right, Tinder Red) */}
          <motion.div
            style={{
              opacity: nopeOpacity || 0,
              scale: nopeScale || 1
            }}
            className="absolute top-14 right-6 z-30 pointer-events-none border-[4px] border-[#ff4458] text-[#ff4458] font-black text-3xl sm:text-4xl px-4 py-1.5 rounded-2xl rotate-15 uppercase tracking-widest shadow-2xl bg-rose-950/30 backdrop-blur-xs"
          >
            NOPE
          </motion.div>

          {/* SUPER LIKE Stamp (Center-Top, Electric Blue) */}
          <motion.div
            style={{
              opacity: superLikeOpacity || 0,
              scale: superLikeScale || 1
            }}
            className="absolute top-20 inset-x-0 mx-auto w-max z-30 pointer-events-none border-[4px] border-[#2db1ff] text-[#2db1ff] font-black text-xl sm:text-2xl px-4 py-1 rounded-2xl uppercase tracking-widest shadow-2xl bg-sky-950/40 backdrop-blur-xs flex items-center gap-1.5"
          >
            <span>★</span> SUPER LIKE
          </motion.div>
        </>
      )}

      {/* Cinematic Gradient Scrim at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

      {/* Bottom Pet Profile Content */}
      <div className="relative z-20 p-4 sm:p-5 text-white pointer-events-none">
        
        {/* Name, Age, Gender & Info Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
              {pet.name}
            </h2>
            <span className="text-xl sm:text-2xl font-light text-white/90">
              {pet.age}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
              {pet.gender}
            </span>
          </div>

          {/* Up arrow to view full profile (interactive) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(pet);
            }}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90 shadow-md cursor-pointer"
            title="Open full profile"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Breed & Distance */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80 mt-1">
          <span className="font-semibold text-white/95">{pet.breed}</span>
          <span>•</span>
          <div className="flex items-center gap-1 text-white/90">
            <MapPin className="w-3.5 h-3.5 text-coral-400 shrink-0" />
            <span>{pet.distance}</span>
          </div>
        </div>

        {/* Play Style Headline */}
        {pet.playStyle && (
          <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/95">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate font-medium">
              Prefers: <span className="font-bold">{pet.playStyle}</span>
            </span>
          </div>
        )}

        {/* Personality Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {pet.personality?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/10"
            >
              #{tag}
            </span>
          ))}
          {pet.personality && pet.personality.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white/80">
              +{pet.personality.length - 3}
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
