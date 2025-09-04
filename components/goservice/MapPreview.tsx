'use client';
export default function MapPreview({ lat, lng, address }: { lat: number; lng: number; address?: string }) {
  return (
    <div className="rounded-xl border border-sky-200 shadow relative h-40 bg-[radial-gradient(circle_at_10%_15%,#c7f1ff_0_12%,transparent_13%),radial-gradient(circle_at_70%_30%,#c7fff2_0_12%,transparent_13%),radial-gradient(circle_at_30%_80%,#cfe1ff_0_12%,transparent_13%),#eef6ff]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] rounded-full w-7 h-7 grid place-items-center text-white font-black shadow-md" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
        📍
      </div>
      <div className="absolute bottom-2 left-2 bg-white/95 border border-slate-200 rounded-md text-xs px-2 py-1">
        {lat.toFixed(3)}, {lng.toFixed(3)}
        {address ? ` • ${address}` : ''}
      </div>
    </div>
  );
}
