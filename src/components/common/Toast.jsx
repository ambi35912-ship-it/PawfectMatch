import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    sparkles: <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />,
    alert: <AlertCircle className="w-4 h-4 text-coral-500" />,
    info: <Info className="w-4 h-4 text-sky-500" />
  };

  return (
    <div className="fixed top-12 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        className="pointer-events-auto max-w-sm w-full py-2.5 px-3.5 rounded-2xl bg-slate-950/90 text-white backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between gap-2.5"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="shrink-0">
            {icons[toast.type || 'success']}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold tracking-tight text-white truncate">
              {toast.title}
            </div>
            {toast.message && (
              <div className="text-[11px] text-slate-300 truncate">
                {toast.message}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-5 h-5 rounded-full hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
}
