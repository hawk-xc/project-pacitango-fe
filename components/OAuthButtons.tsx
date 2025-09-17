'use client';
import Link from 'next/link';
import { Facebook } from 'lucide-react';

export default function OAuthButtons({ onGoogle, onFacebook, manualHref = '/register' }: { onGoogle: () => void; onFacebook: () => void; manualHref?: string }) {
  return (
    <div className="space-y-3">
      <Link href={manualHref} className="block">
        <button className="h-12 w-full rounded-[14px] bg-white text-gray-800 border border-gray-200 shadow hover:bg-gray-50">Buat Manual</button>
      </Link>

      <button onClick={onGoogle} className="h-12 w-full rounded-[14px] bg-white text-gray-800 border border-gray-200 shadow hover:bg-gray-50 flex items-center justify-center gap-2" aria-label="Sign In with Google">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 text-sm">G</span>
        <span>Sign In with Google</span>
      </button>

      <button onClick={onFacebook} className="h-12 w-full rounded-[14px] bg-[#1877F2] text-white shadow hover:brightness-95 flex items-center justify-center gap-2" aria-label="Sign In with Facebook">
        <Facebook size={18} />
        <span>Sign In with Facebook</span>
      </button>
    </div>
  );
}
