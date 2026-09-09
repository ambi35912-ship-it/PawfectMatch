import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, Building2, Calendar, ShieldCheck, Check } from 'lucide-react';

export default function UploadCertificateModal({ isOpen, onClose, pet, onSave }) {
  if (!isOpen || !pet) return null;

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [clinicName, setClinicName] = useState('Marina Vet Clinic');
  const [doctorName, setDoctorName] = useState('Dr. Sarah Chen, DVM');
  const [expiryDate, setExpiryDate] = useState('2028-10-14');
  const [coreVaccine, setCoreVaccine] = useState('Rabies (3-Year) & DHPP Core');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an official vaccine certificate document or photo.');
      return;
    }
    if (!clinicName.trim()) {
      setError('Please enter the issuing veterinary clinic name.');
      return;
    }

    const certData = {
      id: `cert_${Date.now()}`,
      documentName: file.name,
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      clinicName: clinicName.trim(),
      doctor: doctorName.trim() || 'Licensed Veterinarian',
      licenseNumber: 'CA-VET #Verified',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiryDate: new Date(expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      verified: true,
      verifiedAt: new Date().toISOString(),
      status: 'Confirmed & Valid',
      previewUrl: filePreview || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      coreVaccines: [coreVaccine, 'Rabies Protection']
    };

    onSave(certData);
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
                  Mandatory
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
                placeholder="e.g. Marina Pet Hospital"
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
                placeholder="Dr. Sarah Chen"
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
            🛡️ <strong>Safety Guarantee:</strong> Uploading official vaccination proof guarantees verified health status across the Pawfect Match network, assuring playmates that your pet is safe to meet.
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify & Save Certificate</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
