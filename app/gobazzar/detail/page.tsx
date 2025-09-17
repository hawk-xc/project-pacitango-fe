
import React from 'react';

// Helper components for icons (reusing from home page for consistency)
const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const GoBazzarDetailPage = () => {
  const participants = [
    { id: 1, name: 'Kopi Joyo', avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop' },
    { id: 2, name: 'Batik Soge', avatar: 'https://images.unsplash.com/photo-1620799140408-edc6d5f93528?w=100&h=100&fit=crop' },
    { id: 3, name: 'Keripik Telo', avatar: 'https://images.unsplash.com/photo-1599406237642-c4ab71b56a03?w=100&h=100&fit=crop' },
    { id: 4, name: 'Nasi Tiwul', avatar: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=100&h=100&fit=crop' },
    { id: 5, name: 'Gula Aren', avatar: 'https://images.unsplash.com/photo-1603377244229-dba77a063333?w=100&h=100&fit=crop' },
    { id: 6, name: 'Souvenir Laut', avatar: 'https://images.unsplash.com/photo-1572503399363-444816a4a42b?w=100&h=100&fit=crop' },
  ];

  return (
    <>
      {/* AppBar */}
      <header className="h-16 bg-[linear-gradient(135deg,#0EA5E9,#14B8A6)] flex items-center px-3 gap-3 shrink-0 text-white">
        <button className="p-2">
          <Icon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">Detail Event</h2>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-24">
        {/* Hero Image */}
        <img src="https://images.unsplash.com/photo-1567593810070-7a3d475af052?w=400&h=225&fit=crop" alt="Pasar Malam Kemerdekaan" className="aspect-[16/9] w-full object-cover" />

        <div className="p-4 space-y-4">
          {/* Info Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,.08),0_2px_8px_rgba(15,23,42,.05)] p-4">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-xl font-bold text-[#0F172A] max-w-[80%]">Pasar Malam Kemerdekaan</h1>
              <span className="text-white text-[11px] font-extrabold rounded-full px-2.5 py-1 bg-emerald-600 shrink-0">Open</span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#64748B] mb-4">
              <div className="flex items-center"><Icon path="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" className="w-4 h-4 mr-2 text-sky-500" /> 17-20 Agu 2024</div>
              <div className="flex items-center"><Icon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" className="w-4 h-4 mr-2 text-sky-500" /> Alun-alun Pacitan</div>
              <div className="flex items-center"><Icon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" className="w-4 h-4 mr-2 text-sky-500" /> Pemkab Pacitan</div>
              <div className="flex items-center"><Icon path="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" className="w-4 h-4 mr-2 text-sky-500" /> Gratis & Terbuka</div>
            </div>

            <p className="text-sm text-[#64748B] mb-4">
              Rayakan kemerdekaan dengan semangat lokal di Pasar Malam Kemerdekaan Pacitan! Menampilkan puluhan UMKM terbaik, kuliner khas, dan kerajinan tangan otentik.
              <br/><br/>
              Nikmati panggung hiburan setiap malam, wahana permainan untuk keluarga, dan berbagai lomba seru dengan hadiah menarik. Acara ini adalah wujud dukungan kita bersama untuk ekonomi lokal.
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="bg-cyan-50 border border-cyan-100 text-sky-900 rounded-full px-3 py-1 text-[11px] font-extrabold">42 Booth</span>
              <span className="bg-cyan-50 border border-cyan-100 text-sky-900 rounded-full px-3 py-1 text-[11px] font-extrabold">5000+ Pengunjung</span>
              <span className="bg-cyan-50 border border-cyan-100 text-sky-900 rounded-full px-3 py-1 text-[11px] font-extrabold">Panggung Hiburan</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 h-11 rounded-full border-2 border-[#0EA5E9] text-[#0EA5E9] font-bold text-sm">Daftar Booth</button>
              <button className="flex-1 h-11 rounded-full bg-[linear-gradient(135deg,#0EA5E9,#14B8A6)] text-white font-bold text-sm">Lihat Denah</button>
            </div>
          </div>

          {/* Peserta Booth */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,.08),0_2px_8px_rgba(15,23,42,.05)] p-4">
            <h3 className="text-base font-bold text-[#0F172A] mb-3">Peserta Booth</h3>
            <div className="grid grid-cols-3 gap-4">
              {participants.map(p => (
                <div key={p.id} className="text-center">
                  <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-white shadow-md" />
                  <p className="text-xs font-semibold text-[#0F172A]">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-[#E5E7EB] p-3 flex items-center gap-3 shrink-0">
        <button className="w-11 h-11 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center shrink-0">
          <Icon path="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" className="w-5 h-5 text-[#64748B]" />
        </button>
        <button className="flex-1 h-12 rounded-full bg-[linear-gradient(135deg,#0EA5E9,#14B8A6)] text-white font-bold text-sm">Ajukan Partisipasi</button>
      </footer>
    </>
  );
};

export default GoBazzarDetailPage;
