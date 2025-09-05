
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type DetailHeaderProps = {
    title: string;
    subtitle: string;
}

export function DetailHeader({ title, subtitle }: DetailHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-b-3xl p-5 text-white relative shadow-lg">
      <div className="relative z-10 flex items-center justify-center">
        <Link href="/aduanPariwisata" className="absolute left-0 p-2" aria-label="Kembali ke daftar aduan">
            <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="text-center">
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-xs opacity-90 font-light">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
