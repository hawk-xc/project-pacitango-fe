'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAduan } from '@/lib/aduan-store.tsx'; // Assuming useAduan is the correct store
import ImageUploader from '@/components/goservice/ImageUploader'; // Reusing ImageUploader from goservice
import MapPreview from '@/components/goservice/MapPreview'; // Reusing MapPreview from goservice

// Reusable Field component for consistent styling
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-xs font-bold text-slate-500 mb-1">{label}</div>
      {children}
    </div>
  );
}

export default function AddComplaintPage() {
  const { createComplaint } = useAduan();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [lat, setLat] = useState(-7.565); // Default latitude
  const [lng, setLng] = useState(110.825); // Default longitude
  const [address, setAddress] = useState<string | undefined>('Lokasi Default'); // Default address

  const handleSubmit = () => {
    // Basic validation (can be improved with a proper form library)
    if (!title || !category || !description || !address) {
      alert('Mohon lengkapi semua kolom yang wajib diisi.');
      return;
    }

    createComplaint({
      title,
      category,
      description,
      imageUrl: photos.length > 0 ? photos[0] : undefined, // Use first photo as imageUrl
      location: address, // use address as location string
      // The useAduan store's createComplaint might need to be updated to accept lat/lng if needed
      // For now, sticking to the existing Complaint type in aduan-store.tsx
    });
    router.push(`/aduanPariwisata`); // Redirect to the aduanPariwisata list page
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser Anda.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setAddress('Lokasi Terkini Anda'); // Set a generic address for current location
      },
      (err) => {
        console.error('Error getting current location:', err);
        alert('Gagal mendapatkan lokasi terkini. Pastikan Anda mengizinkan akses lokasi.');
      }
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50">
      <div className="flex flex-col h-screen">
        {/* AppBar */}
        <div className="h-16 text-white px-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
          <button onClick={() => router.back()} className="w-7 h-7 rounded-full bg-white/20 grid place-items-center">
            ←
          </button>
          <h1 className="font-extrabold tracking-wide">Tambah Aduan Pariwisata</h1>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow">
            <Field label="Judul Aduan">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Isi judul aduan di sini"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>

            <Field label="Kategori Aduan">
              {/* Reusing the Select component from shadcn/ui */}
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Pilih Kategori Aduan</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Kebersihan">Kebersihan</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Kuliner">Kuliner</option>
              </select>
            </Field>

            <Field label="Penjelasan Aduan">
              <textarea
                className="w-full min-h-[110px] rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan detail aduan..."
                required
              />
            </Field>

            <Field label="Upload Foto Pendukung">
              <ImageUploader value={photos} onChange={setPhotos} />
            </Field>

            <Field label="Lokasi">
              <div className="flex gap-2">
                <button
                  onClick={getCurrentLocation}
                  className="h-9 px-3 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold text-xs"
                  type="button" // Prevent form submission
                >
                  Gunakan Lokasi Terkini
                </button>
                {/* "Pilih di Peta" button is a placeholder for future implementation */}
                <button className="h-9 px-3 rounded-lg border bg-white border-slate-300 text-slate-800 font-extrabold text-xs" type="button">
                  Pilih di Peta
                </button>
              </div>
              <div className="mt-2">
                <MapPreview lat={lat} lng={lng} address={address} />
              </div>
              <div className="mt-2 w-full h-9 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 grid place-items-center text-xs font-extrabold">
                Location: {lat.toFixed(3)}, {lng.toFixed(3)}
              </div>
            </Field>
          </div>
        </div>

        {/* Bottom Fixed Button */}
        <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-b from-transparent via-white/90 to-white border-t">
          <button
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl text-white font-extrabold shadow"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}
          >
            Ajukan Aduan
          </button>
        </div>
      </div>
    </div>
  );
}