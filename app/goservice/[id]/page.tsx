'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGoService } from '@/lib/goservice/store';
import StatusBadge from '@/components/goservice/StatusBadge';
import MapPreview from '@/components/goservice/MapPreview';

import { seedComplaints } from '@/lib/goservice/data';

export async function generateStaticParams() {
  return seedComplaints.map((complaint) => ({
    id: complaint.id,
  }));
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, deleteComplaint, addComment, addHistory, isLoading } = useGoService();
  
  if (isLoading) {
    return <div className="p-6 text-center">Memuat aduan...</div>;
  }

  const c = getById(id);

  if (!c) return <div className="p-6">Data tidak ditemukan.</div>;

  const addQuickComment = () => {
    addComment(c.id, { name: 'Anda', message: 'Catatan diterima, terima kasih!' });
  };

  const goEdit = () => router.push(`/goservice/${c.id}/edit`);

  const onDelete = () => {
    if (confirm('Hapus aduan ini?')) {
      deleteComplaint(c.id);
      router.push('/goservice');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white">
        <div className="flex flex-col h-full">
          {/* AppBar */}
          <div className="h-16 text-white px-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
            <button onClick={() => router.back()} className="w-7 h-7 rounded-full bg-white/20 grid place-items-center">
              ←
            </button>
            <h1 className="font-extrabold tracking-wide">Detail Aduan</h1>
            <button onClick={onDelete} className="ml-auto text-white/95 border border-white/40 rounded-md px-2 py-1 text-xs font-extrabold">
              Hapus
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <h2 className="text-xl font-extrabold">{c.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 text-sky-900 bg-cyan-50 border border-cyan-100 rounded-full text-xs font-extrabold px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                {c.category}
              </span>
              <StatusBadge status={c.status} />
            </div>

            {/* Gallery */}
            <Card title="Foto Bukti">
              {c.photos.length ? (
                <div className="flex gap-3 overflow-x-auto">
                  {c.photos.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src} alt={`foto-${i}`} className="min-w-[160px] h-28 object-cover rounded-xl border" />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500">Belum ada foto.</div>
              )}
            </Card>

            {/* Deskripsi */}
            <Card title="Deskripsi Aduan">
              <p>{c.description}</p>
            </Card>

            {/* Lokasi */}
            <Card title="Lokasi">
              <MapPreview lat={c.location.lat} lng={c.location.lng} address={c.location.address} />
            </Card>

            {/* Timeline */}
            <Card title="Riwayat Proses">
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200" />
                {c.history.map((h) => (
                  <div key={h.id} className="mb-3 relative">
                    <div className="absolute -left-[13px] top-1 w-3 h-3 rounded-full bg-sky-300 border border-white shadow" />
                    <div className="font-extrabold text-sm">{h.title}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(h.at).toLocaleString()} {h.by ? `• ${h.by}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Komentar */}
            <Card title="Komentar / Tanggapan">
              <div className="space-y-3">
                {c.comments.map((cm) => (
                  <div key={cm.id} className="flex gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-extrabold grid place-items-center">{cm.name.slice(0, 2).toUpperCase()}</div>
                    <div className="flex-1 border rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-sm font-extrabold">{cm.name}</div>
                      <div className="text-sm">{cm.message}</div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(cm.at).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                <button onClick={addQuickComment} className="text-xs font-extrabold px-3 py-2 rounded-lg border bg-white">
                  Tambah Komentar Cepat
                </button>
              </div>
            </Card>
          </div>

          {/* Sticky actions */}
          <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-b from-transparent via-white/90 to-white border-t flex gap-2">
            <button onClick={() => addQuickComment()} className="w-12 rounded-xl border bg-white grid place-items-center">
              💬
            </button>
            <button onClick={goEdit} className="flex-1 h-12 rounded-xl text-white font-extrabold shadow" style={{ background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)' }}>
              Update Aduan
            </button>
          </div>
        </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-3 p-3 bg-white border border-slate-200 rounded-2xl shadow">
      <h3 className="uppercase text-[13px] tracking-wide text-slate-500 font-extrabold mb-2">{title}</h3>
      {children}
    </section>
  );
}
