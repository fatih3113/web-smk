'use client';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.nama.trim() || !form.email.trim() || !form.pesan.trim()) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/kontak', form);
      toast.success(res.data.msg);
      setForm({ nama: '', email: '', pesan: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Gagal mengirim pesan');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-bold text-xs">SMK</div>
          <div>
            <p className="font-bold text-sm">SMK FARMASI AL AMIN DUKUHTURI</p>
            <p className="text-green-400 text-xs">Farmasi & TKJ</p>
          </div>
        </Link>
        <Link href="/" className="text-white/60 hover:text-white text-sm">← Beranda</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">Hubungi Kami</p>
        <h1 className="text-4xl font-extrabold mb-4">Kontak</h1>
        <p className="text-white/50 mb-12">Hubungi kami untuk info SPMB dan pertanyaan lainnya.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: '📍', label: 'Alamat',           val: 'Jl. Pesantren No. 8 Bandasari RT 06/01, Dukuhturi, Tegal' },
              { icon: '📞', label: 'Info SPMB',        val: '0895-3578-24656 (Bu Rahma)' },
              { icon: '📱', label: 'WhatsApp',         val: '0821-3792-9140 (Bu Anis)' },
              { icon: '📱', label: 'WhatsApp',         val: '0856-4042-6203 (Bu Salma)' },
              { icon: '📲', label: 'Instagram',        val: '@smkfarmindukuhturi' },
              { icon: '🕐', label: 'Jam Operasional',  val: 'Senin–Jumat: 07.00–15.00 WIB' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-white/40 mb-1">{item.label}</p>
                  <p className="font-medium text-white/80">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="font-bold text-lg mb-6">Kirim Pesan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">Nama Lengkap</label>
                <input
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nama kamu"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="email@kamu.com"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Pesan</label>
                <textarea
                  name="pesan"
                  rows={4}
                  value={form.pesan}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tulis pesanmu di sini..."
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}