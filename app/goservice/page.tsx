'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useGoService } from '@/lib/goservice/store.tsx';
import StatusBadge from '@/components/goservice/StatusBadge';
import { MapPin, MoreVertical, Plus } from 'lucide-react';

export default function ListPage() {
  const { complaints, isLoading } = useGoService();
  const [activeTab, setActiveTab] = useState('All');

  const filteredComplaints = complaints.filter((c) => {
    if (activeTab === 'All') return true;
    return c.status === activeTab;
  });

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto bg-gray-50">
        <div className="flex flex-col h-screen relative ">
          <div className="h-16 text-white px-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
            <div className="w-7 h-7 rounded-full bg-white/20 grid place-items-center">🏝️</div>
            <h1 className="font-extrabold tracking-wide">Aduan Pariwisata</h1>
          </div>
          <div className="text-center p-8 text-slate-500">Memuat data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-gray-50">
      <div className="flex flex-col h-screen">
        {/* AppBar */}
        <div className="h-16 text-white px-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
          <div className="w-7 h-7 rounded-full bg-white/20 grid place-items-center">🏝️</div>
          <h1 className="font-extrabold tracking-wide">Aduan Pariwisata</h1>
        </div>
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-slate-200">
          {['All', 'Pending', 'Proses', 'Selesai'].map((status) => (
            <button key={status} onClick={() => setActiveTab(status)} className={`px-4 py-1 rounded-full text-sm font-bold transition ${activeTab === status ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {status}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-4">
          <h2 className="text-xl font-extrabold mb-2">Daftar Aduan</h2>

          {complaints.length === 0 ? (
            <div className="text-center p-8 text-slate-500">Belum ada aduan.</div>
          ) : (
            <div className="space-y-3">
              {complaints.map((c) => (
                <Link key={c.id} href={`/goservice/${c.id}`} className="block">
                  <div className="flex gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow">
                    <div className="w-16 h-16 rounded-xl border border-sky-100 bg-sky-50 grid place-items-center text-sky-700 font-black">📷</div>
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <h3 className="font-extrabold leading-tight">{c.title}</h3>
                        <button className="ml-auto text-slate-400">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-2 text-sky-900 bg-cyan-50 border border-cyan-100 rounded-full text-xs font-extrabold px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                          {c.category}
                        </span>
                        <StatusBadge status={c.status} />
                      </div>
                      <div className="text-sm text-slate-600 mt-1 line-clamp-2">{c.description}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={14} className="text-sky-600" />
                        {c.location.address ?? `${c.location.lat.toFixed(3)}, ${c.location.lng.toFixed(3)}`}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* bottom bar */}
        {/* Floating Plus Button
        <div className="absolute bottom-24 right-6">
          <Link href="/goservice/new" className="w-14 h-14 rounded-full grid place-items-center text-white shadow-[0_18px_40px_rgba(14,165,233,.35)]" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
            <Plus />
          </Link>
        </div> */}
        <div className="bottom p-4 bg-gradient-to-b from-transparent via-white/90 to-white border-t">
          <button className="w-full h-12 rounded-xl text-white font-extrabold shadow" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
            <Link href="/goservice/new">Buat Aduan Baru</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
