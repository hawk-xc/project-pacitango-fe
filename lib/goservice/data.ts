
import { Complaint } from './store.tsx';

// This function is just for generating unique IDs for the seed data
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export const seedComplaints: Complaint[] = [
  {
    id: 'seed-1', // Use a predictable ID for the seed
    title: 'Kerusakan Kamar Mandi Pantai',
    category: 'Fasilitas Umum',
    description: 'Kebocoran pipa dan pintu rusak. Area licin dan berbahaya.',
    photos: [],
    location: { lat: -7.565, lng: 110.825, address: 'Pantai Karang' },
    status: 'process',
    createdAt: new Date().toISOString(),
    history: [
      { id: uid(), title: 'Aduan Dikirim', at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), by: 'Anda' },
      { id: uid(), title: 'Ditinjau Petugas', at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), by: 'Admin' },
    ],
    comments: [{ id: uid(), name: 'Admin Dinas', message: 'Tim teknis dijadwalkan hari ini 13:00.', at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }],
  }
];
