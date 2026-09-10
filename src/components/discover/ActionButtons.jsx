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
    <div className="flex items-center justify-center gap-3 sm:gap-4 py-1.5 px-3 select-none">
      
      {/* 1. Rewind Button (Amber / Yellow) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.86 }}
        disabled={!canRewind || disabled}
        onClick={onRewind}
        aria-label="Undo last swipe"
        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
          canRewind && !disabled
            ? 'bg-white border-amber-300 text-amber-500 shadow-md hover:bg-amber-50 hover:border-amber-400 active:bg-amber-100'
            : 'bg-warm-100/70 border-warm-200/50 text-slate-300 cursor-not-allowed'
        }`}
      >
        <RotateCcw className="w-5 h-5 stroke-[2.4]" />
      </motion.button>

      {/* 2. Pass / Nope Button (Tinder Red #ff4458) */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.86 }}
        disabled={disabled}
        onClick={onPass}
        aria-label="Pass playmate"
        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-white border-2 border-rose-200 text-[#ff4458] flex items-center justify-center shadow-xl shadow-rose-500/15 hover:bg-rose-50/60 hover:border-[#ff4458] transition-all group cursor-pointer"
      >
        <X className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.8] group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* 3. Super Like Button (Tinder Sky Blue #2db1ff) */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.86 }}
        disabled={disabled}
        onClick={onSuperLike}
        aria-label="Super Like playmate"
        className="w-12 h-12 rounded-full bg-white border-2 border-sky-200 text-[#2db1ff] flex items-center justify-center shadow-lg shadow-sky-500/20 hover:bg-sky-50 hover:border-[#2db1ff] transition-all group cursor-pointer"
      >
        <Star className="w-6 h-6 fill-current stroke-none group-hover:scale-110 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* 4. Like Button (Tinder Emerald Green #20d592) */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.86 }}
        disabled={disabled}
        onClick={onLike}
        aria-label="Like playmate"
        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-white border-2 border-emerald-200 text-[#20d592] flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:bg-emerald-50/60 hover:border-[#20d592] transition-all group cursor-pointer"
      >
        <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-current stroke-none group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* 5. Info / Profile Button (Purple) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.86 }}
        disabled={disabled}
        onClick={onOpenDetails}
        aria-label="View full pet profile"
        className="w-11 h-11 rounded-full bg-white border border-purple-200 text-purple-600 flex items-center justify-center shadow-md hover:bg-purple-50 hover:border-purple-300 transition-all cursor-pointer"
      >
        <Info className="w-5 h-5 stroke-[2.2]" />
      </motion.button>

    </div>
  );
}
