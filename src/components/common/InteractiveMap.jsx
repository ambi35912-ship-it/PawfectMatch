import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  Car,
  Footprints,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function InteractiveMap({ destination, initialCoordinates, onSelectSpot }) {
  const [mapType, setMapType] = useState('standard'); // 'standard' | 'transit'
  const [activeStep, setActiveStep] = useState(0);

  // Fallback SF coordinates
  const lat = destination?.lat || initialCoordinates?.lat || 37.7915;
  const lng = destination?.lng || initialCoordinates?.lng || -122.4374;
  const parkName = destination?.name || destination?.locationName || 'Alta Plaza Dog Play Area';
  const address = destination?.address || 'San Francisco, CA';
  const distance = destination?.distance || '0.9 mi';

  const bbox = `${lng - 0.012}%2C${lat - 0.008}%2C${lng + 0.012}%2C${lat + 0.008}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  const navigationSteps = [
    { instruction: 'Start from Marina District home / meetup point', dist: '0.1 mi' },
    { instruction: 'Head south on Scott St toward Jackson St', dist: '0.4 mi' },
    { instruction: 'Turn right at Alta Plaza off-leash double-gated entrance', dist: '0.4 mi' },
    { instruction: `Arrive at ${parkName} (Water fountains on right)`, dist: 'Destination' }
  ];

  const encodedAddress = encodeURIComponent(`${parkName}, ${address}`);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${encodedAddress}&dirflg=d`;

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-slate-900 border border-warm-200/80 shadow-md relative flex flex-col">
      
      {/* Top Floating Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
          <Compass className="w-3.5 h-3.5 text-coral-400 animate-spin [animation-duration:10s]" />
          <span className="text-[11px] font-black truncate max-w-[170px]">
            {parkName}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold shadow-md flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live GPS Route
          </span>
        </div>
      </div>

      {/* Interactive OpenStreetMap View */}
      <div className="relative w-full h-56 sm:h-64 bg-slate-950">
        <iframe
          title={`Map of ${parkName}`}
          src={mapUrl}
          className="w-full h-full border-0 filter saturate-[1.15] contrast-[1.05]"
          loading="lazy"
        />

        {/* Custom HUD Route Overlay Pill */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white shadow-xl">
            <div className="flex items-center gap-1 text-[11px] font-black text-amber-400">
              <Car className="w-3.5 h-3.5" />
              <span>~6 min</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1 text-[11px] font-black text-emerald-400">
              <Footprints className="w-3.5 h-3.5" />
              <span>~18 min walk</span>
            </div>
            <span className="text-white/40">•</span>
            <span className="text-[10px] font-bold text-white/80">{distance}</span>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto px-3 py-1.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white text-[11px] font-black shadow-lg shadow-coral-500/30 flex items-center gap-1 transition-transform active:scale-95"
          >
            <span>Navigate</span>
            <Navigation className="w-3 h-3 fill-current" />
          </a>
        </div>
      </div>

      {/* Route & Directions Tray */}
      <div className="p-4 bg-white space-y-3">
        {/* Destination Details */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-coral-600 block">
              Destination Park
            </span>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              {parkName}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {address}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Off-Leash Ready
            </span>
          </div>
        </div>

        {/* Turn-by-Turn Steps Preview */}
        <div className="p-3 rounded-2xl bg-warm-50/80 border border-warm-200/80 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Turn-by-Turn Route Preview
          </span>
          <div className="space-y-1.5">
            {navigationSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <span className="w-4 h-4 rounded-full bg-warm-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1 text-slate-700 font-medium leading-tight">
                  {step.instruction}
                </span>
                <span className="text-[10px] text-slate-400 font-bold shrink-0">
                  {step.dist}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Direct Navigation Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 text-white/60" />
          </a>

          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Apple Maps</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

      </div>

    </div>
  );
}
