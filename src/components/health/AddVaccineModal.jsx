import React, { useState } from 'react';
import { X, ShieldCheck, Stethoscope, MapPin, Phone, Calendar, Hash } from 'lucide-react';

export default function AddVaccineModal({ isOpen, onClose, onAddVaccine }) {
  if (!isOpen) return null;

  const [name, setName] = useState('Bordetella (Kennel Cough)');
  const [date, setDate] = useState('Sep 09, 2026');
  const [validUntil, setValidUntil] = useState('Sep 2027');
  
  // Clinic details matching the upcoming vet visit bubble
  const [clinic, setClinic] = useState('Marina Vet Clinic');
  const [doctor, setDoctor] = useState('Dr. Sarah Chen, DVM');
  const [address, setAddress] = useState('2240 Lombard St, San Francisco, CA');
  const [phone, setPhone] = useState('(415) 555-0192');
  const [lotNumber, setLotNumber] = useState('LOT-88219-BC');

  const presetVaccines = [
    'Bordetella (Kennel Cough)',
    'Rabies (3-Year)',
    'DHPP Core Shot',
    'Leptospirosis',
    'Canine Influenza (CIV)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVaccine({
      name,
      date,
      validUntil,
      status: 'valid',
      clinic,
      doctor,
      address,
      phone,
      lotNumber
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-warm-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Official Passport Record
              </span>
              <h3 className="text-base font-black text-slate-900">
                Add Vaccination & Clinic Details
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

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5">
          
          {/* Quick Preset Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Vaccine Name
            </label>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-2">
              {presetVaccines.map((vax) => (
                <button
                  type="button"
                  key={vax}
                  onClick={() => setName(vax)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all ${
                    name === vax
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs'
                      : 'bg-warm-50 border-warm-200 text-slate-600 hover:bg-warm-100'
                  }`}
                >
                  {vax}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Date Administered</span>
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Valid Until (Expiry)</span>
              </label>
              <input
                type="text"
                required
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs font-bold text-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Detailed Clinic & Doctor Info matching Vet Visit Bubble */}
          <div className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200/80 space-y-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Clinic & Attending Veterinarian Information
            </span>

            {/* Clinic Name & Doctor */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-600 mb-1 block">
                  Clinic Name
                </label>
                <input
                  type="text"
                  required
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Stethoscope className="w-3 h-3 text-coral-500" />
                  <span>Attending Doctor</span>
                </label>
                <input
                  type="text"
                  required
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-warm-200 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Clinic Full Address</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Phone & Lot Number */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>Clinic Direct Phone</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-warm-200 text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Hash className="w-3 h-3 text-slate-400" />
                  <span>Vaccine Lot #</span>
                </label>
                <input
                  type="text"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-warm-200 text-xs font-mono font-medium text-slate-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
            >
              Verify & Add to Vaccine Passport
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
