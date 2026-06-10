'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

export default function AdminGaleri() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [galeri, setGaleri] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/galeri');
      setGaleri(res.data);
    } catch {
      toast.error('Gagal memuat galeri');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!data.gambar[0]) return toast.error('Pilih gambar terlebih dahulu');
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append('judul', data.judul);
      form.append('gambar', data.gambar[0]);
      await api.post('/galeri', form);
      toast.success('Foto berhasil ditambahkan');
      reset();
      fetchData();
    } catch {
      toast.error('Gagal upload foto');
    }
    setSubmitting(false);
  };

  const hapus = async (id: number) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;
    try {
      await api.delete(`/galeri/${id}`);
      setGaleri(prev => prev.filter(g => g.id !== id));
      toast.success('Foto dihapus');
    } catch {
      toast.error('Gagal menghapus foto');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-white/50 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-white/20">|</span>
          <span className="font-semibold">Kelola Galeri</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold mb-2">Kelola Galeri</h1>
        <p className="text-white/50 text-sm mb-8">Upload dan kelola foto kegiatan sekolah</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="font-bold mb-4">Upload Foto Baru</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
            <input
              {...register('judul', { required: true })}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Judul / keterangan foto"
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              {...register('gambar', { required: true })}
              className="text-sm text-white/70 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:text-xs"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              {submitting ? 'Mengupload...' : '📤 Upload'}
            </button>
          </form>
        </div>

        {loading ? (
          <div className="py-20 text-center text-white/30">
            <p className="text-2xl mb-2">⏳</p>
            <p>Memuat galeri...</p>
          </div>
        ) : galeri.length === 0 ? (
          <div className="py-20 text-center text-white/30">
            <p className="text-4xl mb-4">🖼️</p>
            <p>Belum ada foto. Upload foto pertama!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galeri.map(g => (
              <div key={g.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                <div className="h-40 bg-white/10 flex items-center justify-center">
                  {g.gambar ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}/uploads/${g.gambar}`}
                      className="w-full h-full object-cover"
                      alt={g.judul}
                    />
                  ) : (
                    <span className="text-4xl">🖼️</span>
                  )}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <p className="text-sm font-medium truncate flex-1">{g.judul}</p>
                  <button
                    onClick={() => hapus(g.id)}
                    className="text-red-400 hover:text-red-300 text-xs ml-2 flex-shrink-0"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}