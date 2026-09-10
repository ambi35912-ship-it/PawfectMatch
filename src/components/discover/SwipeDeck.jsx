import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PetCard from './PetCard';
import ActionButtons from './ActionButtons';
import { RefreshCw, Dog } from 'lucide-react';

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
  const y = useMotionValue(0);

  // Smooth dynamic rotation based on horizontal displacement (-24deg to 24deg)
  const rotate = useTransform(x, [-280, 0, 280], [-22, 0, 22]);

  // Dynamic Tinder Stamp Opacities and Scales
  const likeOpacity = useTransform(x, [20, 95], [0, 1]);
  const likeScale = useTransform(x, [20, 110], [0.8, 1.05]);

  const nopeOpacity = useTransform(x, [-20, -95], [0, 1]);
  const nopeScale = useTransform(x, [-20, -110], [0.8, 1.05]);

  const superLikeOpacity = useTransform(y, [-20, -95], [0, 1]);
  const superLikeScale = useTransform(y, [-20, -110], [0.8, 1.05]);

  // Card behind dynamically scales up and brightens as front card moves away
  const nextCardScale = useTransform(x, [-220, 0, 220], [0.985, 0.94, 0.985]);
  const nextCardOpacity = useTransform(x, [-220, 0, 220], [0.95, 0.78, 0.95]);
  const nextCardY = useTransform(x, [-220, 0, 220], [2, 10, 2]);

  const activePet = pets[currentIndex];
  const nextPet = pets[currentIndex + 1];
  const thirdPet = pets[currentIndex + 2];

  const handleDragEnd = (_, info) => {
    const thresholdX = 85;
    const velocityX = info.velocity.x;
    const thresholdY = -90;
    const velocityY = info.velocity.y;

    if (info.offset.x > thresholdX || velocityX > 320) {
      triggerSwipe('right');
    } else if (info.offset.x < -thresholdX || velocityX < -320) {
      triggerSwipe('left');
    } else if (info.offset.y < thresholdY || velocityY < -350) {
      triggerSwipe('up');
    } else {
      // Snap back smoothly to center
      x.set(0);
      y.set(0);
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
      y.set(0);
    }, 220);
  };

  const handleRewind = () => {
    if (history.length === 0 || currentIndex === 0) return;
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const isDeckEmpty = currentIndex >= pets.length;

  return (
    <div className="flex-1 flex flex-col justify-between px-2.5 sm:px-3 pt-1 pb-2 w-full max-w-lg mx-auto relative overflow-hidden min-h-0">
      
      {/* Full-Screen Card Stack Viewport */}
      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center my-1">
        
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
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs shadow-lg shadow-coral-500/25 transition-all active:scale-95 cursor-pointer"
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
                  transform: 'scale(0.90) translateY(20px)',
                  zIndex: 1,
                  opacity: 0.45,
                }}
              >
                <PetCard pet={thirdPet} isTopCard={false} onOpenDetails={onOpenDetails} />
              </div>
            )}

            {/* 2nd Card in Stack (Middle with dynamic scaling) */}
            {nextPet && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  scale: nextCardScale,
                  opacity: nextCardOpacity,
                  y: nextCardY,
                  zIndex: 2,
                }}
              >
                <PetCard pet={nextPet} isTopCard={false} onOpenDetails={onOpenDetails} />
              </motion.div>
            )}

            {/* Active Front Card (Top with Draggable Physics & Dynamic Stamps) */}
            {activePet && (
              <motion.div
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-none select-none"
                style={{
                  x,
                  y,
                  rotate,
                  zIndex: 10,
                }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.85}
                onDragEnd={handleDragEnd}
                animate={
                  exitDirection === 'right'
                    ? { x: 750, rotate: 30, opacity: 0 }
                    : exitDirection === 'left'
                    ? { x: -750, rotate: -30, opacity: 0 }
                    : exitDirection === 'up'
                    ? { y: -750, opacity: 0 }
                    : { x: 0, y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              >
                <PetCard
                  pet={activePet}
                  isTopCard={true}
                  onOpenDetails={onOpenDetails}
                  likeOpacity={likeOpacity}
                  likeScale={likeScale}
                  nopeOpacity={nopeOpacity}
                  nopeScale={nopeScale}
                  superLikeOpacity={superLikeOpacity}
                  superLikeScale={superLikeScale}
                />
              </motion.div>
            )}

          </div>
        )}

      </div>

      {/* Tinder Action Buttons Bar */}
      <div className="shrink-0 py-0.5">
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
