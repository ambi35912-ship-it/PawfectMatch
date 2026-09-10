import React, { useState } from 'react';
import {
  X,
  Dog,
  Cat,
  Camera,
  Check,
  Sparkles,
  Zap,
  Heart,
  Plus,
  Trash2
} from 'lucide-react';

export default function EditPetModal({ isOpen, onClose, pet, onSave }) {
  if (!isOpen || !pet) return null;

  const [name, setName] = useState(pet.name || '');
  const [species, setSpecies] = useState(pet.species || 'Dog');
  const [breed, setBreed] = useState(pet.breed || '');
  const [age, setAge] = useState(pet.age || '2 yrs');
  const [gender, setGender] = useState(pet.gender || 'Male');
  const [weight, setWeight] = useState(pet.weight || '55 lbs');
  const [energyLevel, setEnergyLevel] = useState(pet.energyLevel || 'High');
  const [playStyle, setPlayStyle] = useState(pet.playStyle || 'High-energy Fetch & Gentle Romping');
  const [bio, setBio] = useState(pet.bio || '');
  const [quirks, setQuirks] = useState(pet.quirks || '');
  const [favoriteToy, setFavoriteToy] = useState(pet.favoriteToy || 'Tennis ball & squeaky duck');
  const [personalityTags, setPersonalityTags] = useState(pet.personality || ['Playful', 'Social', 'Loving']);
  const [newTagInput, setNewTagInput] = useState('');
  const [avatar, setAvatar] = useState(pet.avatar || '');

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = newTagInput.trim().replace(/^#/, '');
    if (tag && !personalityTags.includes(tag)) {
      setPersonalityTags([...personalityTags, tag]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPersonalityTags(personalityTags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...pet,
      name: name.trim(),
      species,
      breed: breed.trim(),
      age,
      gender,
      weight: weight.includes('lbs') ? weight : `${weight} lbs`,
      energyLevel,
      playStyle: playStyle.trim(),
      bio: bio.trim(),
      quirks: quirks.trim(),
      favoriteToy: favoriteToy.trim(),
      personality: personalityTags,
      avatar,
      photos: avatar ? [avatar, ...(pet.photos ? pet.photos.filter((p) => p !== pet.avatar) : [])] : pet.photos
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[92vh] overflow-y-auto no-scrollbar space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-coral-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Pet Identity & Bio
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Edit {pet.name}'s Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Photo Selector */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative group">
              <img
                src={avatar || pet.avatar}
                alt="Pet avatar"
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-coral-500/20 shadow-md bg-slate-900"
              />
              <label
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center shadow-md cursor-pointer border-2 border-white transition-all active:scale-95"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-[11px] font-bold text-slate-500 mt-2">
              Tap camera icon to replace photo
            </span>
          </div>

          {/* Name & Breed */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Pet Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Breed
              </label>
              <input
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
              />
            </div>
          </div>

          {/* Age, Gender, Weight */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Age
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="2.5 yrs"
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Weight
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="68 lbs"
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Energy Level
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {['Calm', 'Moderate', 'High', 'Very High'].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setEnergyLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    energyLevel === lvl
                      ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-xs'
                      : 'border-warm-200 bg-warm-50 text-slate-600'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Play Style */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Play Style & Dynamics
            </label>
            <input
              type="text"
              value={playStyle}
              onChange={(e) => setPlayStyle(e.target.value)}
              placeholder="e.g. High-energy Fetch & Gentle Romping"
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>

          {/* Bio / About */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              About & Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other playmates about their personality, energy, and favorite games..."
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-900 focus:outline-none resize-none"
            />
          </div>

          {/* Quirks */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Unique Quirks & Habits
            </label>
            <input
              type="text"
              value={quirks}
              onChange={(e) => setQuirks(e.target.value)}
              placeholder="e.g. Does a happy tippy-tap dance before catching balls"
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>

          {/* Personality Tags */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Personality Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {personalityTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-coral-50 border border-coral-200 text-coral-700 text-xs font-bold"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="w-3.5 h-3.5 rounded-full hover:bg-coral-200/60 flex items-center justify-center text-coral-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="Add personality tag (e.g. FastRunner)"
                className="flex-1 px-3 py-1.5 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Favorite Toy */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Favorite Toy
            </label>
            <input
              type="text"
              value={favoriteToy}
              onChange={(e) => setFavoriteToy(e.target.value)}
              placeholder="e.g. ChuckIt Ultra Ball & Squeaky Duck"
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-sm shadow-lg shadow-coral-500/30 transition-all active:scale-95"
            >
              Save Pet Profile
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
