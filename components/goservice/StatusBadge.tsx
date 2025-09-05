'use client';
export default function StatusBadge({ status }: { status: 'pending' | 'process' | 'success' }) {
  const label = { pending: 'Pending', process: 'Proses', success: 'Selesai' }[status];
  const color = status === 'pending' ? 'bg-amber-500' : status === 'process' ? 'bg-blue-500' : 'bg-emerald-600';
  return (
    <span className={`inline-flex items-center gap-2 text-white text-xs font-extrabold rounded-full px-3 py-1 shadow ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
      {label}
    </span>
  );
}
