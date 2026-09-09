import React from 'react';
import { RotateCcw, X, Star, Heart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActionButtons({
  onPass,
  onLike,
  onSuperLike,
  onRewind,
  onOpenDetails,
  canRewind = true,
  disabled = false
}) {
  return (
    <div className="flex items-center justify-center gap-3.5 sm:gap-4 py-3 px-4 select-none">
      
      {/* Rewind */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        disabled={!canRewind || disabled}
        onClick={onRewind}
        aria-label="Undo last swipe"
        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
          canRewind && !disabled
            ? 'bg-white border-warm-200 text-amber-500 shadow-md hover:bg-amber-50 active:bg-amber-100'
            : 'bg-warm-100/60 border-warm-100 text-slate-300 cursor-not-allowed'
        }`}
      >
        <RotateCcw className="w-5 h-5 stroke-[2.2]" />
      </motion.button>

      {/* Pass (Left Swipe) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        disabled={disabled}
        onClick={onPass}
        aria-label="Pass"
        className="w-14 h-14 rounded-full bg-white border border-rose-100 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/10 hover:bg-rose-50 hover:border-rose-200 transition-all group"
      >
        <X className="w-7 h-7 stroke-[2.6] group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Super Like / Favorite */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        disabled={disabled}
        onClick={onSuperLike}
        aria-label="Super Like playmate"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 hover:brightness-105 transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
        <Star className="w-6 h-6 fill-slate-950 stroke-none group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Like (Right Swipe) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        disabled={disabled}
        onClick={onLike}
        aria-label="Like playmate"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-coral-500 to-coral-400 text-white flex items-center justify-center shadow-xl shadow-coral-500/30 hover:brightness-105 transition-all group"
      >
        <Heart className="w-7 h-7 fill-white stroke-none group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Info / Profile */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        disabled={disabled}
        onClick={onOpenDetails}
        aria-label="View full pet profile"
        className="w-11 h-11 rounded-full bg-white border border-warm-200 text-slate-600 flex items-center justify-center shadow-md hover:bg-warm-50 hover:text-slate-900 transition-all"
      >
        <Info className="w-5 h-5 stroke-[2.2]" />
      </motion.button>

    </div>
  );
}
