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
  Info
} from 'lucide-react';
import RescheduleModal from './RescheduleModal';
import PhotoAttachmentModal from './PhotoAttachmentModal';

export default function ChatView({
  match,
  userPet,
  onBack,
  onSchedulePlaydate,
  onViewParkDetails,
  onAddToCalendar
}) {
  const [messages, setMessages] = useState(match.messages || []);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Modals inside chat
  const [rescheduleData, setRescheduleData] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  const handleSend = (textToSend, extra = {}) => {
    const text = textToSend || inputVal.trim();
    if (!text && !extra.imageUrl) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: text,
      time: 'Just now',
      ...extra
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    // Trigger typing simulation and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        `That sounds fantastic! ${match.petName} just gave a happy tail wag! 🐾`,
        `Perfect! We will meet you by the grass field near the water fountain! 🎾`,
        `Can't wait! ${match.petName} has so much energy today, this will be so great for them!`,
        `Awesome! We'll bring extra tennis balls and peanut butter treats! 🦴`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `reply_${Date.now()}`,
          sender: 'them',
          text: randomReply,
          time: 'Just now'
        }
      ]);
    }, 1800);
  };

  const handleSendReaction = (emoji, label) => {
    handleSend(`${emoji} ${userPet.name} sent ${match.petName} a ${label}!`);
  };

  const handleSendPhoto = ({ imageUrl, caption }) => {
    handleSend(caption, { imageUrl, type: 'photo' });
  };

  const handleConfirmReschedule = (updatedPlaydate) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `invite_${Date.now()}`,
        type: 'playdate_invite',
        sender: 'me',
        status: 'accepted',
        title: updatedPlaydate.title || 'Rescheduled Playdate',
        location: updatedPlaydate.location || 'Alta Plaza Dog Play Area',
        address: updatedPlaydate.address || 'Jackson St, SF',
        dateTime: updatedPlaydate.dateTime,
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-warm-50 relative">
      
      {/* Top Bar */}
      <div className="px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-warm-200/80 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
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
                    <div className="flex items-center gap-2">
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
                        className="flex-1 py-2.5 text-center rounded-xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
                        title="View full playdate & venue details"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-600" />
                        <span>More Info</span>
                      </button>
                      <button
                        onClick={() => setRescheduleData(msg)}
                        className="flex-1 py-2.5 text-center rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-600 font-bold text-xs border border-coral-200/60 transition-colors active:scale-95"
                      >
                        Reschedule
                      </button>
                    </div>

                    <button
                      onClick={() => onAddToCalendar({
                        title: `Playdate: ${msg.title} with ${match.petName}`,
                        location: `${msg.location}, ${msg.address}`,
                        description: `Pet playdate with ${match.petName} & ${match.ownerName} scheduled via Pawfect Match app.`
                      })}
                      className="w-full py-2 text-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Add to Calendar
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
                <div className={`max-w-[75%] rounded-3xl overflow-hidden border shadow-sm ${
                  isMe ? 'bg-coral-500 text-white border-coral-400' : 'bg-white text-slate-800 border-warm-200'
                }`}>
                  <img src={msg.imageUrl} alt="attached" className="w-full h-44 object-cover" />
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
                {match.ownerName} is typing...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
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
          placeholder={`Message ${match.ownerName} & ${match.petName}...`}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2.5 rounded-2xl bg-warm-50 border border-warm-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim()}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
            inputVal.trim()
              ? 'bg-coral-500 hover:bg-coral-600 text-white shadow-md shadow-coral-500/25 active:scale-95'
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

    </div>
  );
}
