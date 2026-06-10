'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

export default function AdminKontak() {
  const router = useRouter();
  const [pesan, setPesan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/kontak');
      setPesan(res.data);
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const hapus = async (id: number) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    try {
      await api.delete(`/kontak/${id}`);
      setPesan(prev => prev.filter(p => p.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success('Pesan dihapus');
    } catch {
      toast.error('Gagal menghapus pesan');
    }
  };

  const handleBalas = (email: string) => {
    const subject = 'Re: Pesan dari Website SMK Nusantara Tegal';
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-white/50 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-white/20">|</span>
          <span className="font-semibold">Pesan Masuk</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
            {pesan.length} pesan
          </span>
          <button
            onClick={fetchData}
            className="bg-white/10 border border-white/20 hover:border-green-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold mb-2">Pesan dari Pengunjung</h1>
        <p className="text-white/50 text-sm mb-8">Pesan yang dikirim melalui halaman kontak website</p>

        {loading ? (
          <div className="py-20 text-center text-white/30">
            <p className="text-2xl mb-2">⏳</p>
            <p>Memuat pesan...</p>
          </div>
        ) : pesan.length === 0 ? (
          <div className="py-20 text-center text-white/30">
            <p className="text-4xl mb-4">📭</p>
            <p>Belum ada pesan masuk.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* List Pesan */}
            <div className="space-y-3">
              {pesan.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`bg-white/5 border rounded-2xl p-5 cursor-pointer transition-all ${
                    selected?.id === p.id
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-green-600/30 flex items-center justify-center text-green-400 font-bold text-sm flex-shrink-0">
                          {p.nama.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold truncate">{p.nama}</p>
                      </div>
                      <p className="text-xs text-white/40 ml-10">{p.email}</p>
                      <p className="text-sm text-white/50 mt-2 line-clamp-2 ml-10">{p.pesan}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p className="text-xs text-white/30 whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </p>
                      <button
                        onClick={e => { e.stopPropagation(); hapus(p.id); }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-lg transition-colors"
                      >
                        🗑 Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Pesan */}
            <div className="sticky top-24">
              {selected ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 rounded-full bg-green-600/30 flex items-center justify-center text-green-400 font-bold text-xl">
                      {selected.nama.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{selected.nama}</p>
                      <p className="text-white/50 text-sm">{selected.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Pesan</p>
                      <p className="text-white/80 leading-relaxed bg-white/5 rounded-xl p-4">
                        {selected.pesan}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Dikirim pada</p>
                      <p className="text-white/60 text-sm">
                        {new Date(selected.created_at).toLocaleDateString('id-ID', {
                          weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
                        })}
                        {' pukul '}
                        {new Date(selected.created_at).toLocaleTimeString('id-ID', {
                          hour: '2-digit', minute: '2-digit'
                        })} WIB
                      </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleBalas(selected.email)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                      >
                        ✉️ Balas via Email
                      </button>
                      <button
                        onClick={() => hapus(selected.id)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                      >
                        🗑 Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-white/30">
                  <p className="text-4xl mb-4">👈</p>
                  <p>Klik pesan untuk melihat detail</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}