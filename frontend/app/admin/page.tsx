'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { isLoggedIn, removeToken, getToken } from '@/lib/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [ppdb, setPpdb] = useState<any[]>([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn()) { router.push('/admin/login'); return; }
      api.get('/ppdb').then(r => setPpdb(r.data)).catch(() => {});
    }, 100);
  }, []);

  const logout = () => { removeToken(); router.push('/admin/login'); };

  const downloadExcel = async () => {
    setDownloading(true);
    try {
      const token = getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ppdb/export`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error('Gagal download');

      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `data-spmb-${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('File Excel berhasil didownload!');
    } catch {
      toast.error('Gagal mendownload file Excel');
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">

      {/* TOP BAR */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">SMK</div>
          <span className="font-semibold">Admin Panel — SMK Farmasi Al Amin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/50 hover:text-white text-sm">← Website</Link>
          <button onClick={logout} className="text-red-400 hover:text-red-300 text-sm font-medium">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold mb-2">Dashboard</h1>
        <p className="text-white/50 mb-8">Selamat datang di panel admin SMK Farmasi Al Amin Dukuhturi</p>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-blue-400">{ppdb.length}</p>
            <p className="text-sm mt-1 text-blue-300">Total Pendaftar</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-yellow-400">{ppdb.filter(p => p.status === 'pending').length}</p>
            <p className="text-sm mt-1 text-yellow-300">Menunggu</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-green-400">{ppdb.filter(p => p.status === 'diterima').length}</p>
            <p className="text-sm mt-1 text-green-300">Diterima</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-red-400">{ppdb.filter(p => p.status === 'ditolak').length}</p>
            <p className="text-sm mt-1 text-red-300">Ditolak</p>
          </div>
        </div>

        {/* MENU */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { href: '/admin/ppdb',   label: 'Kelola SPMB',  desc: 'Review & update status pendaftar', icon: '📋' },
            { href: '/admin/berita', label: 'Kelola Berita', desc: 'Tambah & edit berita/pengumuman',  icon: '📰' },
            { href: '/admin/galeri', label: 'Kelola Galeri', desc: 'Upload & hapus foto kegiatan',     icon: '🖼️' },
            { href: '/admin/kontak', label: 'Pesan Masuk',   desc: 'Lihat pesan dari pengunjung',      icon: '✉️' },
          ].map(m => (
            <Link key={m.href} href={m.href} className="bg-white/5 border border-white/10 hover:border-green-500/50 rounded-2xl p-6 transition-all">
              <p className="text-2xl mb-3">{m.icon}</p>
              <p className="font-bold mb-1">{m.label}</p>
              <p className="text-sm text-white/50">{m.desc}</p>
            </Link>
          ))}
        </div>

        {/* TABEL PENDAFTAR */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-bold">Pendaftar Terbaru</h2>
            <div className="flex items-center gap-3">
              {/* TOMBOL DOWNLOAD EXCEL */}
              <button
                onClick={downloadExcel}
                disabled={downloading || ppdb.length === 0}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {downloading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Mengunduh...
                  </>
                ) : (
                  <>📥 Download Excel</>
                )}
              </button>
              <Link href="/admin/ppdb" className="text-green-400 text-sm hover:text-green-300">
                Lihat semua →
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/40 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Nama</th>
                  <th className="px-6 py-3 text-left">NISN</th>
                  <th className="px-6 py-3 text-left">Jurusan</th>
                  <th className="px-6 py-3 text-left">Tanggal Daftar</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ppdb.slice(0, 5).map(p => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-3 font-medium">{p.nama_lengkap}</td>
                    <td className="px-6 py-3 text-white/50 text-xs">{p.nisn}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                        p.jurusan === 'Farmasi'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {p.jurusan === 'Farmasi' ? '💊 Farmasi' : '🌐 TKJ'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-white/40 text-xs">
                      {new Date(p.created_at).toLocaleDateString('id-ID', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        p.status === 'diterima' ? 'bg-green-500/20 text-green-400' :
                        p.status === 'ditolak'  ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {p.status === 'diterima' ? '✅ Diterima' :
                         p.status === 'ditolak'  ? '❌ Ditolak'  : '⏳ Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
                {ppdb.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                      <p className="text-3xl mb-2">📭</p>
                      <p>Belum ada pendaftar.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {ppdb.length > 0 && (
            <div className="px-6 py-3 border-t border-white/10 text-xs text-white/30 flex justify-between">
              <span>Menampilkan {ppdb.length} pendaftar</span>
              <span>
                💊 Farmasi: {ppdb.filter(p => p.jurusan === 'Farmasi').length} &nbsp;·&nbsp;
                🌐 TKJ: {ppdb.filter(p => p.jurusan === 'Teknik Komputer Jaringan').length}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}