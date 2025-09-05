'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { dummyComplaints } from '@/lib/data'; // Keep for generateStaticParams
import { DetailHeader } from '@/components/DetailHeader';
import { SectionCard } from '@/components/SectionCard';
import { PhotoGallery } from '@/components/PhotoGallery';
import { Timeline } from '@/components/Timeline';
import { CommentItem } from '@/components/CommentItem';
import { MapPin, Tag, Building, Utensils, ParkingSquare, Trash2, Edit } from 'lucide-react';
import { useAduan } from '@/lib/aduan-store.tsx';
import { Complaint } from '@/lib/aduan-store.tsx'; // Import Complaint type from store

// Helper to get category icon
const categoryIcons: { [key: string]: React.ElementType } = {
  'Infrastruktur': Building,
  'Fasilitas Umum': ParkingSquare,
  'Kuliner': Utensils,
  'Kebersihan': Tag,
  'Keamanan': Tag,
};

// --- Reusable sub-components for this page ---

const StatusBadge = ({ status }: { status: Complaint['status'] }) => {
  const statusConfig = {
    Selesai: { label: 'Selesai', color: 'bg-green-100 text-green-800' },
    Diproses: { label: 'Proses', color: 'bg-blue-100 text-blue-800' },
    Pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  };
  const config = statusConfig[status] || statusConfig.Pending;
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
};

const CategoryChip = ({ category }: { category: string }) => {
  const Icon = categoryIcons[category] || Tag;
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
      <Icon size={12} />
      <span>{category}</span>
    </div>
  );
};


// This function is required for static export in Next.js
export async function generateStaticParams() {
  // Use dummyComplaints for build-time generation as store is client-side
  return dummyComplaints.map((complaint) => ({
    id: complaint.id,
  }));
}



export default function ComplaintDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getComplaintById, isLoading, deleteComplaint } = useAduan();

  const complaint = getComplaintById(params.id as string);

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

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aduan ini?')) {
      deleteComplaint(complaint.id);
      router.push('/aduanPariwisata');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <DetailHeader title="Detail Aduan" subtitle="Pantau dan kelola masalah pariwisata" />

      <main className="max-w-lg mx-auto px-4 py-5 space-y-3">
        {/* --- Top Section: Title & Chips --- */}
        <div>
            <h2 className="text-xl font-bold text-gray-900">{complaint.title}</h2>
            <div className="flex items-center gap-2 mt-2">
                <StatusBadge status={complaint.status} />
                <CategoryChip category={complaint.category} />
            </div>
        </div>

        {/* --- Section: Photo --- */}
        <SectionCard title="FOTO BUKTI">
          <PhotoGallery photos={complaint.imageUrl ? [complaint.imageUrl] : []} />
        </SectionCard>

        {/* --- Section: Description --- */}
        <SectionCard title="DESKRIPSI ADUAN">
          <p className="text-gray-700 leading-relaxed text-sm">{complaint.description}</p>
        </SectionCard>

        {/* --- Section: Location --- */}
        <SectionCard title="LOKASI">
            <div className="aspect-[16/9] bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                <p className="text-gray-500 text-sm">Ilustrasi Peta</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                <span>{complaint.location}</span>
            </div>
        </SectionCard>

        {/* --- Section: History --- */}
        <SectionCard title="RIWAYAT PROSES">
            <Timeline items={complaint.history} />
        </SectionCard>

        {/* --- Section: Comments --- */}
        <SectionCard title="KOMENTAR / TANGGAPAN">
            <div className="space-y-4">
                {complaint.comments.map((comment, index) => <CommentItem key={index} {...comment} />)}
            </div>
        </SectionCard>
      </main>

      {/* --- Bottom Fixed Button --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm p-4 border-t border-gray-200">
          <div className="max-w-lg mx-auto flex space-x-2">
              <button 
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trash2 size={20} />
                <span>Hapus Aduan</span>
              </button>
              <button 
                onClick={() => router.push(`/aduanPariwisata/${complaint.id}/edit`)}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Edit size={20} />
                <span>Edit Aduan</span>
              </button>
          </div>
      </div>
    </div>
  );
}