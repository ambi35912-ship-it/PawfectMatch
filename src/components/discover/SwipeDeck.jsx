import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import PetCard from './PetCard';
import ActionButtons from './ActionButtons';
import { Sparkles, RefreshCw, Dog } from 'lucide-react';

export default function SwipeDeck({
  pets,
  onLikePet,
  onPassPet,
  onSuperLikePet,
  onOpenDetails,
  onResetDeck
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [exitDirection, setExitDirection] = useState(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);

  const activePet = pets[currentIndex];
  const nextPet = pets[currentIndex + 1];
  const thirdPet = pets[currentIndex + 2];

  // Dynamic stamp opacity update during drag
  const handleDrag = (_, info) => {
    const dragDistance = info.offset.x;
    const likeEl = document.getElementById('stamp-like');
    const passEl = document.getElementById('stamp-pass');

    if (likeEl && passEl) {
      if (dragDistance > 20) {
        likeEl.style.opacity = String(Math.min(dragDistance / 100, 1));
        passEl.style.opacity = '0';
      } else if (dragDistance < -20) {
        passEl.style.opacity = String(Math.min(Math.abs(dragDistance) / 100, 1));
        likeEl.style.opacity = '0';
      } else {
        likeEl.style.opacity = '0';
        passEl.style.opacity = '0';
      }
    }
  };

  const handleDragEnd = (_, info) => {
    const likeEl = document.getElementById('stamp-like');
    const passEl = document.getElementById('stamp-pass');
    if (likeEl) likeEl.style.opacity = '0';
    if (passEl) passEl.style.opacity = '0';

    const threshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      triggerSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      triggerSwipe('left');
    }
  };

  const triggerSwipe = (dir) => {
    if (!activePet) return;
    setExitDirection(dir);
    setHistory((prev) => [...prev, { pet: activePet, direction: dir, index: currentIndex }]);

    setTimeout(() => {
      if (dir === 'right') {
        onLikePet(activePet);
      } else if (dir === 'left') {
        onPassPet(activePet);
      } else if (dir === 'up') {
        onSuperLikePet(activePet);
      }
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
      x.set(0);
    }, 200);
  };

  const handleRewind = () => {
    if (history.length === 0 || currentIndex === 0) return;
    const lastAction = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const isDeckEmpty = currentIndex >= pets.length;

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-4 max-w-md mx-auto w-full relative overflow-hidden min-h-0">
      
      {/* Card Stack Viewport */}
      <div className="relative flex-1 w-full h-[510px] sm:h-[550px] min-h-[460px] max-h-[580px] flex items-center justify-center my-auto">
        
        {/* Empty State */}
        {isDeckEmpty ? (
          <div className="w-full h-full rounded-[32px] bg-white border border-warm-200/80 shadow-card p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-coral-50 flex items-center justify-center text-coral-500 mb-4 shadow-inner">
              <Dog className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              All Caught Up!
            </h3>
            <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
              Milo has discovered all nearby playmates within your filter range. Check back later or reset your stack!
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setHistory([]);
                onResetDeck?.();
              }}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs shadow-lg shadow-coral-500/25 transition-all active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Pet Stack
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full">
            
            {/* 3rd Card in Stack (Deepest) */}
            {thirdPet && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  transform: 'scale(0.91) translateY(24px)',
                  zIndex: 1,
                  opacity: 0.5,
                }}
              >
                <PetCard pet={thirdPet} isTopCard={false} onOpenDetails={onOpenDetails} />
              </div>
            )}

            {/* 2nd Card in Stack (Middle) */}
            {nextPet && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  transform: 'scale(0.955) translateY(12px)',
                  zIndex: 2,
                  opacity: 0.85,
                }}
              >
                <PetCard pet={nextPet} isTopCard={false} onOpenDetails={onOpenDetails} />
              </div>
            )}

            {/* Active Front Card (Top with Draggable Physics) */}
            {activePet && (
              <motion.div
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-none"
                style={{
                  x,
                  rotate,
                  zIndex: 10,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                animate={
                  exitDirection === 'right'
                    ? { x: 500, rotate: 25, opacity: 0 }
                    : exitDirection === 'left'
                    ? { x: -500, rotate: -25, opacity: 0 }
                    : exitDirection === 'up'
                    ? { y: -500, opacity: 0 }
                    : { x: 0, y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <PetCard
                  pet={activePet}
                  isTopCard={true}
                  onOpenDetails={onOpenDetails}
                />
              </motion.div>
            )}

          </div>
        )}

      </div>

      {/* Action Buttons Bar */}
      <div className="mt-2 shrink-0">
        <ActionButtons
          onPass={() => triggerSwipe('left')}
          onLike={() => triggerSwipe('right')}
          onSuperLike={() => triggerSwipe('up')}
          onRewind={handleRewind}
          onOpenDetails={() => activePet && onOpenDetails(activePet)}
          canRewind={history.length > 0}
          disabled={isDeckEmpty}
        />
      </div>

    </div>
  );
}
