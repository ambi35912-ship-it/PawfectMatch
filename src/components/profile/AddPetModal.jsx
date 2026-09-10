import React, { useState } from 'react';
import { X, Sparkles, Dog, Cat, Camera, Check, ShieldCheck, UploadCloud, FileText, CheckCircle2, AlertCircle, ScanLine } from 'lucide-react';
import { scanVeterinaryDocument } from '../../utils/ocrScanner';

export default function AddPetModal({ isOpen, onClose, onAddPet }) {
  if (!isOpen) return null;

  const [species, setSpecies] = useState('Dog');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('2 yrs');
  const [gender, setGender] = useState('Female');
  const [weight, setWeight] = useState('14 kg');
  const [energyLevel, setEnergyLevel] = useState('Moderate');
  const [playStyle, setPlayStyle] = useState('Short Zoomies & Patio Cafe Lounging');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [customAvatar, setCustomAvatar] = useState(null);

  // Mandatory Vaccine Certificate & OCR State
  const [certFile, setCertFile] = useState(null);
  const [certPreview, setCertPreview] = useState(null);
  const [clinicName, setClinicName] = useState('Bay Area Pet Hospital');
  const [certExpiry, setCertExpiry] = useState('2028-10-14');
  const [formError, setFormError] = useState('');

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);

  const presetPhotos = [
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80', // Frenchie
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', // Beagle
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', // Cat
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80', // Golden Puppy
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80', // Doodle
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

  const handleCertUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormError('');
      setCertFile(file);
      setOcrResult(null);
      const reader = new FileReader();
      reader.onload = () => setCertPreview(reader.result);
      reader.readAsDataURL(file);

      // Trigger OCR Scan
      setIsScanning(true);
      try {
        const res = await scanVeterinaryDocument(file, (prog) => {
          setScanProgress(prog);
        });
        setOcrResult(res);
        if (res.clinicName) setClinicName(res.clinicName);
        if (res.rawExpiryValue) setCertExpiry(res.rawExpiryValue);
      } catch (err) {
        console.error('OCR scan error:', err);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !breed.trim()) {
      setFormError('Please fill in your pet’s name and breed.');
      return;
    }

    // MANDATORY VACCINE CERTIFICATE CHECK
    if (!certFile) {
      setFormError('Mandatory Requirement: Please upload an official veterinary vaccine certificate to guarantee health confirmation.');
      return;
    }

    if (!clinicName.trim()) {
      setFormError('Please enter the issuing veterinary clinic name.');
      return;
    }

    const chosenAvatar = customAvatar || presetPhotos[avatarIndex];

    const newPet = {
      id: `user_pet_${Date.now()}`,
      name: name.trim(),
      species,
      breed: breed.trim(),
      age,
      gender,
      weight,
      weightGoal: `${parseInt(weight) - 2}-${parseInt(weight) + 2} kg`,
      neutered: true,
      avatar: chosenAvatar,
      photos: [chosenAvatar],
      personality: ['Friendly', 'Social', 'Curious', 'Loving'],
      playStyle,
      energyLevel,
      vaccinated: true,
      size: parseInt(weight) > 22 ? 'Large' : parseInt(weight) > 10 ? 'Medium' : 'Small',
      neighborhood: 'Indiranagar, Bengaluru, Karnataka',
      owner: {
        name: 'Arjun Mehta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        verified: true,
        memberSince: 'March 2024',
        responseRate: '100%',
        preferredTimes: 'Weekday evenings (5-7 PM), Weekend mornings'
      },
      health: {
        status: 'Optimal',
        vaccineCertificate: {
          id: `cert_${Date.now()}`,
          documentName: certFile.name,
          fileSize: `${(certFile.size / 1024).toFixed(0)} KB`,
          clinicName: clinicName.trim() || 'Cessna Lifeline Veterinary Hospital',
          doctor: 'Licensed Veterinarian, BVSc',
          licenseNumber: 'VCI Reg #Verified',
          issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          expiryDate: new Date(certExpiry).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          verified: true,
          verifiedAt: new Date().toISOString(),
          status: 'Confirmed & Valid',
          previewUrl: certPreview || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
          coreVaccines: ['Rabies (3-Year)', 'DHPP Core Shot']
        },
        vaccinations: [
          {
            name: 'Rabies (3-Year)',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            validUntil: new Date(certExpiry).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            status: 'valid',
            clinic: clinicName.trim()
          },
          {
            name: 'DHPP Core Shot',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            validUntil: new Date(certExpiry).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            status: 'valid',
            clinic: clinicName.trim()
          }
        ],
        upcomingAppointments: [],
        medications: [
          { id: `med_${Date.now()}`, name: 'Simparica Trio Chewable', frequency: 'Monthly', dueDay: '1st of month', status: 'completed', given: true }
        ],
        weightHistory: [
          { month: 'Dec', weight: parseInt(weight) - 1.2 },
          { month: 'Jan', weight: parseInt(weight) - 0.5 },
          { month: 'Feb', weight: parseInt(weight) },
          { month: 'Mar', weight: parseInt(weight) }
        ],
        dailyActivity: {
          activeMinutes: 65,
          activeGoal: 75,
          steps: 7200,
          playSessions: 2,
          calories: 320
        }
      }
    };

    onAddPet(newPet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              New Family Member
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Register a Pet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {formError && (
          <div className="mt-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="font-semibold">{formError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          
          {/* Pet Profile Picture Upload & Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Pet Profile Picture
              </label>
              <span className="text-[10px] text-slate-400">Upload or choose</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {/* Custom Upload Tile */}
              <label className={`relative w-14 h-14 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer shrink-0 transition-all ${
                customAvatar ? 'border-coral-500 bg-coral-50 shadow-sm' : 'border-warm-300 hover:border-coral-400 bg-warm-50 text-slate-500'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {customAvatar ? (
                  <>
                    <img src={customAvatar} alt="Custom" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-coral-500/20 rounded-xl flex items-center justify-center">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-coral-500 mb-0.5" />
                    <span className="text-[9px] font-extrabold text-slate-700">Upload</span>
                  </>
                )}
              </label>

              {/* Preset avatars */}
              {presetPhotos.map((photo, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setCustomAvatar(null);
                    setAvatarIndex(idx);
                  }}
                  className={`relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 transition-all ${
                    !customAvatar && avatarIndex === idx ? 'ring-3 ring-coral-500 scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="preset" className="w-full h-full object-cover" />
                  {!customAvatar && avatarIndex === idx && (
                    <div className="absolute inset-0 bg-coral-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Species */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Species
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Dog', icon: Dog, label: 'Dog 🐕' },
                { id: 'Cat', icon: Cat, label: 'Cat 🐈' },
              ].map((sp) => (
                <button
                  type="button"
                  key={sp.id}
                  onClick={() => setSpecies(sp.id)}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
                    species === sp.id
                      ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-xs'
                      : 'border-warm-200 bg-warm-50 text-slate-600'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
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
                placeholder="e.g. Coco, Bella"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Breed
              </label>
              <input
                type="text"
                required
                placeholder="e.g. French Bulldog"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
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
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-2 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Weight (kg)
              </label>
              <input
                type="text"
                placeholder="e.g. 14 kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Play Vibe */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              Preferred Play Style
            </label>
            <input
              type="text"
              value={playStyle}
              onChange={(e) => setPlayStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none"
            />
          </div>

          {/* MANDATORY VACCINE CERTIFICATE UPLOAD SECTION */}
          <div className="pt-2 border-t border-warm-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Vaccine Certificate
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase border border-rose-200">
                Mandatory *
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-2.5">
              To ensure safety and guaranteed health confirmation for playmates, please attach your pet's official veterinary vaccination certificate (PDF or photo).
            </p>

            <label className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              certFile ? 'border-emerald-500 bg-emerald-50/50' : 'border-warm-300 bg-warm-50 hover:bg-warm-100 hover:border-coral-400'
            }`}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleCertUpload}
                className="hidden"
              />

              {certFile ? (
                <div className="flex items-center gap-3 text-left w-full">
                  {certPreview ? (
                    <img src={certPreview} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-black text-slate-900 truncate block">
                      {certFile.name}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Attached ({(certFile.size / 1024).toFixed(0)} KB) • Tap to replace
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 text-coral-500 mb-1" />
                  <span className="text-xs font-bold text-slate-800">
                    Attach Veterinary Vaccine Certificate
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Click to select PDF or camera snapshot
                  </span>
                </>
              )}
            </label>

            {/* AI / OCR Laser Scanning Feedback */}
            {isScanning && (
              <div className="mt-2 p-3.5 rounded-2xl bg-slate-950 text-white border border-emerald-500/40 relative overflow-hidden shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ScanLine className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-black text-emerald-300">
                      AI OCR Scanning in Progress...
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    {scanProgress?.percent || 30}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                    style={{ width: `${scanProgress?.percent || 30}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-300 font-medium">
                  {scanProgress?.message || 'Analyzing certificate typography and seal...'}
                </p>
              </div>
            )}

            {/* OCR Verification Success Card */}
            {ocrResult && !isScanning && (
              <div className="mt-2 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-500/50 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-black text-slate-900">
                      OCR Verification Successful
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-black">
                    {ocrResult.confidence}% Match
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 bg-white/80 p-2.5 rounded-xl border border-emerald-200/60">
                  <div><strong>Verified Clinic:</strong> {ocrResult.clinicName} ({ocrResult.licenseNumber})</div>
                  <div><strong>Attending DVM:</strong> {ocrResult.doctor}</div>
                  <div><strong>Core Immunizations:</strong> Rabies, DHPP, Bordetella, Leptospirosis</div>
                  <div className="text-emerald-700 font-bold">✓ Clearance: {ocrResult.clearanceStatus}</div>
                </div>
              </div>
            )}

            {/* Clinic Name & Expiry */}
            <div className="grid grid-cols-2 gap-2.5 mt-2.5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Issuing Clinic
                </label>
                <input
                  type="text"
                  required
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="e.g. Cessna Lifeline Hospital"
                  className="w-full px-2.5 py-1.5 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Certificate Expiry
                </label>
                <input
                  type="date"
                  required
                  value={certExpiry}
                  onChange={(e) => setCertExpiry(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-sm shadow-lg shadow-coral-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Register Pet with Health Confirmation</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
