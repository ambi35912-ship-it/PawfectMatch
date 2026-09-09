import React from 'react';
import { SlidersHorizontal, Sparkles, Smartphone, Monitor, User, ShieldCheck } from 'lucide-react';

export default function TopHeader({
  activeTab,
  userPet,
  onOpenFilter,
  isDeviceFrame,
  setIsDeviceFrame,
  onOpenProfile,
  currentUser = null,
  onOpenAuthModal
}) {
  return (
    <header className="sticky top-0 z-30 px-5 pt-3 pb-2.5 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-warm-100 transition-colors">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-coral-500 via-coral-400 to-amber-400 flex items-center justify-center shadow-md shadow-coral-500/20 text-white font-bold text-lg">
          🐾
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-coral-600 bg-clip-text text-transparent">
              Pawfect Match
            </span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-coral-50 text-coral-600 border border-coral-200/60">
              Pro
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Device Mode Toggle */}
        <button
          onClick={() => setIsDeviceFrame(!isDeviceFrame)}
          title={isDeviceFrame ? "Switch to Full View" : "Switch to iPhone Mockup"}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-warm-50 hover:bg-warm-100 transition-all border border-warm-200/60"
        >
          {isDeviceFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px]">Full</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-coral-500" />
              <span className="text-[11px]">Phone</span>
            </>
          )}
        </button>

        {/* Filter (if in discover) */}
        {activeTab === 'discover' && (
          <button
            onClick={onOpenFilter}
            className="w-9 h-9 rounded-full bg-warm-50 hover:bg-warm-100 flex items-center justify-center text-slate-700 border border-warm-200/80 transition-all active:scale-95 relative"
            aria-label="Filter playmates"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coral-500 ring-2 ring-white"></span>
          </button>
        )}

        {/* Auth / Account Trigger */}
        {!currentUser ? (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold text-coral-600 bg-coral-50 hover:bg-coral-100 border border-coral-200/70 transition-all active:scale-95 shadow-xs"
            title="Sign in with Supabase"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Sign In</span>
          </button>
        ) : (
          <button
            onClick={onOpenProfile}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title={`Signed in as ${currentUser.email}`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Supabase</span>
          </button>
        )}

        {/* Active Pet Pill */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-warm-50 hover:bg-warm-100 border border-warm-200/80 transition-all active:scale-95 group"
        >
          <div className="relative">
            <img
              src={userPet.avatar}
              alt={userPet.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-coral-500/80"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
          </div>
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            {userPet.name}
          </span>
        </button>
      </div>
    </header>
  );
}
