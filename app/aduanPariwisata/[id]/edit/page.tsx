
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/DetailHeader';
import { SectionCard } from '@/components/SectionCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { UploadCloud, MapPin } from 'lucide-react';
import { useAduan, Complaint, Status } from '@/lib/aduan-store.tsx';

export default function EditComplaintPage() {
  const params = useParams();
  const router = useRouter();
  const { getComplaintById, updateComplaint, isLoading } = useAduan();

  const complaint = getComplaintById(params.id as string);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]); 
  const [location, setLocation] = useState(''); 
  const [status, setStatus] = useState<Status>('Pending');

  useEffect(() => {
    if (complaint) {
      setTitle(complaint.title);
      setCategory(complaint.category);
      setDescription(complaint.description);
      setPhotos(complaint.imageUrl ? [complaint.imageUrl] : []);
      setLocation(complaint.location);
      setStatus(complaint.status);
    }
  }, [complaint]);

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50">
            <DetailHeader title="Memuat..." subtitle="" />
            <main className="max-w-lg mx-auto px-4 py-6">
                <p className="text-center text-gray-600">Memuat data aduan...</p>
            </main>
        </div>
    );
  }

  if (!complaint) {
    return (
        <div className="min-h-screen bg-gray-50">
            <DetailHeader title="Error" subtitle="Aduan tidak dapat ditemukan" />
            <main className="max-w-lg mx-auto px-4 py-6">
                <p className="text-center text-gray-600">Aduan yang Anda cari tidak ada atau telah dihapus.</p>
            </main>
        </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !description || !location || !status) {
      alert('Mohon lengkapi semua kolom yang wajib diisi.');
      return;
    }

    const updatedComplaintData: Partial<Omit<Complaint, 'id'>> = {
      title,
      category,
      description,
      imageUrl: photos.length > 0 ? photos[0] : undefined,
      location,
      status,
    };

    updateComplaint(complaint.id, updatedComplaintData);
    router.push(`/aduanPariwisata/${complaint.id}`); // Redirect to detail page
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <DetailHeader title="Edit Aduan" subtitle="Ubah detail aduan" />

      <main className="max-w-lg mx-auto px-4 py-5 space-y-3">
        
        <form onSubmit={handleSubmit} className="space-y-3">
            <SectionCard title="DETAIL ADUAN">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title" className="text-sm font-medium">Judul</Label>
                        <Input 
                            id="title" 
                            placeholder="cth: Jalan Rusak di Area Parkir" 
                            className="mt-1" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="category" className="text-sm font-medium">Kategori</Label>
                        <Select onValueChange={setCategory} value={category} required>
                            <SelectTrigger id="category" className="mt-1">
                                <SelectValue placeholder="Pilih kategori aduan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Infrastruktur">Infrastruktur</SelectItem>
                                <SelectItem value="Fasilitas Umum">Fasilitas Umum</SelectItem>
                                <SelectItem value="Kebersihan">Kebersihan</SelectItem>
                                <SelectItem value="Keamanan">Keamanan</SelectItem>
                                <SelectItem value="Kuliner">Kuliner</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="description" className="text-sm font-medium">Deskripsi</Label>
                        <Textarea 
                            id="description" 
                            placeholder="Jelaskan masalah yang Anda temukan secara rinci." 
                            className="mt-1" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                        <Select onValueChange={setStatus} value={status} required>
                            <SelectTrigger id="status" className="mt-1">
                                <SelectValue placeholder="Pilih status aduan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Diproses">Diproses</SelectItem>
                                <SelectItem value="Selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="UPLOAD FOTO">
                <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="font-semibold text-gray-700">Klik untuk mengupload</p>
                    <p className="text-xs text-gray-500">PNG, JPG, atau WEBP (maks. 5MB)</p>
                    {photos.length > 0 && <img src={photos[0]} alt="Preview" className="mt-4 w-24 h-24 object-cover rounded-md" />}
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setPhotos([event.target?.result as string]);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}/>
                </div>
            </SectionCard>

            <SectionCard title="LOKASI">
                <div className="aspect-[16/9] bg-gray-200 rounded-xl flex items-center justify-center mb-3">
                    <p className="text-gray-500 text-sm">Ilustrasi Peta</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="latitude" className="text-sm font-medium">Lokasi (contoh)</Label>
                        <Input 
                            id="location" 
                            placeholder="Pantai Kuta, Bali" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </SectionCard>

            {/* --- Bottom Fixed Button --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm p-4 border-t border-gray-200">
                <div className="max-w-lg mx-auto">
                    <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </form>
      </main>
    </div>
  );
}
