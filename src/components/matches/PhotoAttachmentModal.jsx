import React, { useState } from 'react';
import { X, Camera, Image, Send, Check } from 'lucide-react';

export default function PhotoAttachmentModal({ isOpen, onClose, onSendPhoto }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [caption, setCaption] = useState('Milo having the best time at the park today! 🐾');

  if (!isOpen) return null;

  const photos = [
    { url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', label: 'Park Sprint' },
    { url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80', label: 'Tennis Ball Fetch' },
    { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80', label: 'Dog Beach Romp' },
    { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80', label: 'Pup Cup Treat' }
  ];

  const handleSend = () => {
    onSendPhoto({
      imageUrl: photos[selectedPhoto].url,
      caption
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600">
                Share Moment
              </span>
              <h3 className="text-base font-black text-slate-900">
                Send Pet Photo
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Photo Grid */}
        <div className="py-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Select Photo from Camera Roll
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {photos.map((p, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className={`relative h-28 rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedPhoto === idx
                    ? 'border-coral-500 ring-2 ring-coral-400/30 shadow-md scale-[1.02]'
                    : 'border-warm-200 hover:border-warm-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                  {p.label}
                </span>
                {selectedPhoto === idx && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-coral-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Caption */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-coral-500/25 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send Photo in Chat</span>
          </button>
        </div>

      </div>
    </div>
  );
}
