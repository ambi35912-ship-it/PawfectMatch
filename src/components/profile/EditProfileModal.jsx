import React, { useState } from 'react';
import { X, User, Check, Sparkles, Camera } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, owner, onSave }) {
  if (!isOpen) return null;

  const [name, setName] = useState(owner?.name || 'Alex Rivera');
  const [neighborhood, setNeighborhood] = useState(owner?.neighborhood || 'Marina District, SF');
  const [preferredTimes, setPreferredTimes] = useState(owner?.preferredTimes || 'Weekday evenings (5-7 PM), Weekend mornings');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [customAvatar, setCustomAvatar] = useState(null);

  const ownerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      neighborhood,
      preferredTimes,
      avatar: customAvatar || ownerAvatars[avatarIndex] || owner.avatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Pet Parent Account
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Edit Parent Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          
          {/* Avatar Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Profile Photo
            </label>
            <div className="flex gap-2.5 justify-center py-1 items-center overflow-x-auto no-scrollbar">
              {/* Custom Upload Tile */}
              <label className={`relative w-14 h-14 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer shrink-0 transition-all ${
                customAvatar ? 'border-coral-500 bg-coral-50 shadow-md ring-3 ring-coral-500' : 'border-warm-300 hover:border-coral-400 bg-warm-50 text-slate-500'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {customAvatar ? (
                  <>
                    <img src={customAvatar} alt="Custom" className="w-full h-full object-cover rounded-full" />
                    <div className="absolute inset-0 bg-coral-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 text-coral-500 mb-0.5" />
                    <span className="text-[8px] font-black uppercase text-slate-700">Upload</span>
                  </>
                )}
              </label>

              {ownerAvatars.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setCustomAvatar(null);
                    setAvatarIndex(i);
                  }}
                  className={`relative w-14 h-14 rounded-full overflow-hidden shrink-0 transition-all ${
                    !customAvatar && avatarIndex === i ? 'ring-3 ring-coral-500 scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="avatar option" className="w-full h-full object-cover" />
                  {!customAvatar && avatarIndex === i && (
                    <div className="absolute inset-0 bg-coral-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
            />
          </div>

          {/* Neighborhood */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Neighborhood & City
            </label>
            <input
              type="text"
              required
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
            />
          </div>

          {/* Preferred Times */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Preferred Playdate Windows
            </label>
            <input
              type="text"
              value={preferredTimes}
              onChange={(e) => setPreferredTimes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-sm shadow-lg shadow-coral-500/30 transition-all active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
