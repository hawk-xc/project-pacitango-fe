'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGoService, Status } from '@/lib/goservice/store';
import { useState } from 'react';
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

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, updateComplaint, addHistory } = useGoService();
  const c = getById(id);
  if (!c) return <div className="p-6">Data tidak ditemukan.</div>;

  const [title, setTitle] = useState(c.title);
  const [category, setCategory] = useState(c.category);
  const [description, setDescription] = useState(c.description);
  const [photos, setPhotos] = useState<string[]>(c.photos);
  const [lat, setLat] = useState(c.location.lat);
  const [lng, setLng] = useState(c.location.lng);
  const [address, setAddress] = useState<string | undefined>(c.location.address);
  const [status, setStatus] = useState<Status>(c.status);

  const save = () => {
    updateComplaint(c.id, { title, category, description, photos, location: { lat, lng, address }, status });
    addHistory(c.id, { title: 'Aduan Diedit', by: 'Anda' });
    router.push(`/goservice/${c.id}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50">
        <div className="flex flex-col h-full">
          <div className="h-16 text-white px-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
            <button onClick={() => router.back()} className="w-7 h-7 rounded-full bg-white/20 grid place-items-center">
              ←
            </button>
            <h1 className="font-extrabold tracking-wide">Edit Aduan</h1>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow">
              <Field label="Judul Aduan">
                <input className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Field>

              <div className="grid grid-cols-2 gap-2">
                <Field label="Kategori">
                  <input className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Field>
                <Field label="Status">
                  <select className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
                    <option value="pending">Pending</option>
                    <option value="process">Proses</option>
                    <option value="success">Selesai</option>
                  </select>
                </Field>
              </div>

              <Field label="Deskripsi Aduan">
                <textarea className="w-full min-h-[110px] rounded-xl border border-slate-300 bg-slate-50 px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Field>

              <Field label="Foto Bukti">
                <ImageUploader value={photos} onChange={setPhotos} />
              </Field>

              <Field label="Lokasi">
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => {
                      if (!navigator.geolocation) return;
                      navigator.geolocation.getCurrentPosition((pos) => {
                        setLat(pos.coords.latitude);
                        setLng(pos.coords.longitude);
                        setAddress('Lokasi Saya');
                      });
                    }}
                    className="h-9 px-3 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold text-xs"
                  >
                    Gunakan Lokasi Terkini
                  </button>
                  <button className="h-9 px-3 rounded-lg border bg-white border-slate-300 text-slate-800 font-extrabold text-xs">Pilih di Peta</button>
                </div>
                <MapPreview lat={lat} lng={lng} address={address} />
                <div className="mt-2 w-full h-9 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 grid place-items-center text-xs font-extrabold">
                  Location: {lat.toFixed(3)}, {lng.toFixed(3)}
                </div>
              </Field>
            </div>
          </div>

          <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-b from-transparent via-white/90 to-white border-t grid grid-cols-[auto_1fr] gap-2">
            <a href={`/goservice/${c.id}`} className="h-12 px-4 rounded-xl border bg-white grid place-items-center font-extrabold">
              Batalkan
            </a>
            <button onClick={save} className="h-12 rounded-xl text-white font-extrabold shadow" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
              Simpan Perubahan
            </button>
          </div>
        </div>
    </div>
  );
}
