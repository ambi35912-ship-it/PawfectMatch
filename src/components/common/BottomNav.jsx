import React from 'react';
import { Sparkles, MessageCircle, CalendarDays, HeartPulse, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, unreadCount = 1, upcomingCount = 1 }) {
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Sparkles },
    { id: 'matches', label: 'Matches', icon: MessageCircle, badge: unreadCount },
    { id: 'playdates', label: 'Playdates', icon: CalendarDays, badge: upcomingCount > 0 ? upcomingCount : null, badgeColor: 'bg-amber-500' },
    { id: 'health', label: 'Health', icon: HeartPulse, pulse: true },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-xl border-t border-warm-100/80 px-4 py-2 safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                isActive ? 'text-coral-500' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px] group-hover:scale-105'
                  }`}
                />

                {/* Badge */}
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center text-white shadow-sm ring-2 ring-white ${
                      item.badgeColor || 'bg-coral-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Pulse dot for health */}
                {item.pulse && !item.badge && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 ring-1.5 ring-white"></span>
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-1 tracking-tight font-medium transition-all ${
                  isActive ? 'font-bold text-coral-600 scale-100' : 'text-slate-400 scale-95'
                }`}
              >
                {item.label}
              </span>

              {/* Active bar */}
              {isActive && (
                <div className="absolute -bottom-1 w-6 h-1 rounded-full bg-coral-500 shadow-sm shadow-coral-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
