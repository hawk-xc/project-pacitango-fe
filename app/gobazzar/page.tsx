import React from 'react';
import { BazaarEventCard } from './BazaarEventCard';

// Helper components for icons (as per prompt, using inline SVGs)
const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const LocationIcon = () => <Icon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" className="w-3 h-3 mr-1 text-[#64748B]" />;
const CalendarIcon = () => <Icon path="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" className="w-3 h-3 mr-1 text-[#64748B]" />;
const TentIcon = () => <Icon path="M12 3L4 9v12h16V9l-8-6zM9.78 19H6v-5.5l3.78-2.52v8.02zM18 19h-3.78v-8.02L18 13.5V19z" className="w-3 h-3 mr-1 text-[#64748B]" />;
const UsersIcon = () => (
  <Icon
    path="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
    className="w-3 h-3 mr-1 text-[#64748B]"
  />
);

const GoBazzarHomePage = () => {
  const seminars = [
    { id: 1, title: 'Strategi Pemasaran Digital untuk UMKM', source: 'YouTube', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&h=200&fit=crop' },
    { id: 2, title: 'Manajemen Keuangan di Era Digital', source: 'Zoom', image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=300&h=200&fit=crop' },
    { id: 3, title: 'Legalitas dan Perizinan Usaha Modern', source: 'GMeet', image: 'https://images.unsplash.com/photo-1586473219118-4018d646ce58?w=300&h=200&fit=crop' },
  ];

  const events = [
    { id: 1, title: 'Pasar Malam Kemerdekaan', location: 'Alun-alun Pacitan', date: '17-20 Agustus 2024', booths: 42, visitors: '5k+', image: 'https://images.unsplash.com/photo-1567593810070-7a3d475af052?w=200&h=200&fit=crop' },
    { id: 2, title: 'Bazar Kuliner & Kerajinan Tangan', location: 'Pantai Teleng Ria', date: '25-28 Agustus 2024', booths: 35, visitors: '3k+', image: 'https://images.unsplash.com/photo-1579447228953-85170150b4a2?w=200&h=200&fit=crop' },
    { id: 3, title: 'Festival Layang-layang & Bazar', location: 'Pantai Soge', date: '5-7 September 2024', booths: 20, visitors: '2k+', image: 'https://images.unsplash.com/photo-1516658313893-37481161b220?w=200&h=200&fit=crop' },
  ];

  const bottomNav = [
    { id: 'home', label: 'Home', icon: <Icon path="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /> },
    { id: 'event', label: 'Event', icon: <Icon path="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm0 16H5V9h14v10zM5 7V5h14v2H5z" /> },
    {
      id: 'umkm',
      label: 'Go UMKM',
      icon: <Icon path="M12 2L4 7v10l8 5 8-5V7l-8-5zM7.75 16.99l-2.25-1.3V9.32l2.25 1.3v6.37zm4.5 2.26L8 17v-6.18l4.25 2.46v6.17zm0-11.08L5.53 6.5 12 2.8l6.47 3.7-6.22 3.62zM14.25 16.99v-6.37l2.25-1.3v6.31l-2.25 1.36z" />,
    },
    { id: 'layanan', label: 'Layanan', icon: <Icon path="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4h-4v-2h4v2z" /> },
    { id: 'akun', label: 'Akun', icon: <Icon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /> },
  ];

  return (
    <>
      {/* AppBar */}
      <header className="h-16 bg-[linear-gradient(135deg,#0EA5E9,#14B8A6)] flex items-center px-3 gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Icon
            path="M12 3.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5S16.69 3.5 12 3.5zm0 2.5c1.5 0 2.8.55 3.82 1.44l-1.06 1.06c-.7-.63-1.63-.99-2.63-.99-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.99 0 1.93-.36 2.63-.99l1.06 1.06C14.8 16.95 13.5 17.5 12 17.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5z"
            className="w-5 h-5 text-white"
          />
        </div>
        <div className="relative flex-1">
          <input type="text" placeholder='Cari "Pasar Malam"' className="h-9 w-full rounded-full bg-white border border-[#E5E7EB] px-10 text-[13px] text-[#0F172A] placeholder:text-[#94A3B8]" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon
              path="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              className="w-4 h-4 text-[#94A3B8]"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-3 pb-24">
        {/* Banner */}
        <div className="h-36 rounded-2xl border border-[#cfe8ff] bg-[linear-gradient(135deg,rgba(14,165,233,.12),rgba(20,184,166,.12))] p-4 flex items-center justify-between mb-6">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-[#0F172A] font-bold text-lg">UMKM PACITAN</h2>
              <p className="text-xs text-[#64748B] max-w-[160px]">Program & event untuk memajukan UMKM lokal.</p>
            </div>
            <button className="bg-white border border-[#0EA5E9] text-[#0EA5E9] rounded-full px-3 py-1 text-[11px] font-extrabold self-start">Lihat Program</button>
          </div>
          <div className="w-24 h-24 rounded-full bg-[linear-gradient(135deg,#14B8A6,#0EA5E9)] opacity-50"></div>
        </div>

        {/* Seminar Terdekat */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Seminar Terdekat</h3>
            <a href="#" className="text-sky-600 font-extrabold text-xs">
              Lihat Semua
            </a>
          </div>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-3 px-3">
            {seminars.map((seminar) => (
              <div key={seminar.id} className="snap-start shrink-0 w-40">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,.08),0_2px_8px_rgba(15,23,42,.05)] p-2">
                  <img src={seminar.image} alt={seminar.title} className="w-full h-20 object-cover rounded-xl mb-2" />
                  <h4 className="text-[12px] font-bold text-[#0F172A] leading-tight line-clamp-2 mb-1 h-9">{seminar.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs text-[#64748B]">
                      <CalendarIcon /> 12 Sep
                    </span>
                    <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-[10px] font-medium">{seminar.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Bazar Terdekat */}
        {/* <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-extrabold text-[#0F172A]">Event Bazar</h3>
            <button className="bg-white border border-[#E5E7EB] text-[#64748B] rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
              <CalendarIcon /> Choose Date
            </button>
          </div>
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,.08),0_2px_8px_rgba(15,23,42,.05)] p-3 flex gap-3 relative">
                <img src={event.image} alt={event.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-[15px] text-[#0F172A] mb-1.5">{event.title}</h4>
                  <div className="space-y-1 text-xs text-[#64748B]">
                    <p className="flex items-center"><LocationIcon /> {event.location}</p>
                    <p className="flex items-center"><CalendarIcon /> {event.date}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#64748B]">
                    <span className="flex items-center"><TentIcon /> {event.booths}</span>
                    <span className="flex items-center"><UsersIcon /> {event.visitors}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-teal-100 text-teal-700 text-[11px] font-extrabold rounded-full px-3 py-1">Open</div>
              </div>
            ))}
          </div>
        </section> */}
        <BazaarEventCard date="12 Sep" title="Bazar Ramadhan" place="Masjid Al-Ikhlas" bannerSrc="/banner.jpg" boothsLeft={5} visitorsEst={100} status="open" />
        <BazaarEventCard date="12 Sep" title="Bazar Ramadhan" place="Masjid Al-Ikhlas" bannerSrc="/banner.jpg" boothsLeft={5} visitorsEst={100} status="open" />
      </main>

      {/* Bottom Tab Bar */}
      <footer className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] flex justify-around items-center shrink-0">
        {bottomNav.map((item, index) => (
          <button key={item.id} className="flex flex-col items-center justify-center h-full text-[#64748B] flex-1">
            <div className={`w-6 h-6 ${index === 0 ? 'text-[#0EA5E9]' : 'text-[#64748B]'}`}>{item.icon}</div>
            <span className={`text-[10px] font-bold ${index === 0 ? 'text-[#0EA5E9]' : 'text-[#64748B]'}`}>{item.label}</span>
            {index === 0 && <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-0.5 mx-auto"></div>}
          </button>
        ))}
      </footer>
    </>
  );
};

export default GoBazzarHomePage;
