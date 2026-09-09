import React from 'react';
import {
  User,
  ShieldCheck,
  Award,
  Settings,
  Bell,
  Sliders,
  ChevronRight,
  Plus,
  Heart,
  Dog,
  Smartphone,
  Sparkles,
  MapPin,
  Calendar,
  Check,
  Activity,
  Zap,
  CheckCircle2,
  ExternalLink,
  Edit3,
  Eye,
  LogIn,
  LogOut,
  Mail,
  Camera,
  FileText,
  UploadCloud
} from 'lucide-react';

export default function ProfileView({
  userPet,
  userPets = [],
  onSelectPet,
  isDeviceFrame,
  setIsDeviceFrame,
  onOpenDiscoverySettings,
  onOpenAddPet,
  onOpenEditProfile,
  onOpenNotificationSettings,
  currentUser = null,
  onOpenAuthModal,
  onSignOut,
  onUpdatePetPhoto,
  onViewCertificate,
  onUploadCertificate
}) {
  const handlePetPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdatePetPhoto?.(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 max-w-md mx-auto w-full pb-28 space-y-4">
      
      {/* Top Header Bar */}
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Profile & Family
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pet identity, digital passport & discovery
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black shadow-xs shrink-0">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>VIP Member</span>
        </div>
      </div>

      {/* LUXURY HERO PET PROFILE CARD */}
      <div className="shrink-0 rounded-[32px] bg-white border border-warm-200 shadow-card overflow-hidden relative">
        {/* Soft Decorative Ambient Top Header */}
        <div className="h-24 bg-gradient-to-r from-coral-500 via-rose-500 to-amber-500 relative p-4 flex items-start justify-between text-white">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/25 backdrop-blur-md text-white border border-white/20">
            Primary Playmate
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>96% Compatibility</span>
          </div>
        </div>

        {/* Pet Avatar & Identity Bar */}
        <div className="px-5 pt-0 pb-5 relative">
          <div className="flex items-end justify-between -mt-12 mb-3">
            <div className="relative group">
              <img
                src={userPet.avatar}
                alt={userPet.name}
                className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-slate-900"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white" title="Active">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <label
                className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center shadow-md cursor-pointer border-2 border-white transition-transform active:scale-95 group-hover:scale-110"
                title="Change Pet Profile Picture"
              >
                <Camera className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePetPhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-coral-600 bg-coral-50 px-2.5 py-1 rounded-full border border-coral-200/80">
                {userPet.weight} • {userPet.gender}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {userPet.name}
            </h2>
            <span className="text-lg font-light text-slate-500">
              {userPet.age}
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-600 mt-0.5">
            {userPet.breed} • <span className="text-slate-400">{userPet.neighborhood}</span>
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-warm-100 text-center">
            <div className="p-2 rounded-2xl bg-warm-50/80 border border-warm-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Playdates
              </span>
              <span className="text-sm font-black text-slate-900">14 Meetups</span>
            </div>
            <div className="p-2 rounded-2xl bg-warm-50/80 border border-warm-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Social Vibe
              </span>
              <span className="text-sm font-black text-coral-600">{userPet.energyLevel}</span>
            </div>
            <div className="p-2 rounded-2xl bg-warm-50/80 border border-warm-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Health Status
              </span>
              <span className="text-sm font-black text-emerald-600">Optimal</span>
            </div>
          </div>

          {/* Personality Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {userPet.personality.map((trait, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-xl bg-warm-100/70 text-slate-700 text-[11px] font-semibold"
              >
                #{trait}
              </span>
            ))}
          </div>

          {/* Play Style Notice */}
          <div className="mt-3 p-2.5 rounded-xl bg-coral-50/70 border border-coral-200/60 text-xs text-coral-900">
            <span className="font-bold">Play Style:</span> {userPet.playStyle}
          </div>
        </div>
      </div>

      {/* VETERINARY HEALTH CONFIRMATION & VACCINE CERTIFICATE CARD */}
      <div className="shrink-0 p-4 sm:p-5 rounded-3xl bg-white border border-emerald-200/80 shadow-card relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Health Confirmation
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Confirmed 🛡️
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {userPet.health?.vaccineCertificate?.clinicName || 'Bay Area Pet Hospital'}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 border border-emerald-200/60">
            Valid thru {userPet.health?.vaccineCertificate?.expiryDate || 'Oct 2028'}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 mb-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="font-extrabold text-slate-900 block truncate">
                {userPet.health?.vaccineCertificate?.documentName || `${userPet.name}_Official_Vaccine_Certificate.pdf`}
              </span>
              <span className="text-[10px] text-slate-500">
                Official document uploaded • Core rabies & distemper verified
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewCertificate?.(userPet)}
            className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>View Certificate</span>
          </button>

          <button
            onClick={() => onUploadCertificate?.(userPet)}
            className="py-2.5 px-3 rounded-xl bg-warm-100 hover:bg-warm-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
          >
            <UploadCloud className="w-3.5 h-3.5 text-slate-600" />
            <span>Renew / Update</span>
          </button>
        </div>
      </div>



      {/* MULTI-PET REGISTERED FAMILY */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Registered Pets ({userPets.length})
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Tap card to switch active pet
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {userPets.map((pet) => {
            const isActive = pet.id === userPet.id;
            return (
              <button
                key={pet.id}
                onClick={() => onSelectPet(pet)}
                className={`flex items-center gap-2.5 p-2.5 pr-4 rounded-2xl border-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-white border-coral-500 shadow-md ring-2 ring-coral-400/20'
                    : 'bg-white border-warm-200/80 hover:bg-warm-50 text-slate-600'
                }`}
              >
                <img
                  src={pet.avatar}
                  alt={pet.name}
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-slate-900 block leading-tight">
                      {pet.name}
                    </span>
                    {isActive && <Check className="w-3.5 h-3.5 text-coral-500 stroke-[3]" />}
                  </div>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-coral-600' : 'text-slate-400'}`}>
                    {isActive ? 'Active in Deck' : pet.breed}
                  </span>
                </div>
              </button>
            );
          })}

          <button
            onClick={onOpenAddPet}
            className="flex items-center gap-2 p-2.5 pr-4 rounded-2xl bg-warm-100/80 hover:bg-warm-200 border border-warm-200 text-slate-700 text-xs font-bold transition-colors shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <span>Add Pet</span>
          </button>
        </div>
      </div>

      {/* TEMPERAMENT & PLAY RADAR BARS */}
      <div className="shrink-0 p-4 rounded-3xl bg-white border border-warm-200 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            {userPet.name}'s Play & Social Profile
          </span>
          <span className="text-[11px] font-extrabold text-coral-600 flex items-center gap-0.5">
            <Zap className="w-3 h-3 text-amber-500" />
            Vibe Harmony
          </span>
        </div>

        <div className="space-y-2.5">
          {[
            { label: 'Energy & Zoomie Stamina', value: 92, color: 'from-amber-400 to-coral-500' },
            { label: 'Dog Pack Social Harmony', value: 98, color: 'from-emerald-400 to-teal-500' },
            { label: 'Human Manners & Greeting', value: 95, color: 'from-sky-400 to-indigo-500' },
            { label: 'Water & Beach Splash Love', value: 88, color: 'from-cyan-400 to-blue-500' },
            { label: 'Toy Sharing & Fetch Focus', value: 94, color: 'from-coral-400 to-rose-500' }
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>{item.label}</span>
                <span className="text-slate-900">{item.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-warm-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PET PARENT PROFILE CARD */}
      <div className="shrink-0 p-4 rounded-3xl bg-white border border-warm-200 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Pet Parent Account
            </span>
            {currentUser ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Supabase
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-warm-100 text-slate-600 border border-warm-200 text-[10px] font-bold">
                Guest Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEditProfile}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 py-1 px-1.5"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            {currentUser ? (
              <button
                onClick={onSignOut}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 py-1 px-2 rounded-lg bg-rose-50 hover:bg-rose-100"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="text-xs font-extrabold text-coral-600 hover:text-coral-700 transition-colors flex items-center gap-1 py-1 px-2 rounded-lg bg-coral-50 hover:bg-coral-100"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={userPet.owner.avatar}
              alt={userPet.owner.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-warm-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-slate-900">
                  {userPet.owner.name}
                </h3>
                <span className="p-0.5 rounded-full bg-emerald-50 text-emerald-600" title="Verified Human">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {currentUser?.email ? (
                  <span className="font-medium text-slate-700">{currentUser.email}</span>
                ) : (
                  <>Member since {userPet.owner.memberSince} • 100% Response</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Guest sign in banner */}
        {!currentUser && (
          <div className="mt-3 p-3 rounded-2xl bg-coral-50/70 border border-coral-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-coral-900 block">
                Save & sync with Supabase
              </span>
              <span className="text-[10px] text-coral-700">
                Secure cloud account for your pet profiles
              </span>
            </div>
            <button
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-black text-xs shadow-xs transition-transform active:scale-95 shrink-0"
            >
              Sign In / Up
            </button>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-warm-100 text-xs text-slate-600">
          <strong>Best Meetup Times:</strong> {userPet.owner.preferredTimes}
        </div>
      </div>

      {/* PREFERENCES & CONTROLS */}
      <div className="shrink-0 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Preferences & Controls
        </span>

        <button
          onClick={onOpenDiscoverySettings}
          className="w-full p-3.5 rounded-2xl bg-white border border-warm-200 shadow-xs flex items-center justify-between hover:bg-warm-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-extrabold text-slate-900 block">
                Discovery Matching Filters
              </span>
              <span className="text-[11px] text-slate-500">
                Radius, species, play tempo
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setIsDeviceFrame(!isDeviceFrame)}
          className="w-full p-3.5 rounded-2xl bg-white border border-warm-200 shadow-xs flex items-center justify-between hover:bg-warm-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-extrabold text-slate-900 block">
                Mobile Mockup Frame
              </span>
              <span className="text-[11px] text-slate-500">
                {isDeviceFrame ? 'iPhone 16 Pro Shell (Active)' : 'Full Edge-to-Edge Responsive'}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-coral-600">
            {isDeviceFrame ? 'Full View' : 'Phone View'}
          </span>
        </button>

        <button
          onClick={onOpenNotificationSettings}
          className="w-full p-3.5 rounded-2xl bg-white border border-warm-200 shadow-xs flex items-center justify-between hover:bg-warm-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-extrabold text-slate-900 block">
                Notification Preferences
              </span>
              <span className="text-[11px] text-slate-500">
                Playdate RSVPs & vaccine expiry alerts
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* App Branding Footer */}
      <div className="text-center py-4 border-t border-warm-200/60 mt-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-700">
          <span>🐾 Pawfect Match</span>
          <span className="text-slate-400">• v1.0.0</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Crafted for happy pets & connected pet parents
        </p>
      </div>

    </div>
  );
}
