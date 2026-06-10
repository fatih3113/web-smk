'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

export default function AdminPPDB() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/ppdb');
      setData(res.data);
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/ppdb/${id}/status`, { status });
      setData(prev => prev.map(item => item.id === id ? { ...item, status } : item));
      toast.success('Status diperbarui');
    } catch {
      toast.error('Gagal update status');
    }
  };

  const hapus = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    try {
      await api.delete(`/ppdb/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
      toast.success('Data berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus data');
    }
  };

  const filtered = data.filter(d =>
    d.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    (d.nisn && d.nisn.includes(search))
  );

  const fileList = [
    { key: 'file_ijazah', label: 'Ijazah' },
    { key: 'file_skhun',  label: 'SKHUN'  },
    { key: 'file_akta',   label: 'Akta'   },
    { key: 'file_kk',     label: 'KK'     },
    { key: 'file_foto',   label: 'Foto'   },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">

      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-white/50 hover:text-white text-sm">
            ← Dashboard
          </Link>
          <span className="text-white/20">|</span>
          <span className="font-semibold">Kelola SPMB</span>
        </div>
        <span className="text-white/40 text-sm">{data.length} pendaftar</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-2xl font-extrabold mb-2">Data Pendaftar SPMB</h1>
        <p className="text-white/50 text-sm mb-8">
          Kelola dan perbarui status penerimaan peserta didik baru
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-blue-400">{data.length}</p>
            <p className="text-sm mt-1 text-blue-300">Total Pendaftar</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-yellow-400">
              {data.filter(d => d.status === 'pending').length}
            </p>
            <p className="text-sm mt-1 text-yellow-300">Pending</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-green-400">
              {data.filter(d => d.status === 'diterima').length}
            </p>
            <p className="text-sm mt-1 text-green-300">Diterima</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <p className="text-3xl font-extrabold text-red-400">
              {data.filter(d => d.status === 'ditolak').length}
            </p>
            <p className="text-sm mt-1 text-red-300">Ditolak</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau NISN..."
            className="w-full max-w-sm bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={fetchData}
            className="bg-white/10 border border-white/20 hover:border-green-500 text-white text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
            🔄 Refresh
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-white/30">
              <p className="text-2xl mb-2">⏳</p>
              <p className="text-sm">Memuat data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    {[
                      'No',
                      'Nama & NISN',
                      'Jurusan',
                      'Asal Sekolah',
                      'Tgl Lahir',
                      'Tgl Daftar',
                      'Berkas',
                      'Status',
                      'Aksi',
                    ].map(h => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-16 text-center text-white/30">
                        <p className="text-3xl mb-2">📭</p>
                        <p>
                          {search
                            ? `Tidak ada hasil untuk "${search}"`
                            : 'Belum ada pendaftar.'}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p, idx) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">

                        <td className="px-4 py-4 text-white/30 text-xs">
                          {idx + 1}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-white">{p.nama_lengkap}</p>
                          <p className="text-xs text-white/40 mt-0.5">📞 {p.no_hp}</p>
                          <p className="text-xs text-white/30 mt-0.5">NISN: {p.nisn}</p>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                              p.jurusan === 'Farmasi'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {p.jurusan === 'Farmasi' ? '💊 Farmasi' : '🌐 TKJ'}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-white/60 text-sm">
                          <p className="max-w-[130px] truncate">{p.asal_sekolah}</p>
                        </td>

                        <td className="px-4 py-4 text-white/50 text-xs whitespace-nowrap">
                          {p.tanggal_lahir
                            ? new Date(p.tanggal_lahir).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>

                        <td className="px-4 py-4 text-white/40 text-xs whitespace-nowrap">
                          {new Date(p.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            {fileList.map(f =>
                              p[f.key] ? (
                                <a
                                  key={f.key}
                                  href={`${process.env.NEXT_PUBLIC_UPLOAD_URL}/uploads/ppdb/${p[f.key]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 hover:underline text-xs"
                                >
                                  📄 {f.label}
                                </a>
                              ) : (
                                <span key={f.key} className="text-xs text-white/20">
                                  ✗ {f.label}
                                </span>
                              )
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                                p.status === 'diterima'
                                  ? 'bg-green-500/20 text-green-400'
                                  : p.status === 'ditolak'
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}
                            >
                              {p.status === 'diterima'
                                ? '✅ Diterima'
                                : p.status === 'ditolak'
                                ? '❌ Ditolak'
                                : '⏳ Pending'}
                            </span>
                            <select
                              aria-label="Status"
                              value={p.status}
                              onChange={e => updateStatus(p.id, e.target.value)}
                              className="text-xs px-2 py-1 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="diterima">Diterima</option>
                              <option value="ditolak">Ditolak</option>
                            </select>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <button
                            onClick={() => hapus(p.id)}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                          >
                            🗑 Hapus
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
              <span>
                Menampilkan {filtered.length} dari {data.length} pendaftar
              </span>
              <div className="flex gap-4">
                <span>
                  💊 Farmasi: {data.filter(d => d.jurusan === 'Farmasi').length}
                </span>
                <span>
                  🌐 TKJ: {data.filter(d => d.jurusan === 'Teknik Komputer Jaringan').length}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}