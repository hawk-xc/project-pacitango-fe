
'use client';

import { GoServiceProvider } from '@/lib/goservice/store';

export default function GoServiceLayout({ children }: { children: React.ReactNode }) {
  return <GoServiceProvider>{children}</GoServiceProvider>;
}
