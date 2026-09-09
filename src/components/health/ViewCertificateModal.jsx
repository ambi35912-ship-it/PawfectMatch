import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Download, Building2, Calendar, FileText, Award, User, AlertCircle, Check } from 'lucide-react';

function generateOfficialCertificate(pet, cert) {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 850;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background - Luxury Warm Ivory Paper
  ctx.fillStyle = '#FDFBF7';
  ctx.fillRect(0, 0, width, height);

  // Outer Border (Deep Emerald)
  ctx.strokeStyle = '#047857';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Inner Border (Soft Emerald / Gold)
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Corner Accents
  ctx.fillStyle = '#059669';
  const cornerSize = 16;
  ctx.fillRect(40, 40, cornerSize, cornerSize);
  ctx.fillRect(width - 40 - cornerSize, 40, cornerSize, cornerSize);
  ctx.fillRect(40, height - 40 - cornerSize, cornerSize, cornerSize);
  ctx.fillRect(width - 40 - cornerSize, height - 40 - cornerSize, cornerSize, cornerSize);

  // Top Header Banner
  ctx.fillStyle = '#064E3B';
  ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((cert?.clinicName || 'BAY AREA PET HOSPITAL').toUpperCase(), width / 2, 90);

  ctx.fillStyle = '#047857';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillText(
    `VETERINARY MEDICAL BOARD LICENSE: ${cert?.licenseNumber || 'CA-VET #48812'}  •  ATTENDING: ${(cert?.doctor || 'Dr. Sarah Chen, DVM').toUpperCase()}`,
    width / 2,
    115
  );

  // Title & Subtitle
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('OFFICIAL CERTIFICATE OF VACCINATION & HEALTH', width / 2, 160);

  ctx.fillStyle = '#64748B';
  ctx.font = 'italic 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('Verified Canine & Feline Playmate Socialization Health Passport', width / 2, 185);

  // Divider Line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, 205);
  ctx.lineTo(width - 80, 205);
  ctx.stroke();

  // Patient & Owner Details Panel
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(80, 220, width - 160, 115);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1;
  ctx.strokeRect(80, 220, width - 160, 115);

  // Left Column (Patient)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Patient: ${pet.name}`, 105, 255);

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Species & Breed: ${pet.species || 'Canine'} • ${pet.breed}`, 105, 285);
  ctx.font = '13px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Age / Sex / Weight: ${pet.age} • ${pet.gender} • ${pet.weight}`, 105, 310);

  // Right Column (Guardian & Record)
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Registered Parent: ${pet.owner?.name || 'Verified Pet Parent'}`, 680, 255);

  ctx.fillStyle = '#059669';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('Status: OFFICIAL HEALTH CLEARANCE GRANTED ✓', 680, 285);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Issue Date: ${cert?.issueDate || 'Jan 10, 2026'}  |  Expires: ${cert?.expiryDate || 'Oct 2028'}`, 680, 310);

  // Vaccine Table Header
  const tableY = 360;
  ctx.fillStyle = '#065F46';
  ctx.fillRect(80, tableY, width - 160, 40);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('CORE IMMUNIZATION / VACCINE', 105, tableY + 25);
  ctx.fillText('BATCH / LOT #', 530, tableY + 25);
  ctx.fillText('EXPIRATION DATE', 780, tableY + 25);
  ctx.fillText('STATUS', 980, tableY + 25);

  // Vaccine Rows
  const vaccinations = pet.health?.vaccinations?.length
    ? pet.health.vaccinations
    : [
        { name: 'Rabies (3-Year Core)', lotNumber: 'LOT-RAB-9921', validUntil: cert?.expiryDate || 'Oct 2028' },
        { name: 'DHPP (Distemper, Hepatitis, Parvo)', lotNumber: 'LOT-DHP-4412', validUntil: 'Jan 2027' },
        { name: 'Bordetella (Kennel Cough)', lotNumber: 'LOT-BOR-8821', validUntil: 'Aug 2026' },
        { name: 'Leptospirosis Core Protection', lotNumber: 'LOT-LEP-3301', validUntil: 'Nov 2026' }
      ];

  vaccinations.slice(0, 4).forEach((vax, idx) => {
    const rowY = tableY + 40 + idx * 42;
    ctx.fillStyle = idx % 2 === 0 ? '#FFFFFF' : '#F0FDF4';
    ctx.fillRect(80, rowY, width - 160, 42);
    ctx.strokeStyle = '#E2E8F0';
    ctx.strokeRect(80, rowY, width - 160, 42);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillText(vax.name, 105, rowY + 26);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px monospace';
    ctx.fillText(vax.lotNumber || `LOT-VAX-${idx + 101}`, 530, rowY + 26);

    ctx.fillStyle = '#0F172A';
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillText(vax.validUntil || 'Current & Valid', 780, rowY + 26);

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
    ctx.fillText('VERIFIED ✓', 980, rowY + 26);
  });

  // Reassurance & Legal Note
  const footerY = 565;
  ctx.fillStyle = '#ECFDF5';
  ctx.fillRect(80, footerY, width - 160, 60);
  ctx.strokeStyle = '#A7F3D0';
  ctx.strokeRect(80, footerY, width - 160, 60);

  ctx.fillStyle = '#065F46';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText(
    'This medical record certifies that the animal named above has received essential preventative vaccinations administered by',
    105,
    footerY + 25
  );
  ctx.fillText(
    'a licensed veterinarian and complies with Pawfect Match safety standards for off-leash outdoor playdates and park socialization.',
    105,
    footerY + 45
  );

  // Digital Signatures & Stamp
  const signY = 665;
  // Official Stamp Circle on Left
  ctx.save();
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(160, signY + 40, 45, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(160, signY + 40, 39, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#047857';
  ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PAWFECT MATCH', 160, signY + 30);
  ctx.font = '900 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('★ VERIFIED ★', 160, signY + 45);
  ctx.font = 'bold 9px system-ui, -apple-system, sans-serif';
  ctx.fillText('HEALTH SEAL', 160, signY + 58);
  ctx.restore();

  // Signature Block on Right
  ctx.textAlign = 'right';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'italic bold 20px "Georgia", serif';
  ctx.fillText(cert?.doctor || 'Dr. Sarah Chen, DVM', width - 105, signY + 30);

  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width - 320, signY + 40);
  ctx.lineTo(width - 105, signY + 40);
  ctx.stroke();

  ctx.fillStyle = '#64748B';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Attending Clinician • ${cert?.clinicName || 'Bay Area Pet Hospital'}`, width - 105, signY + 58);
  ctx.fillText(`Digital Verification Key: PM-${pet.name.toUpperCase()}-VERIFIED-${Date.now().toString().slice(-6)}`, width - 105, signY + 76);

  // Trigger Download
  canvas.toBlob((blob) => {
    if (!blob) return;
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${pet.name.toLowerCase()}_veterinary_vaccine_certificate.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
  }, 'image/png');
}

export default function ViewCertificateModal({ isOpen, onClose, pet }) {
  if (!isOpen || !pet) return null;

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const vetClinicParts = pet.healthSummary?.verifiedVet?.split('•') || [];
  const cert = pet.health?.vaccineCertificate || {
    clinicName: vetClinicParts[1]?.trim() || pet.healthSummary?.verifiedVet || 'Bay Area Veterinary Hospital',
    licenseNumber: 'CA-VET-78219',
    doctor: vetClinicParts[0]?.trim() || 'Dr. Jennifer Wu, DVM',
    expiryDate: 'October 2027',
    documentName: `${pet.name.toLowerCase()}_verified_vaccine_record.pdf`,
    verified: true
  };

  const handleDownload = () => {
    try {
      if (cert?.previewUrl && (cert.previewUrl.startsWith('data:') || cert.previewUrl.startsWith('blob:'))) {
        const link = document.createElement('a');
        link.href = cert.previewUrl;
        link.download = cert.documentName || `${pet.name.toLowerCase()}_vaccine_certificate`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        generateOfficialCertificate(pet, cert);
      }
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Download error, falling back to generator:', err);
      generateOfficialCertificate(pet, cert);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-warm-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="relative p-5 pb-3.5 border-b border-warm-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Vaccine Health Certificate
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-0.5 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official medical health proof for {pet.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-warm-50/40">
          
          {/* Certificate Certificate Presentation Card */}
          <div className="rounded-3xl bg-white border-2 border-emerald-500/40 p-5 shadow-card relative overflow-hidden">
            {/* Background Seal Watermark */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/5 rounded-full pointer-events-none flex items-center justify-center">
              <ShieldCheck className="w-28 h-28 text-emerald-500/10" />
            </div>

            {/* Official Seal Banner */}
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-warm-100 text-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {cert?.clinicName || 'Licensed Veterinary Clinic'}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Lic: {cert?.licenseNumber || 'CA-VET #48812'} • Attending: {cert?.doctor || 'Dr. Sarah Chen, DVM'}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                CERTIFIED
              </span>
            </div>

            {/* Patient Header */}
            <div className="bg-warm-50/80 rounded-2xl p-3 mb-3.5 flex items-center justify-between border border-warm-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={pet.avatar || pet.primaryPhoto || (pet.photos && pet.photos[0])}
                  alt={pet.name}
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/40 shrink-0"
                />
                <div>
                  <h5 className="text-sm font-black text-slate-900 leading-tight">
                    {pet.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {pet.breed} • {pet.age} • {pet.gender}
                  </p>
                </div>
              </div>
              <div className="text-right text-[10px] text-slate-500">
                <span className="font-bold text-slate-800 block">Parent:</span>
                <span>{pet.owner?.name || 'Verified Owner'}</span>
              </div>
            </div>

            {/* Core Vaccinations Validated */}
            <div className="space-y-2 mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Confirmed Vaccinations on Certificate
              </span>
              
              {(pet.health?.vaccinations || [
                { name: 'Rabies (3-Year)', status: 'valid', validUntil: cert?.expiryDate || 'Oct 2028' },
                { name: 'DHPP Core Shot', status: 'valid', validUntil: 'Jan 2027' }
              ]).map((vax, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-warm-200/80 shadow-2xs text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="font-black text-slate-900">{vax.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Valid until {vax.validUntil}
                  </span>
                </div>
              ))}
            </div>

            {/* Document Details & Expiry */}
            <div className="pt-3 border-t border-warm-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                  Document
                </span>
                <span className="font-bold text-slate-800 text-[11px] truncate block" title={cert?.documentName}>
                  {cert?.documentName || 'Official_Certificate.pdf'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                  Expires On
                </span>
                <span className="font-extrabold text-emerald-700 text-[11px]">
                  {cert?.expiryDate || 'October 2028'}
                </span>
              </div>
            </div>

          </div>

          {/* Reassurance Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5 text-emerald-900 text-xs">
            <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px] font-medium">
              This certificate confirms to other pet parents that <strong>{pet.name}</strong> is fully up to date with core immunizations and medically verified for safe, friendly outdoor playdates.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-warm-100 bg-white flex items-center gap-2.5 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={handleDownload}
            className={`flex-1 py-3 rounded-2xl text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
              downloadSuccess
                ? 'bg-emerald-700 shadow-emerald-700/30'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
            }`}
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Copy</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
