'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

export default function AdminBerita() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/berita');
      setBerita(res.data);
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append('judul', data.judul);
      form.append('isi', data.isi);
      form.append('kategori', data.kategori);
      if (data.gambar[0]) form.append('gambar', data.gambar[0]);
      await api.post('/berita', form);
      toast.success('Berita berhasil ditambahkan');
      reset();
      setShowForm(false);
      fetchData();
    } catch {
      toast.error('Gagal menambahkan berita');
    }
    setSubmitting(false);
  };

  const hapus = async (id: number) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;
    try {
      await api.delete(`/berita/${id}`);
      setBerita(prev => prev.filter(b => b.id !== id));
      toast.success('Berita dihapus');
    } catch {
      toast.error('Gagal menghapus berita');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-white/50 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-white/20">|</span>
          <span className="font-semibold">Kelola Berita</span>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          {showForm ? '✕ Batal' : '+ Tambah Berita'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold mb-2">Kelola Berita & Pengumuman</h1>
        <p className="text-white/50 text-sm mb-8">Tambah dan hapus berita atau pengumuman sekolah</p>

        {showForm && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg mb-5">Tambah Berita Baru</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">Judul *</label>
                <input
                  {...register('judul', { required: true })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Judul berita"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Kategori *</label>
                  <select
                    {...register('kategori', { required: true })}
                    className="w-full bg-[#0a0f1e] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="berita">Berita</option>
                    <option value="pengumuman">Pengumuman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Gambar (opsional)</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    {...register('gambar')}
                    className="w-full text-sm text-white/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Isi Berita *</label>
                <textarea
                  {...register('isi', { required: true })}
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tulis isi berita di sini..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
              >
                {submitting ? 'Menyimpan...' : 'Simpan Berita'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-white/30">
            <p className="text-2xl mb-2">⏳</p>
            <p>Memuat data...</p>
          </div>
        ) : berita.length === 0 ? (
          <div className="py-20 text-center text-white/30">
            <p className="text-4xl mb-4">📭</p>
            <p>Belum ada berita. Klik tombol Tambah Berita.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {berita.map(b => (
              <div key={b.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                      b.kategori === 'pengumuman' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {b.kategori}
                    </span>
                  </div>
                  <p className="font-semibold truncate">{b.judul}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {new Date(b.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </p>
                </div>
                <button
                  onClick={() => hapus(b.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                >
                  🗑 Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}