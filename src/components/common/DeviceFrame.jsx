import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function DeviceFrame({ isDeviceFrame, children }) {
  const [time, setTime] = useState('9:41');
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hours = d.getHours();
      const mins = d.getMinutes().toString().padStart(2, '0');
      setTime(`${hours % 12 || 12}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // When on an actual mobile device/screen or user toggled to Full view on computer:
  if (!isDeviceFrame || isMobileScreen) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-0">
        <div className="w-full max-w-full sm:max-w-[440px] md:max-w-[460px] h-screen max-h-screen bg-warm-50 flex flex-col shadow-2xl relative overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  // Desktop iPhone 16 Pro Mockup Frame
  return (
    <div className="min-h-screen py-4 px-3 bg-gradient-to-br from-stone-900 via-slate-900 to-stone-950 flex items-center justify-center">
      {/* Outer Phone Shell */}
      <div className="relative w-full max-w-[430px] h-[915px] rounded-[52px] bg-slate-950 p-2.5 shadow-[0_30px_100px_rgba(0,0,0,0.6)] border-[5px] border-slate-800/80 ring-1 ring-white/15 flex flex-col">
        
        {/* Antenna bands & buttons simulation */}
        <div className="absolute -left-[9px] top-[140px] w-[4px] h-[40px] bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[9px] top-[190px] w-[4px] h-[54px] bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[9px] top-[254px] w-[4px] h-[54px] bg-slate-700 rounded-l-md" />
        <div className="absolute -right-[9px] top-[200px] w-[4px] h-[75px] bg-slate-700 rounded-r-md" />

        {/* Screen Area - consistently uses bg-warm-50 so cards and bubbles render identically */}
        <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-warm-50 flex flex-col select-none border border-black/10">
          
          {/* iOS Status Bar */}
          <div className="h-10 px-6 bg-white/90 backdrop-blur-md flex items-center justify-between text-xs font-semibold text-slate-900 z-40 shrink-0 border-b border-warm-100/60">
            <span>{time}</span>
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-slate-900/80 ring-1 ring-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#111] ring-1 ring-emerald-500/20" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5 fill-current stroke-none" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.4]" />
              <BatteryMedium className="w-4 h-4 fill-current stroke-none" />
            </div>
          </div>

          {/* App Body */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="h-4 bg-warm-50 flex items-center justify-center shrink-0 z-40">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
