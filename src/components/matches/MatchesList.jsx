import React, { useState } from 'react';
import { Search, Sparkles, MessageCircle, Calendar, ChevronRight, CheckCheck, Clock } from 'lucide-react';

export default function MatchesList({
  matches,
  onSelectConversation,
  onSelectNewMatch
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'playdates' | 'unread'

  const filteredMatches = matches.filter((m) => {
    // Search query filter
    const matchesSearch = (
      m.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (!matchesSearch) return false;

    // Segment filter
    if (filterTab === 'playdates') return m.hasPlannedPlaydate;
    if (filterTab === 'unread') return m.unread;
    return true;
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col p-4 max-w-md mx-auto w-full overflow-y-auto no-scrollbar pb-20">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Playmates & Messages
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Mutual matches ready for outdoor fun & romps
        </p>
      </div>

      {/* New Mutual Playmates Carousel */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            New Matches ({matches.length})
          </span>
          <span className="text-[11px] font-bold text-coral-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            90%+ Match
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-1 px-1">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => onSelectConversation(match)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            >
              <div className="relative">
                {/* Gradient ring */}
                <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-coral-500 via-amber-400 to-emerald-400 shadow-md group-hover:scale-105 transition-transform">
                  <img
                    src={match.avatar}
                    alt={match.petName}
                    className="w-full h-full rounded-full object-cover ring-2 ring-white"
                  />
                </div>
                {/* Match score badge */}
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-extrabold text-[10px] ring-1.5 ring-white">
                  {match.compatibility}%
                </span>
              </div>
              <span className="text-xs font-bold text-slate-800 tracking-tight max-w-[68px] truncate">
                {match.petName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search matches by pet or parent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-warm-200/80 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30 shadow-xs"
        />
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: `All (${matches.length})` },
          { id: 'playdates', label: `Playdates Planned 🎾 (${matches.filter(m => m.hasPlannedPlaydate).length})` },
          { id: 'unread', label: `Unread (${matches.filter(m => m.unread).length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0 border ${
              filterTab === tab.id
                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                : 'bg-white border-warm-200 text-slate-600 hover:bg-warm-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {filteredMatches.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No conversations found in this view.
          </div>
        ) : (
          filteredMatches.map((match) => (
            <button
              key={match.id}
              onClick={() => onSelectConversation(match)}
              className="w-full p-3 rounded-2xl bg-white hover:bg-warm-50 border border-warm-200/60 shadow-xs flex items-center gap-3 text-left transition-all active:scale-[0.99] group shrink-0"
            >
              {/* Pet Avatar with tiny owner pip */}
              <div className="relative shrink-0">
                <img
                  src={match.avatar}
                  alt={match.petName}
                  className="w-12 h-12 rounded-2xl object-cover ring-1 ring-warm-200"
                />
                <img
                  src={match.ownerAvatar}
                  alt={match.ownerName}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full object-cover ring-2 ring-white shadow-xs"
                  title={`Parent: ${match.ownerName}`}
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold text-slate-900 truncate">
                      {match.petName}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ({match.ownerName})
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 shrink-0">
                    {match.lastMessageTime}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-500 truncate pr-2 font-normal">
                    {match.lastMessage || 'Say hi to start planning a playdate!'}
                  </p>
                  {match.unread && (
                    <span className="w-2.5 h-2.5 rounded-full bg-coral-500 shrink-0 ring-2 ring-white" />
                  )}
                </div>

                {/* Planned playdate chip */}
                {match.hasPlannedPlaydate && (
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200/50">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    Playdate Planned • Sat 10:00 AM
                  </div>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))
        )}
      </div>

    </div>
  );
}
