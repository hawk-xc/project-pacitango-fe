
'use client';

import { AduanProvider } from '@/lib/aduan-store.tsx';

export default function AduanLayout({ children }: { children: React.ReactNode }) {
  return <AduanProvider>{children}</AduanProvider>;
}
