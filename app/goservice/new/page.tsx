'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGoService, Status } from '@/lib/goservice/store';
import ImageUploader from '@/components/goservice/ImageUploader';
import MapPreview from '@/components/goservice/MapPreview';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-xs font-bold text-slate-500 mb-1">{label}</div>
      {children}
    </div>
  );
}

export default function AddPage() {
  const { createComplaint } = useGoService();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [lat, setLat] = useState(-7.565);
  const [lng, setLng] = useState(110.825);
  const [address, setAddress] = useState<string | undefined>('Pantai Karang');

  const submit = () => {
    const id = createComplaint({
      title,
      category,
      description,
      photos,
      location: { lat, lng, address },
    });
    router.push(`/goservice`);
  };

  const getCurrent = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
      setAddress('Lokasi Saya');
    });
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50">
        <div className="h-full overflow-auto p-3">
          <div className="rounded-2xl border border-slate-300 shadow p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <a href="/goservice" className="w-7 h-7 rounded-md border grid place-items-center">
                ←
              </a>
              <div className="font-extrabold">Tambah Aduan Pariwisata</div>
            </div>

            <Field label="Judul Aduan">
              <input className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="isi aduan di sini" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>

            <Field label="Kategori Aduan">
              <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
                <input className="bg-transparent outline-none flex-1" placeholder="Pilih Kategori Aduan" value={category} onChange={(e) => setCategory(e.target.value)} />
                <span>▾</span>
              </div>
            </Field>

            <Field label="Penjelasan Aduan">
              <textarea
                className="w-full min-h-[110px] rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="tuliskan detail aduan..."
              />
            </Field>

            <Field label="Upload Foto Pendukung">
              <ImageUploader value={photos} onChange={setPhotos} />
            </Field>

            <Field label="Lokasi">
              <div className="flex gap-2">
                <button onClick={getCurrent} className="h-9 px-3 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold text-xs">
                  Gunakan Lokasi Terkini
                </button>
                <button className="h-9 px-3 rounded-lg border bg-white border-slate-300 text-slate-800 font-extrabold text-xs">Pilih di Peta</button>
              </div>
              <div className="mt-2">
                <MapPreview lat={lat} lng={lng} address={address} />
              </div>
              <div className="mt-2 w-full h-9 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 grid place-items-center text-xs font-extrabold">
                Location: {lat.toFixed(3)}, {lng.toFixed(3)}
              </div>
            </Field>

            <div className="sticky bottom-0 pt-3 bg-gradient-to-b from-transparent via-white to-white">
              <button onClick={submit} className="w-full h-11 rounded-xl bg-emerald-600 text-white font-extrabold shadow-[0_12px_30px_rgba(16,185,129,.35)]">
                Ajukan
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
