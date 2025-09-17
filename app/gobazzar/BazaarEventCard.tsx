import React from 'react';
import Image from 'next/image';

type BazaarEventCardProps = {
  date: string;
  title: string;
  place: string;
  bannerSrc: string;
  boothsLeft: number | string;
  visitorsEst: number | string;
  status?: 'open' | 'closed';
  onRentHref?: string;
  onDetailHref?: string;
};

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const BazaarEventCard = ({ date, title, place, bannerSrc, boothsLeft, visitorsEst, status, onRentHref = '#', onDetailHref = '#' }: BazaarEventCardProps) => {
  const titleId = `event-title-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <article aria-labelledby={titleId} className="w-full bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_8px_28px_rgba(15,23,42,.08),0_2px_8px_rgba(15,23,42,.05)] p-2">
      <div className="grid grid-cols-[136px,1fr] gap-3 items-start">
        {/* Left Column: Thumbnail */}
        <div className="w-[136px] h-[84px] rounded-xl overflow-hidden border border-[#dbeafe] bg-[#f1f5f9]">
          <Image src={bannerSrc} alt={`Banner untuk event ${title}`} width={136} height={84} className="object-cover w-full h-full" />
        </div>

        {/* Right Column: Content */}
        <div className="relative flex flex-col h-full">
          {status && <div className={`absolute top-0 right-0 text-white text-[11px] font-extrabold rounded-full px-2.5 py-1 ${status === 'open' ? 'bg-emerald-600' : 'bg-slate-400'}`}>{status === 'open' ? 'Open' : 'Closed'}</div>}

          <div>
            <p className="text-[11px] font-semibold text-[#64748B] mb-0.5">{date}</p>
            <h3 id={titleId} className="text-[15px] leading-tight font-extrabold text-[#0F172A] pr-14">
              {title}
            </h3>
            <p className="mt-0.5 text-[12px] text-[#475569] flex items-center gap-1.5">
              <MapPinIcon />
              <span>{place}</span>
            </p>
          </div>

          <div className="flex-grow" />

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl px-3 py-2">
              <p className="text-[11px] font-semibold text-[#64748B]">Lapak Tersisa</p>
              <p className="text-sky-600 text-[18px] leading-none font-extrabold mt-0.5">{boothsLeft}</p>
            </div>
            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl px-3 py-2">
              <p className="text-[11px] font-semibold text-[#64748B]">Pengunjung</p>
              <p className="text-sky-600 text-[18px] leading-none font-extrabold mt-0.5">{visitorsEst}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end gap-2">
            <a href={onDetailHref} className="px-4 h-8 rounded-xl border border-[#93C5FD] text-sky-700 text-[12px] font-extrabold bg-white inline-flex items-center justify-center">
              Detail
            </a>
            <a href={onRentHref} className="px-4 h-8 rounded-xl text-white text-[12px] font-extrabold bg-[#0EA5E9] hover:brightness-110 inline-flex items-center justify-center">
              Sewa
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
