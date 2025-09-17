import React from 'react';

interface AduanDetail {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
}

const mockAduan: AduanDetail = {
  id: 'ADUAN-001',
  title: 'Kendala pada layanan GoService',
  description: 'Pengguna melaporkan masalah pada fitur pemesanan layanan GoService.',
  status: 'in_progress',
  createdAt: '2024-06-01T10:00:00Z',
  updatedAt: '2024-06-02T14:30:00Z',
};

const statusLabel = {
  open: 'Terbuka',
  in_progress: 'Sedang Diproses',
  closed: 'Selesai',
};

export default function AduanDetailPage() {
  const aduan = mockAduan;

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Detail Aduan GoService</h1>
      <div className="mb-2">
        <span className="font-semibold">ID Aduan:</span> {aduan.id}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Judul:</span> {aduan.title}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Deskripsi:</span>
        <p className="ml-2">{aduan.description}</p>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${aduan.status === 'closed' ? 'bg-green-200' : aduan.status === 'in_progress' ? 'bg-yellow-200' : 'bg-red-200'}`}>{statusLabel[aduan.status]}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Dibuat:</span> {new Date(aduan.createdAt).toLocaleString()}
      </div>
      <div>
        <span className="font-semibold">Terakhir Diperbarui:</span> {new Date(aduan.updatedAt).toLocaleString()}
      </div>
    </main>
  );
}
