import { Complaint } from './types';

export const dummyComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Kerusakan Jalan di Area Parkir',
    category: 'Infrastruktur',
    description: 'Jalan utama di area parkir utama rusak berat dan berlubang, membahayakan pengunjung.',
    status: 'Pending',
    location: 'Kawasan Pantai Kuta, Bali',
    imageUrl: 'https://images.pexels.com/photos/190417/pexels-photo-190417.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Toilet Umum Kurang Bersih',
    category: 'Fasilitas Umum',
    description: 'Toilet di dekat Pura Uluwatu sangat kotor dan tidak terawat, mengurangi kenyamanan wisatawan.',
    status: 'Diproses',
    location: 'Pura Uluwatu, Bali',
    imageUrl: 'https://images.pexels.com/photos/1853542/pexels-photo-1853542.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Lampu Penerangan Mati',
    category: 'Keamanan',
    description: 'Beberapa lampu di sepanjang jalan setapak menuju pantai mati, menciptakan area gelap.',
    status: 'Diselesaikan',
    location: 'Pantai Sanur, Bali',
    imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Sampah Berserakan di Tepi Pantai',
    category: 'Kebersihan',
    description: 'Banyak sampah plastik dan sisa makanan yang tidak dibersihkan di area pantai.',
    status: 'Pending',
    location: 'Pantai Jimbaran, Bali',
    imageUrl: 'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
    {
    id: '5',
    title: 'Penunjuk Arah Tidak Jelas',
    category: 'Infrastruktur',
    description: 'Papan petunjuk arah ke lokasi wisata utama sudah pudar dan sulit dibaca oleh pengunjung.',
    status: 'Diproses',
    location: 'Ubud, Gianyar, Bali',
    imageUrl: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];
