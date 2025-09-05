'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Tabs } from '@/components/Tabs';
import { ComplaintCard } from '@/components/ComplaintCard';
import { useAduan } from '@/lib/aduan-store.tsx';
import { Complaint } from '@/lib/aduan-store.tsx';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function ComplaintDashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const { complaints, isLoading } = useAduan();

  const filteredComplaints = complaints.filter((complaint) => {
    if (activeTab === 'All') return true;
    return complaint.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto bg-white min-h-screen shadow-2xl">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="p-4">
          <Link href="/aduanPariwisata/tambah" className="w-full">
            <Button className="w-full mb-4 flex items-center gap-2">
                <PlusCircle size={20} />
                <span>Tambah Aduan</span>
            </Button>
          </Link>
          
          {isLoading ? (
            <div className="text-center py-10">Memuat aduan...</div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Tidak ada aduan dalam kategori ini.</div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint: Complaint) => (
                <Link
                  href={`/aduanPariwisata/${complaint.id}`}
                  key={complaint.id}
                  className="hover:shadow-lg transition-shadow duration-200 rounded-lg block"
                >
                  <ComplaintCard complaint={complaint} />
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}