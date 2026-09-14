import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, Building2, Calendar, ShieldCheck, Check, Sparkles, ScanLine, Award } from 'lucide-react';
import { prepareVeterinaryDocument } from '../../utils/documentIntake';
import { uploadVeterinaryDocument } from '../../lib/documentStorage';

export default function UploadCertificateModal({ isOpen, onClose, pet, onSaveCertificate, currentUserId }) {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [clinicName, setClinicName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [coreVaccine, setCoreVaccine] = useState('Rabies (3-Year) & DHPP Core');
  const [error, setError] = useState('');

  // Safe document intake state. Verification is performed by a human reviewer.
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !pet) return null;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setFile(selectedFile);
    setOcrResult(null);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }

    // Validate and fingerprint the file; do not fabricate medical verification.
    setIsScanning(true);
    try {
      const res = await prepareVeterinaryDocument(selectedFile, (prog) => {
        setScanProgress(prog);
      });
      setOcrResult(res);
    } catch (err) {
      setError(err.message || 'Unable to prepare this document.');
      setFile(null);
      setFilePreview(null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an official vaccine certificate document or photo.');
      return;
    }
    if (!clinicName.trim()) {
      setError('Please enter the issuing veterinary clinic name.');
      return;
    }

    if (!currentUserId) {
      setError('Sign in before submitting a private veterinary document.');
      return;
    }

    setIsSubmitting(true);
    let storagePath;
    try {
      storagePath = await uploadVeterinaryDocument({ userId: currentUserId, petId: pet.id, file });
    } catch (uploadError) {
      setError(uploadError.message);
      setIsSubmitting(false);
      return;
    }

    const certData = {
      id: `cert_${Date.now()}`,
      documentName: file.name,
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      clinicName: clinicName.trim(),
      doctor: doctorName.trim() || null,
      licenseNumber: null,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiryDate: new Date(expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      verified: false,
      reviewStatus: 'pending',
      submittedAt: new Date().toISOString(),
      status: 'Pending veterinary review',
      documentChecksum: ocrResult?.checksum || null,
      storagePath,
      coreVaccines: [coreVaccine]
    };

    onSaveCertificate(certData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-warm-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 pb-3.5 border-b border-warm-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Upload Vaccine Certificate
                </h3>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase border border-emerald-300">
                  Review required
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official health proof for {pet.name}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Mandatory File Upload Box */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-1.5 flex items-center justify-between">
              <span>Attach Certificate File (PDF or Image)</span>
              <span className="text-[10px] text-rose-600 font-extrabold">* Required</span>
            </label>

            <label className={`border-2 border-dashed rounded-3xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              file ? 'border-emerald-500 bg-emerald-50/50' : 'border-warm-300 bg-warm-50 hover:bg-warm-100 hover:border-coral-400'
            }`}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {file ? (
                <div className="flex flex-col items-center gap-2 text-emerald-900">
                  {filePreview ? (
                    <img src={filePreview} alt="Preview" className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-emerald-400 mb-1" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                  <div className="text-center">
                    <span className="text-xs font-black truncate max-w-xs block text-slate-900">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Document Ready ({(file.size / 1024).toFixed(0)} KB) • Tap to replace
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-warm-200/80 text-coral-600 flex items-center justify-center mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 block">
                    Upload Veterinary Vaccine Document
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-xs">
                    Upload a scan, photo, or PDF of your pet's rabies certificate or vaccination passport
                  </p>
                  <span className="mt-2 text-[11px] font-bold text-coral-600 bg-coral-50 px-3 py-1 rounded-full border border-coral-200">
                    Browse Files or Camera
                  </span>
                </>
              )}
            </label>

            {/* Document validation feedback */}
            {isScanning && (
              <div className="mt-2.5 p-3.5 rounded-2xl bg-slate-950 text-white border border-emerald-500/40 relative overflow-hidden shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ScanLine className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-black text-emerald-300">
                      Preparing document…
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
                  {scanProgress?.message || 'Validating the uploaded document…'}
                </p>
              </div>
            )}

            {/* Review status card */}
            {ocrResult && !isScanning && (
              <div className="mt-2.5 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-500/50 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-black text-slate-900">
                      Ready for review
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">Pending</span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 bg-white/80 p-2.5 rounded-xl border border-emerald-200/60">
                  <div>{ocrResult.message}</div>
                  <div className="font-mono text-[9px] break-all">Fingerprint: {ocrResult.checksum || 'Unavailable'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Clinic Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Issuing Veterinary Clinic</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                placeholder="e.g. Cessna Lifeline Hospital"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          {/* Doctor & Core Vaccine */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Attending Vet</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Dr. Priya Sharma, BVSc"
                className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Certificate Valid Until</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Explanation Callout */}
          <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200 text-slate-600 text-[11px] leading-relaxed">
            🛡️ <strong>Review policy:</strong> Uploading a document does not verify its medical contents. Pawfect Match marks it pending until a qualified reviewer confirms it.
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Uploading securely…' : 'Submit Certificate for Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
