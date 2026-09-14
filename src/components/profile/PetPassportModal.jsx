import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  QrCode,
  Copy,
  Check,
  Share2,
  AlertTriangle,
  Phone,
  Stethoscope,
  Heart,
  Download,
  ExternalLink,
  Eye,
  Sparkles
} from 'lucide-react';
import QRCode from 'qrcode';

export default function PetPassportModal({ isOpen, onClose, pet, onCopy }) {
  const [copiedField, setCopiedField] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showLostPetSimulator, setShowLostPetSimulator] = useState(false);

  const microchipNumber = '985141002948123';
  const rabiesTag = 'SF-2026-R8841';
  const passportUrl = pet
    ? `https://pawfectmatch.app/passport/${pet.id}?name=${encodeURIComponent(pet.name)}&chip=${microchipNumber}`
    : '';

  useEffect(() => {
    if (!isOpen || !pet) return undefined;
    QRCode.toDataURL(passportUrl, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR generation failed:', err));
    return undefined;
  }, [isOpen, pet, passportUrl]);

  if (!isOpen || !pet) return null;

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedField(field);
    onCopy?.(text);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${pet.name.toLowerCase()}_emergency_qr_tag.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onCopy?.(`Downloaded ${pet.name}'s QR tag image`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Official Digital Pet ID
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Emergency Pet Passport
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LOST PET SIMULATOR PREVIEW OVERLAY */}
        {showLostPetSimulator ? (
          <div className="py-4 space-y-3">
            <div className="p-4 rounded-3xl bg-slate-900 text-white shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  QR Scan Result Preview
                </span>
                <button
                  onClick={() => setShowLostPetSimulator(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Back to Card
                </button>
              </div>

              <div className="text-center py-2">
                <img
                  src={pet.avatar}
                  alt={pet.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-coral-500 mb-2"
                />
                <h3 className="text-xl font-black text-white">Found {pet.name}?</h3>
                <p className="text-xs text-slate-300">
                  {pet.breed} • Parent: {pet.owner?.name || 'Alex Rivera'}
                </p>
                <div className="mt-3 p-2.5 rounded-2xl bg-white/10 text-xs text-amber-300">
                  ⚠️ <strong>Special Medical Note:</strong> Allergic to chicken meal. Grain-free diet only.
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <a
                  href="tel:4155550192"
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Owner: (415) 555-0192</span>
                </a>
                <a
                  href="tel:4155550911"
                  className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Stethoscope className="w-4 h-4 text-rose-400" />
                  <span>Call 24/7 SF Animal Care</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Luxury Passport Card with Gold Trims */}
            <div className="my-4 p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white shadow-xl relative overflow-hidden border border-amber-400/30">
              <div className="absolute right-3 top-3 w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center text-[10px] font-mono text-amber-300 rotate-12 opacity-80 pointer-events-none">
                VERIFIED
              </div>

              <div className="flex items-center gap-3.5 relative z-10">
                <img
                  src={pet.avatar}
                  alt={pet.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/60 shadow-md"
                />
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="text-2xl font-black tracking-tight text-white">{pet.name}</h3>
                    <span className="text-xs text-amber-300 font-bold">({pet.gender})</span>
                  </div>
                  <p className="text-xs text-slate-300">{pet.breed} • {pet.age}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    Vaccines Documented
                  </span>
                </div>
              </div>

              {/* Microchip & Tag Codes with Functional Copy */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 relative z-10">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                    ISO Microchip ID
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs font-mono font-bold text-amber-200 truncate">
                      {microchipNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(microchipNumber, 'chip')}
                      className="text-slate-400 hover:text-white p-0.5"
                      title="Copy Microchip"
                    >
                      {copiedField === 'chip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                    City Rabies Tag
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs font-mono font-bold text-amber-200">
                      {rabiesTag}
                    </span>
                    <button
                      onClick={() => handleCopy(rabiesTag, 'tag')}
                      className="text-slate-400 hover:text-white p-0.5"
                      title="Copy Rabies Tag"
                    >
                      {copiedField === 'tag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* REAL SCANNABLE QR CODE SECTION */}
              <div className="mt-4 p-4 rounded-2xl bg-white text-slate-900 text-center relative z-10 shadow-sm border border-warm-200">
                <div className="w-44 h-44 mx-auto bg-white rounded-2xl p-2 border-2 border-dashed border-warm-300 flex items-center justify-center shadow-inner">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Scannable Pet Emergency QR Code"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <QrCode className="w-20 h-20 text-slate-800" />
                  )}
                </div>

                <div className="mt-2.5">
                  <span className="text-xs font-black text-slate-900 block">
                    Active Emergency QR Code
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
                    Scannable by any smartphone camera at dog parks or in medical emergencies.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3 pt-2.5 border-t border-warm-100">
                  <button
                    onClick={() => setShowLostPetSimulator(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-700 text-xs font-bold transition-colors active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Test Scan Result</span>
                  </button>
                  <button
                    onClick={handleDownloadQR}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs active:scale-95"
                    title="Download Collar Tag"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Save QR Tag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Medical & Dietary Critical Notes */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Emergency Instructions & Allergies
              </span>

              <div className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200/80 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Dietary Restrictions:</strong> Grain-free salmon & sweet potato only. Allergic to chicken meal.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Stethoscope className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Primary Clinic:</strong> Cessna Lifeline Veterinary Hospital • +91 80 4115 1234 (Dr. Priya Sharma)
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>24/7 Emergency Hospital:</strong> Cessna 24/7 Animal Emergency Care • +91 80 4115 1234
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex gap-2">
              <button
                onClick={handleDownloadQR}
                className="flex-1 py-3 px-3 rounded-2xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Tag</span>
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${pet.name}'s Pawfect Match Emergency Passport`,
                      url: passportUrl
                    }).catch(() => {});
                  } else {
                    handleCopy(passportUrl, 'url');
                  }
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-coral-500/25 transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Passport</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
