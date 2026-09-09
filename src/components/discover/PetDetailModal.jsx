import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  ShieldCheck,
  Zap,
  Calendar,
  Heart,
  MessageCircle,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  Activity,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PetDetailModal({
  pet,
  isOpen,
  onClose,
  onLike,
  onPass,
  onSchedulePlaydate,
  onViewCertificate
}) {
  if (!isOpen || !pet) return null;

  const [activePhoto, setActivePhoto] = useState(0);
  const photos = pet.photos && pet.photos.length > 0 ? pet.photos : [pet.primaryPhoto];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-md p-0 sm:p-4 overflow-hidden">
      
      {/* Modal Container */}
      <motion.div
        initial={{ y: '100%', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative w-full max-w-lg bg-white rounded-t-[36px] sm:rounded-[36px] h-[92vh] sm:h-[88vh] flex flex-col shadow-2xl overflow-hidden"
      >
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 shadow-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          
          {/* Photo Gallery Header */}
          <div className="relative w-full h-[360px] sm:h-[390px] bg-slate-900">
            <img
              src={photos[activePhoto]}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gallery Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActivePhoto((prev) => (prev + 1) % photos.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activePhoto ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>

          {/* Profile Main Body */}
          <div className="px-6 pt-2 space-y-6">
            
            {/* Title & Quick Stats */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2.5">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {pet.name}
                  </h1>
                  <span className="text-2xl font-light text-slate-500">
                    {pet.age}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral-50 border border-coral-200/80 text-coral-600 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-coral-500 fill-coral-500" />
                  <span>{pet.compatibility}% Match</span>
                </div>
              </div>

              {/* Breed & Neighborhood */}
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-slate-600 mt-1.5">
                <span className="font-semibold text-slate-800">{pet.breed}</span>
                <span>•</span>
                <span>{pet.gender}</span>
                <span>•</span>
                <span>{pet.weight}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-coral-500" />
                  {pet.locationName || pet.distance}
                </span>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-2 mt-3.5">
                {pet.vaccinated && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Vaccines Up-To-Date
                  </span>
                )}
                {pet.neutered && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    Neutered / Spayed
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200/60">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Energy: {pet.energyLevel}
                </span>
              </div>
            </div>

            {/* Compatibility Insight Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-coral-50/70 via-warm-50 to-amber-50/50 border border-coral-200/50">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-coral-700">
                <Sparkles className="w-4 h-4 text-coral-500" />
                Playmate Compatibility Breakdown
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                {pet.compatibilityReason}
              </p>

              {/* Progress bars */}
              {pet.compatibilityDetails && (
                <div className="space-y-2 pt-1 border-t border-coral-200/40">
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                      <span>Energy Level Match</span>
                      <span className="text-coral-600">{pet.compatibilityDetails.energyMatch}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-warm-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-coral-500 to-amber-500 rounded-full"
                        style={{ width: `${pet.compatibilityDetails.energyMatch}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                      <span>Play Style Harmony</span>
                      <span className="text-coral-600">{pet.compatibilityDetails.playStyleHarmony}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-warm-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-coral-500 to-amber-500 rounded-full"
                        style={{ width: `${pet.compatibilityDetails.playStyleHarmony}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                      <span>Size & Temperament Balance</span>
                      <span className="text-coral-600">{pet.compatibilityDetails.sizeBalance}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-warm-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-coral-500 to-amber-500 rounded-full"
                        style={{ width: `${pet.compatibilityDetails.sizeBalance}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About / Bio */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                About {pet.name}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {pet.bio}
              </p>
            </div>

            {/* Quirks */}
            {pet.quirks && (
              <div className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200/70">
                <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>Unique Quirks & Habits</span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "{pet.quirks}"
                </p>
              </div>
            )}

            {/* Personality Tags */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Personality & Temperament
              </h3>
              <div className="flex flex-wrap gap-2">
                {pet.personality?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-warm-100/70 text-slate-800 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite Activities & Toy */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Favorite Activities
                </div>
                <ul className="text-xs text-slate-700 space-y-1 font-medium">
                  {pet.favoriteActivities?.map((act, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Favorite Toy
                </div>
                <div className="text-xs text-slate-800 font-bold mt-1">
                  🎾 {pet.favoriteToy || 'Tennis ball & squeaky duck'}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Loves sharing toys after polite greetings
                </div>
              </div>
            </div>

            {/* Owner Profile Card */}
            {pet.owner && (
              <div className="p-4 rounded-2xl bg-white border border-warm-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Pet Parent / Human
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={pet.owner.avatar}
                      alt={pet.owner.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-warm-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-slate-900">
                          {pet.owner.name}
                        </span>
                        {pet.owner.verified && (
                          <span className="p-0.5 rounded-full bg-blue-50 text-blue-600" title="Verified Owner">
                            <UserCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {pet.owner.neighborhood} • {pet.owner.responseRate} reply rate
                      </span>
                    </div>
                  </div>
                </div>

                {pet.owner.preferredTimes && (
                  <div className="mt-3 pt-3 border-t border-warm-100 flex items-start gap-2 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Best play hours: <strong>{pet.owner.preferredTimes}</strong></span>
                  </div>
                )}
              </div>
            )}

            {/* Veterinary Health Confirmation */}
            {(pet.healthSummary || pet.health?.vaccineCertificate) && (
              <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-50 via-warm-50 to-emerald-50/40 border-2 border-emerald-500/30 shadow-xs">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">
                          Veterinary Health Confirmed
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-300">
                          🛡️ Verified Cert
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {pet.healthSummary?.verifiedVet || pet.health?.vaccineCertificate?.clinicName || 'Licensed Veterinary Clinic'}
                      </p>
                    </div>
                  </div>

                  {onViewCertificate && (
                    <button
                      onClick={() => onViewCertificate(pet)}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black transition-colors shadow-2xs shrink-0"
                    >
                      View Cert
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-emerald-200/50 text-xs text-slate-700">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Vaccines:</strong> {pet.healthSummary?.vaccineStatus || 'Core shots valid (Rabies, DHPP, Bordetella)'}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Safety Status:</strong> Approved for off-leash outdoor playdates & group romps</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-md border-t border-warm-200/80 flex items-center gap-3">
          {/* Pass Button */}
          <button
            onClick={() => {
              onPass(pet);
              onClose();
            }}
            className="w-12 h-12 rounded-2xl bg-warm-100 hover:bg-rose-50 hover:text-rose-500 text-slate-600 flex items-center justify-center transition-all shrink-0 active:scale-95"
            aria-label="Pass"
          >
            <X className="w-6 h-6 stroke-[2.4]" />
          </button>

          {/* Schedule Direct Playdate */}
          <button
            onClick={() => {
              onSchedulePlaydate(pet);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Invite to Playdate</span>
          </button>

          {/* Like Button */}
          <button
            onClick={() => {
              onLike(pet);
              onClose();
            }}
            className="w-12 h-12 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center shadow-lg shadow-coral-500/25 transition-all shrink-0 active:scale-95"
            aria-label="Like"
          >
            <Heart className="w-6 h-6 fill-white stroke-none" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
