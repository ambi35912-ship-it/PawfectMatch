import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  Calendar,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  Image as ImageIcon,
  Smile,
  CheckCheck,
  RefreshCw,
  Share2,
  Info,
  Navigation,
  X,
  Radio,
  ArrowLeftRight
} from 'lucide-react';
import RescheduleModal from './RescheduleModal';
import PhotoAttachmentModal from './PhotoAttachmentModal';
import supabase from '../../lib/supabaseClient';

export default function ChatView({
  match,
  userPet,
  onBack,
  onSchedulePlaydate,
  onViewParkDetails,
  onAddToCalendar,
  onNavigate,
  onUpdateMessages
}) {
  const [messages, setMessages] = useState(match.messages || []);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Active sender persona for human testing ('me' = You & Milo, 'them' = Match partner)
  const [activeSender, setActiveSender] = useState('me');
  const [realtimeStatus, setRealtimeStatus] = useState('connecting'); // 'connecting' | 'connected' | 'idle'

  // Modals inside chat
  const [rescheduleData, setRescheduleData] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState(null);

  const messagesEndRef = useRef(null);
  const clientIdRef = useRef(Math.random().toString(36).substring(2, 10));
  const channelRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Persist messages to parent state only when messages change after initial mount
  const isFirstMountRef = useRef(true);
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    onUpdateMessages?.(match.id, messages);
  }, [messages, match.id]);

  // Supabase Realtime Broadcast Channel for live user-to-user chatting
  useEffect(() => {
    if (!supabase) return;

    const channelName = `match_chat_${match.id}`;
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: false }
      }
    });

    channel
      .on('broadcast', { event: 'new_message' }, ({ payload }) => {
        if (!payload || payload.senderClientId === clientIdRef.current) return;

        // When received from another client/browser:
        // A message sent with role 'partner' shows as 'them' for user, and vice versa
        setMessages((prev) => {
          if (prev.some((m) => m.id === payload.id)) return prev;
          return [
            ...prev,
            {
              id: payload.id,
              sender: payload.role === 'partner' ? 'them' : 'me',
              senderName: payload.senderName,
              text: payload.text,
              time: payload.time || 'Just now',
              type: payload.type,
              imageUrl: payload.imageUrl,
              status: payload.status,
              title: payload.title,
              location: payload.location,
              address: payload.address,
              dateTime: payload.dateTime,
              ...payload.extra
            }
          ];
        });
      })
      .on('broadcast', { event: 'typing_status' }, ({ payload }) => {
        if (!payload || payload.senderClientId === clientIdRef.current) return;
        setIsTyping(payload.isTyping);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeStatus('connected');
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setRealtimeStatus('idle');
        }
      });

    channelRef.current = channel;

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [match.id]);

  // Simulated Voice Note audio timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Handle Input typing and broadcast typing state
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'typing_status',
        payload: {
          isTyping: val.trim().length > 0,
          senderClientId: clientIdRef.current
        }
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        if (channelRef.current) {
          channelRef.current.send({
            type: 'broadcast',
            event: 'typing_status',
            payload: {
              isTyping: false,
              senderClientId: clientIdRef.current
            }
          });
        }
      }, 2500);
    }
  };

  const handleSend = (textToSend, extra = {}) => {
    const text = textToSend || inputVal.trim();
    if (!text && !extra.imageUrl) return;

    const isUserMe = activeSender === 'me';
    const senderRole = isUserMe ? 'user' : 'partner';
    const senderName = isUserMe ? (userPet?.owner?.name || 'You') : match.ownerName;

    const newMsg = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sender: activeSender,
      senderName,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...extra
    };

    // 1. Add locally
    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    // 2. Clear typing indicator broadcast
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'typing_status',
        payload: {
          isTyping: false,
          senderClientId: clientIdRef.current
        }
      });
    }

    // 3. Broadcast to other connected users/devices via Supabase Realtime
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'new_message',
        payload: {
          id: newMsg.id,
          role: senderRole,
          senderName,
          text: newMsg.text,
          time: newMsg.time,
          type: newMsg.type,
          imageUrl: newMsg.imageUrl,
          senderClientId: clientIdRef.current,
          extra
        }
      });
    }

    // NO AUTOMATED BOT REPLIES: Removed fake setTimeout bot responses so users converse genuinely.
  };

  const handleSendReaction = (emoji, label) => {
    handleSend(`${emoji} ${activeSender === 'me' ? userPet?.name || 'Milo' : match.petName} sent a ${label}!`);
  };

  const handleSendPhoto = ({ imageUrl, caption }) => {
    handleSend(caption, { imageUrl, type: 'photo' });
  };

  const handleConfirmReschedule = (updatedPlaydate) => {
    const isUserMe = activeSender === 'me';
    const inviteMsg = {
      id: `invite_${Date.now()}`,
      type: 'playdate_invite',
      sender: activeSender,
      status: 'accepted',
      title: updatedPlaydate.title || 'Rescheduled Playdate',
      location: updatedPlaydate.location || 'Cubbon Park Canine Play Zone',
      address: updatedPlaydate.address || 'Kasturba Road, Bengaluru, Karnataka',
      dateTime: updatedPlaydate.dateTime,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, inviteMsg]);

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'new_message',
        payload: {
          ...inviteMsg,
          role: isUserMe ? 'user' : 'partner',
          senderClientId: clientIdRef.current
        }
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-warm-50 relative">
      
      {/* Top Bar */}
      <div className="px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-warm-200/80 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBack?.();
            }}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-warm-100 hover:bg-coral-50 hover:text-coral-600 active:scale-95 text-slate-700 font-bold text-xs transition-all shadow-2xs shrink-0 cursor-pointer"
            aria-label="Back to matches list"
            title="Back to matches list"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back</span>
          </button>

          {/* Profile header info */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={match.avatar}
                alt={match.petName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-coral-500/80"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-slate-900">
                  {match.petName}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  • {match.ownerName}
                </span>
              </div>
              <span className="text-[10px] text-coral-600 font-bold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                {match.compatibility}% Compatibility Match
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Playdate CTA in Header */}
        <button
          onClick={() => onSchedulePlaydate(match)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-50 hover:bg-coral-100 text-coral-600 font-bold text-xs border border-coral-200/80 transition-all active:scale-95 shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-coral-500" />
          <span className="hidden sm:inline">Propose</span> Playdate
        </button>
      </div>

      {/* Realtime Live Status & Sender Switcher Bar */}
      <div className="px-3.5 py-1.5 bg-gradient-to-r from-warm-100/90 via-white to-warm-100/90 border-b border-warm-200/70 flex flex-wrap items-center justify-between gap-2 z-10 shrink-0">
        {/* Realtime Connection Status */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            {realtimeStatus === 'connected' ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 animate-pulse" />
            )}
          </span>
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-600" />
            {realtimeStatus === 'connected' ? 'Live Supabase Chat' : 'Connecting Realtime...'}
          </span>
        </div>

        {/* Sender Persona Switcher (For real two-way testing without bots) */}
        <div className="flex items-center gap-1 bg-warm-200/50 p-0.5 rounded-full border border-warm-300/40 text-[11px]">
          <span className="text-[10px] font-bold text-slate-500 px-1.5 hidden sm:inline">
            Chat as:
          </span>
          <button
            type="button"
            onClick={() => setActiveSender('me')}
            className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
              activeSender === 'me'
                ? 'bg-coral-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={`Send as You (${userPet?.name || 'Milo'})`}
          >
            🐾 You ({userPet?.name || 'Milo'})
          </button>
          <button
            type="button"
            onClick={() => setActiveSender('them')}
            className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
              activeSender === 'them'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={`Send as ${match.petName} (${match.ownerName})`}
          >
            🐕 {match.petName} ({match.ownerName})
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        
        {/* Match Announcement Notice */}
        <div className="py-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-200/60 text-slate-600 text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            You and {match.ownerName} both liked each other's pets!
          </div>
        </div>

        {/* Audio Voice Note from Pet Parent */}
        <div className="max-w-xs sm:max-w-sm mr-auto my-1">
          <div className="p-3.5 rounded-2xl rounded-bl-xs bg-white border border-warm-200/80 shadow-xs">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>🎙️ Voice Note from {match.ownerName}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-coral-500/20"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div className="flex-1 min-w-0">
                {/* Waveform bars */}
                <div className="flex items-center gap-0.8 h-6">
                  {[4, 12, 18, 8, 22, 14, 26, 16, 10, 20, 15, 8, 24, 12, 6, 18, 10, 4].map((h, i) => {
                    const isPassed = (i / 18) * 100 <= audioProgress;
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isPassed ? 'bg-coral-500' : 'bg-warm-300'
                        }`}
                        style={{ height: `${isPlayingAudio ? Math.max(4, (h * (0.8 + Math.random() * 0.4))) : h}px` }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>{isPlayingAudio ? 'Playing...' : '0:08'}</span>
                  <span>{match.petName}'s Park Bark</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 px-1 block">
            Yesterday 3:32 PM
          </span>
        </div>

        {messages.map((msg) => {
          // Playdate Proposal Card
          if (msg.type === 'playdate_invite') {
            return (
              <div key={msg.id} className="max-w-xs sm:max-w-sm mx-auto my-2 w-full">
                <div className="rounded-3xl bg-white border border-coral-200 p-4 shadow-card">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-warm-100">
                    <div className="flex items-center gap-1.5 text-xs font-black text-coral-600 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-coral-500" />
                      Playdate Proposal
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1 border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {msg.status === 'accepted' ? 'Accepted' : 'Proposed'}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                    {msg.title}
                  </h4>

                  <div className="space-y-1 text-xs text-slate-600 mb-3">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Clock className="w-3.5 h-3.5 text-coral-500" />
                      {msg.dateTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{msg.location} ({msg.address})</span>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="space-y-1.5 pt-2 border-t border-warm-100">
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => onViewParkDetails({
                          name: msg.location,
                          address: msg.address,
                          title: msg.title,
                          dateTime: msg.dateTime,
                          status: msg.status,
                          partnerName: match.petName,
                          partnerOwner: match.ownerName
                        })}
                        className="py-2 text-center rounded-xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors active:scale-95"
                        title="View park details"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-600" />
                        <span>Info</span>
                      </button>

                      <button
                        onClick={() => onNavigate?.({
                          name: msg.location,
                          address: msg.address,
                          distance: '0.9 mi away'
                        })}
                        className="py-2 text-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1 border border-emerald-200 transition-colors active:scale-95"
                        title="Open interactive navigation map"
                      >
                        <Navigation className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>Map</span>
                      </button>

                      <button
                        onClick={() => setRescheduleData(msg)}
                        className="py-2 text-center rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-600 font-bold text-xs border border-coral-200/60 transition-colors active:scale-95"
                      >
                        Change
                      </button>
                    </div>

                    <button
                      onClick={() => onAddToCalendar({
                        title: `Playdate: ${msg.title} with ${match.petName}`,
                        location: `${msg.location}, ${msg.address}`,
                        description: `Pet playdate with ${match.petName} & ${match.ownerName} scheduled via Pawfect Match app.`,
                        dateTime: msg.dateTime,
                        partnerName: match.petName
                      })}
                      className="w-full py-2.5 text-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Calendar Connector & Email Invite</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Photo Message
          if (msg.imageUrl) {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  onClick={() => setZoomedPhoto(msg.imageUrl)}
                  className={`max-w-[75%] rounded-3xl overflow-hidden border shadow-sm cursor-zoom-in group ${
                    isMe ? 'bg-coral-500 text-white border-coral-400' : 'bg-white text-slate-800 border-warm-200'
                  }`}
                >
                  <img src={msg.imageUrl} alt="attached" className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  {msg.text && (
                    <div className="p-2.5 text-xs font-medium leading-relaxed">
                      {msg.text}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            );
          }

          // Regular Text Message
          const isMe = msg.sender === 'me';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              {!isMe && (
                <span className="text-[10px] font-bold text-slate-500 mb-1 ml-1 flex items-center gap-1">
                  <span>🐕</span> {msg.senderName || match.ownerName}
                </span>
              )}
              {isMe && msg.senderName && msg.senderName !== 'You' && (
                <span className="text-[10px] font-bold text-coral-600 mb-1 mr-1 flex items-center gap-1">
                  <span>🐾</span> {msg.senderName}
                </span>
              )}
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-normal leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-gradient-to-tr from-coral-500 to-coral-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-warm-200/70 rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                <span>{msg.time}</span>
                {isMe && <CheckCheck className="w-3 h-3 text-coral-500" />}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 mr-auto py-1">
            <div className="px-3 py-2 rounded-2xl bg-white border border-warm-200 text-xs flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-coral-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-semibold text-slate-500 ml-1">
                {activeSender === 'me' ? match.ownerName : (userPet?.owner?.name || 'Arjun')} is typing...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Suggestions */}
      <div className="px-3 py-1.5 bg-warm-50/80 border-t border-warm-200/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          'See you at the park! 🐾',
          'Are they good off-leash? 🐕',
          'Favorite treats or toys? 🦴',
          'Can we do 15 mins later? ⏰',
          'Let’s grab a pup cup after! ☕'
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-warm-200 text-[11px] font-medium text-slate-700 hover:border-coral-400 hover:bg-coral-50 hover:text-coral-600 transition-all shadow-2xs shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Pet Quick Reaction Emojis Bar */}
      <div className="px-4 py-1.5 bg-white/90 border-t border-warm-100 flex items-center justify-between overflow-x-auto no-scrollbar gap-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          Quick Vibes:
        </span>
        {[
          { emoji: '🦴', label: 'treat' },
          { emoji: '🎾', label: 'tennis ball' },
          { emoji: '🐾', label: 'high paw' },
          { emoji: '☕', label: 'pup cup' },
          { emoji: '❤️', label: 'belly rub' }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendReaction(item.emoji, item.label)}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-coral-50 hover:scale-110 flex items-center justify-center text-sm transition-transform shrink-0"
            title={`Send ${item.label}`}
          >
            {item.emoji}
          </button>
        ))}
      </div>

      {/* Input Bar with Photo Attachment */}
      <div className="p-3 bg-white border-t border-warm-200/80 flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsPhotoModalOpen(true)}
          className="w-10 h-10 rounded-2xl bg-warm-100 hover:bg-warm-200 text-slate-600 flex items-center justify-center transition-colors shrink-0"
          title="Send pet photo"
        >
          <ImageIcon className="w-5 h-5 text-slate-600" />
        </button>

        <input
          type="text"
          placeholder={
            activeSender === 'me'
              ? `Message ${match.ownerName} & ${match.petName}...`
              : `Reply as ${match.ownerName} (${match.petName})...`
          }
          value={inputVal}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2.5 rounded-2xl bg-warm-50 border border-warm-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim()}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
            inputVal.trim()
              ? activeSender === 'me'
                ? 'bg-coral-500 hover:bg-coral-600 text-white shadow-md shadow-coral-500/25 active:scale-95'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/25 active:scale-95'
              : 'bg-warm-100 text-slate-300 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <Send className="w-4 h-4 fill-current stroke-none" />
        </button>
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={!!rescheduleData}
        onClose={() => setRescheduleData(null)}
        playdate={rescheduleData}
        onConfirmReschedule={handleConfirmReschedule}
      />

      {/* Photo Attachment Modal */}
      <PhotoAttachmentModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSendPhoto={handleSendPhoto}
      />

      {/* Photo Lightbox / Zoom Modal */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoomedPhoto(null)}
        >
          <button
            onClick={() => setZoomedPhoto(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="Close photo"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomedPhoto}
            alt="Pet enlarged"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-3 text-white/80 text-xs font-medium">Click outside or press ✕ to close</p>
        </div>
      )}

    </div>
  );
}
