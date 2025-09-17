import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GoBazzar',
  description: 'Explore local bazaars and events.',
};

export default function GoBazzarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[#eaeef3] flex items-center justify-center p-4">
      <div className="w-[375px] h-[812px] rounded-[26px] overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,.12)] bg-[#F6F8FC] relative flex flex-col">
        {children}
      </div>
    </div>
  );
}