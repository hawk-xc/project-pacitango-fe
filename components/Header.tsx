import { Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white">Aduan Fasilitas Pariwisata</h1>
          <p className="text-sm text-white/90">Pantau dan kelola masalah pariwisata</p>
        </div>
        <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
          <Bell className="h-6 w-6 text-white" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
