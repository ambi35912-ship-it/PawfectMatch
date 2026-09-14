import React, { useState } from 'react';
import {
  ShieldCheck,
  HeartPulse,
  Calendar,
  Pill,
  Scale,
  Flame,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  ChevronRight,
  Sparkles,
  Plus,
  AlertTriangle,
  BellRing,
  RefreshCw,
  MapPin,
  Stethoscope
} from 'lucide-react';
import { evaluateVaccineRecords } from '../../utils/vaccineExpiryEngine';

export default function HealthDashboard({
  userPet,
  onCallClinic,
  onAddToCalendar,
  onOpenLogWeight,
  onOpenAddVaccine,
  onToggleMed,
  onViewCertificate,
  onUploadCertificate
}) {
  const weightData = userPet.health.weightHistory;
  const [selectedPoint, setSelectedPoint] = useState(weightData.length - 1);
  const currentWeight = weightData[selectedPoint] || weightData[weightData.length - 1];

  // Evaluate uploaded vaccination passport records for expired & due dates
  const vaxReport = evaluateVaccineRecords(userPet.health.vaccinations);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 max-w-md mx-auto w-full pb-28 space-y-4">
      
      {/* Top Title Header */}
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Pet Health & Wellness
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Passport records, overdue alerts & vitality
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status: {vaxReport.hasOverdue ? 'Action Needed' : 'Up to Date'}</span>
        </div>
      </div>

      {/* VETERINARY CERTIFICATE CONFIRMATION BANNER */}
      <div className="shrink-0 p-3.5 rounded-3xl bg-emerald-50 border border-emerald-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-900 truncate">
                {userPet.health?.vaccineCertificate?.verified ? 'Health Confirmed' : 'Review Pending'}
              </span>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                {userPet.health?.vaccineCertificate?.verified ? 'Official Cert' : 'Unverified'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 truncate">
              {userPet.health?.vaccineCertificate?.clinicName || 'Bay Area Pet Hospital'} • Valid thru {userPet.health?.vaccineCertificate?.expiryDate || 'Oct 2028'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onViewCertificate?.(userPet)}
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-100/50 text-emerald-800 font-extrabold text-[11px] border border-emerald-200 transition-colors shadow-2xs"
          >
            View Doc
          </button>
          <button
            onClick={() => onUploadCertificate?.(userPet)}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-2xs"
          >
            Renew
          </button>
        </div>
      </div>

      {/* UPLOADED VACCINATION PASSPORT OVERDUE & EXPIRY ALERT BANNER */}
      {vaxReport.hasOverdue && (
        <div className="shrink-0 p-4 rounded-3xl bg-rose-50 border-2 border-rose-200 shadow-card relative overflow-hidden">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20 shrink-0">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
                  Vaccine Overdue Notice
                </span>
                <h3 className="text-sm font-black text-slate-900">
                  {vaxReport.overdueList.length} Vaccine Expired on Uploaded Passport
                </h3>
              </div>
            </div>

            <button
              onClick={onOpenAddVaccine}
              className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 underline decoration-rose-300 underline-offset-2 shrink-0 py-1"
            >
              Update Record
            </button>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed mb-3">
            According to your uploaded veterinary records, the booster interval for the following vaccine has ended. A renewal checkup is required for <strong>{userPet.name}</strong>:
          </p>

          <div className="space-y-2">
            {vaxReport.overdueList.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white border border-rose-200 shadow-xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">
                      {item.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-700">
                      Overdue
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Expired {item.validUntil} • Administered at {item.clinic}
                  </p>
                </div>

                <button
                  onClick={() => onAddToCalendar({
                    title: `Vet Appointment: ${item.name} Booster for ${userPet.name}`,
                    location: item.clinic,
                    description: `Vaccine renewal booster for ${item.name}. Expired ${item.validUntil} according to uploaded passport.`
                  })}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200/80 flex items-center gap-1 shrink-0 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reminder</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Quick Summary Card: Pet identity + Vitals */}
      <div className="shrink-0 p-4 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-36 h-36 bg-coral-500/10 rounded-full blur-2xl" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <img
              src={userPet.avatar}
              alt={userPet.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-coral-500/80"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-black tracking-tight">{userPet.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20">
                  Passport Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {userPet.breed} • {userPet.age} • {userPet.gender}
              </p>
            </div>
          </div>
        </div>

        {/* Vital Quick Numbers */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center relative z-10">
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Weight</span>
            <span className="text-sm font-extrabold text-white">{userPet.weight}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Today</span>
            <span className="text-sm font-extrabold text-emerald-400">{userPet.health.dailyActivity.activeMinutes}m</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Uploaded Shots</span>
            <span className="text-sm font-extrabold text-amber-300">{userPet.health.vaccinations.length} Records</span>
          </div>
        </div>
      </div>

      {/* Weight Tracker Visualization */}
      <div className="shrink-0 p-4 rounded-3xl bg-white border border-warm-200/80 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Weight Tracking
              </h3>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900">{currentWeight?.weight || userPet.weight} lbs</span>
                <span className="text-xs font-semibold text-slate-400">in {currentWeight?.month || 'Recent'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLogWeight}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-600 font-bold text-xs border border-coral-200/60 transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Log Weight</span>
            </button>
          </div>
        </div>

        {/* Custom SVG Trendline */}
        <div className="h-28 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 70">
            {/* Target band */}
            <rect x="0" y="15" width="300" height="30" fill="#10B981" fillOpacity="0.08" rx="4" />
            <line x1="0" y1="30" x2="300" y2="30" stroke="#10B981" strokeDasharray="3 3" strokeOpacity="0.3" />

            {/* Connecting curve */}
            <path
              d="M 10 50 Q 60 42 110 32 T 210 22 T 290 24"
              fill="none"
              stroke="#FF6542"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Gradient area under curve */}
            <path
              d="M 10 50 Q 60 42 110 32 T 210 22 T 290 24 L 290 70 L 10 70 Z"
              fill="url(#weightGradient)"
              opacity="0.15"
            />

            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6542" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {/* Interactive Points */}
            {weightData.map((d, idx) => {
              const cx = 10 + (idx * (280 / Math.max(1, weightData.length - 1)));
              const cy = 52 - (d.weight - 66) * 12;
              const isSelected = idx === selectedPoint;
              return (
                <g key={idx} onClick={() => setSelectedPoint(idx)} className="cursor-pointer">
                  <circle
                    cx={cx}
                    cy={Math.max(10, Math.min(60, cy))}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#FF6542' : '#FFFFFF'}
                    stroke="#FF6542"
                    strokeWidth={isSelected ? 3 : 2}
                  />
                </g>
              );
            })}
          </svg>

          {/* Month labels */}
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1 px-1">
            {weightData.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedPoint(i)}
                className={`transition-colors ${
                  i === selectedPoint ? 'text-coral-600 font-extrabold' : 'hover:text-slate-700'
                }`}
              >
                {d.month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Vitality & Activity Rings */}
      <div className="shrink-0 p-4 rounded-3xl bg-white border border-warm-200/80 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Daily Activity Goal
              </h3>
              <div className="text-sm font-extrabold text-slate-900">
                {userPet.health.dailyActivity.activeMinutes} / {userPet.health.dailyActivity.activeGoal} active mins
              </div>
            </div>
          </div>
          <span className="text-xs font-black text-amber-600">
            {Math.round((userPet.health.dailyActivity.activeMinutes / userPet.health.dailyActivity.activeGoal) * 100)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 w-full bg-warm-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-coral-500 rounded-full transition-all duration-500"
            style={{ width: `${(userPet.health.dailyActivity.activeMinutes / userPet.health.dailyActivity.activeGoal) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-warm-50/70 border border-warm-200/60 flex items-center justify-between">
            <span className="text-slate-500">Pedometer</span>
            <span className="font-extrabold text-slate-800">{userPet.health.dailyActivity.steps.toLocaleString()} steps</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-warm-50/70 border border-warm-200/60 flex items-center justify-between">
            <span className="text-slate-500">Play Sessions</span>
            <span className="font-extrabold text-slate-800">{userPet.health.dailyActivity.playSessions} completed</span>
          </div>
        </div>
      </div>

      {/* Upcoming Vet Appointment Card */}
      {userPet.health.upcomingAppointments?.[0] && (
        <div className="shrink-0 p-4 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Upcoming Veterinary Visit
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[10px] font-extrabold">
              Confirmed
            </span>
          </div>

          <h4 className="text-sm font-extrabold text-slate-900">
            {userPet.health.upcomingAppointments[0].title}
          </h4>

          <div className="mt-2 space-y-1 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-3.5 h-3.5 text-coral-500" />
              <span>{userPet.health.upcomingAppointments[0].date}</span>
            </div>
            <div className="text-slate-600 pl-5">
              {userPet.health.upcomingAppointments[0].doctor} • {userPet.health.upcomingAppointments[0].clinic}
            </div>
            <div className="text-slate-500 pl-5 text-[11px]">
              {userPet.health.upcomingAppointments[0].address}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-amber-200/60">
            <button
              onClick={() => onCallClinic(userPet.health.upcomingAppointments[0])}
              className="flex-1 py-2 px-3 rounded-xl bg-white border border-amber-300/80 hover:bg-amber-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-700" />
              <span>Call Clinic</span>
            </button>
            <button
              onClick={() => onAddToCalendar({
                title: `${userPet.name}'s Vet Appointment: ${userPet.health.upcomingAppointments[0].title}`,
                location: `${userPet.health.upcomingAppointments[0].clinic}, ${userPet.health.upcomingAppointments[0].address}`,
                description: `Veterinary exam with ${userPet.health.upcomingAppointments[0].doctor} for ${userPet.name}.`
              })}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Add to Calendar
            </button>
          </div>
        </div>
      )}

      {/* Vaccination Passport Section */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Uploaded Vaccination Passport ({userPet.health.vaccinations.length})
            </span>
            <span className="text-[10px] text-slate-500">
              Tracked against expiry dates in uploaded records
            </span>
          </div>
          <button
            onClick={onOpenAddVaccine}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Record</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {userPet.health.vaccinations.map((vax, idx) => {
            // Check dynamic status from report
            const isOverdue = vaxReport.overdueList.some(o => o.name === vax.name);
            const isExpiring = vaxReport.expiringSoonList.some(e => e.name === vax.name);

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl bg-white border shadow-xs transition-all ${
                  isOverdue ? 'border-rose-300 ring-1 ring-rose-200' : isExpiring ? 'border-amber-300' : 'border-warm-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isOverdue ? 'bg-rose-50 text-rose-600' : isExpiring ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {isOverdue ? <AlertCircle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">
                        {vax.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Administered: <span className="font-semibold text-slate-700">{vax.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isOverdue
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : isExpiring
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    }`}>
                      {isOverdue ? `Expired (${vax.validUntil})` : `Valid til ${vax.validUntil}`}
                    </span>
                  </div>
                </div>

                {/* Detailed Clinic & Doctor Info matching Vet Visit Bubble */}
                {(vax.clinic || vax.doctor || vax.address) && (
                  <div className="mt-2.5 pt-2 border-t border-warm-100 space-y-1.5 text-[11px] text-slate-600 bg-warm-50/70 rounded-xl p-2.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5 truncate">
                        <Stethoscope className="w-3 h-3 text-coral-500 shrink-0" />
                        <span className="truncate">{vax.doctor ? `${vax.doctor} • ` : ''}{vax.clinic || 'Veterinary Clinic'}</span>
                      </span>
                      {vax.lotNumber && (
                        <span className="text-[9px] font-mono font-medium text-slate-500 shrink-0 bg-white px-1.5 py-0.5 rounded border border-warm-200">
                          {vax.lotNumber}
                        </span>
                      )}
                    </div>

                    {vax.address && (
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{vax.address}</span>
                      </div>
                    )}

                    {vax.phone && (
                      <div className="flex items-center justify-between pt-1 border-t border-warm-200/40">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-slate-400" />
                          <span>{vax.phone}</span>
                        </span>
                        <button
                          onClick={() => onCallClinic({ clinic: vax.clinic, doctor: vax.doctor, phone: vax.phone })}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                            isOverdue
                              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                              : 'bg-white hover:bg-warm-100 text-slate-700 border border-warm-200'
                          }`}
                        >
                          <Phone className="w-2.5 h-2.5" />
                          <span>{isOverdue ? 'Call for Booster' : 'Call Clinic'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Medication & Preventative Reminders */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Medications & Preventatives
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Tap to mark given
          </span>
        </div>

        <div className="space-y-2">
          {userPet.health.medications.map((med) => (
            <button
              key={med.id}
              onClick={() => onToggleMed(med.id)}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                med.given
                  ? 'bg-warm-50/70 border-warm-200 opacity-75'
                  : 'bg-white border-coral-200 shadow-xs ring-1 ring-coral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    med.given
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-slate-300 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-extrabold ${med.given ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {med.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {med.frequency} • Due: {med.dueDay}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  med.given
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-coral-50 text-coral-600'
                }`}
              >
                {med.given ? 'Given' : 'Due Today'}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
