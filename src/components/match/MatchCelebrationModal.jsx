import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Sparkles, Heart, X } from 'lucide-react';

export default function MatchCelebrationModal({
  isOpen,
  matchedPet,
  userPet,
  onClose,
  onStartChat,
  onPlanPlaydate
}) {
  if (!isOpen || !matchedPet) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        
        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="relative w-full max-w-sm rounded-[36px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 text-center text-white border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden"
        >
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-coral-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title Banner */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative z-10 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-coral-500/20 text-coral-300 border border-coral-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              New Playmate Match!
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-rose-100 to-coral-200 bg-clip-text text-transparent">
              It’s a Match!
            </h2>
          </motion.div>

          {/* Overlapping Pet Avatars with Rings */}
          <div className="relative flex items-center justify-center h-32 my-4 z-10">
            {/* User Pet (Milo) */}
            <motion.div
              initial={{ x: -40, opacity: 0, scale: 0.8 }}
              animate={{ x: -16, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 18, delay: 0.2 }}
              className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-coral-500 to-amber-400 shadow-xl shadow-coral-500/30"
            >
              <img
                src={userPet.avatar}
                alt={userPet.name}
                className="w-full h-full rounded-full object-cover ring-2 ring-slate-900"
              />
              <span className="absolute bottom-0 right-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-coral-400 border border-coral-500/50 shadow">
                {userPet.name}
              </span>
            </motion.div>

            {/* Glowing Heart Junction */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 400 }}
              className="absolute z-20 w-10 h-10 rounded-full bg-gradient-to-tr from-coral-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/50 ring-4 ring-slate-900"
            >
              <Heart className="w-5 h-5 fill-white stroke-none animate-pulse" />
            </motion.div>

            {/* Matched Pet */}
            <motion.div
              initial={{ x: 40, opacity: 0, scale: 0.8 }}
              animate={{ x: 16, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 18, delay: 0.2 }}
              className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tl from-emerald-400 to-cyan-400 shadow-xl shadow-emerald-500/30"
            >
              <img
                src={matchedPet.primaryPhoto || matchedPet.avatar}
                alt={matchedPet.name}
                className="w-full h-full rounded-full object-cover ring-2 ring-slate-900"
              />
              <span className="absolute bottom-0 left-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-emerald-400 border border-emerald-500/50 shadow">
                {matchedPet.name}
              </span>
            </motion.div>
          </div>

          {/* Compatibility Details */}
          <div className="relative z-10 mt-4 mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-300 font-extrabold text-xs mb-2 border border-emerald-400/20">
              ⚡ {matchedPet.compatibility}% Energy & Play Harmony
            </div>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              {matchedPet.owner?.name || 'Owner'} and {matchedPet.name} are also interested in connecting with {userPet.name}!
            </p>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 space-y-2.5">
            <button
              onClick={() => {
                onStartChat(matchedPet);
                onClose();
              }}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-coral-500 via-coral-500 to-coral-600 hover:brightness-110 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-coral-500/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Start Chatting</span>
            </button>

            <button
              onClick={() => {
                onPlanPlaydate(matchedPet);
                onClose();
              }}
              className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/15 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Plan a Playdate</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-400 hover:text-white pt-1 transition-colors block mx-auto"
            >
              Keep Swiping
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
