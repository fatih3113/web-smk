'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/berita')
      .then(r => setBerita(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Logika Filter dan Search
  const filtered = berita.filter(b => {
    const matchFilter = filter === 'semua' || b.kategori === filter;
    const matchSearch = b.judul.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#060a14] text-white selection:bg-green-500/30">
      {/* NAVBAR */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-[#060a14]/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center font-bold text-xs shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
            SMK
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight text-white/90">SMK NUSANTARA TEGAL</p>
            <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Innovation & Excellence</p>
          </div>
        </Link>
        <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2">
          <span>←</span> Beranda
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* HEADER SECTION */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Warta <span className="text-green-500">Sekolah.</span>
          </h1>
          <p className="text-white/40 max-w-lg text-lg leading-relaxed">
            Eksplorasi kegiatan, prestasi, dan pengumuman terbaru dari seluruh civitas akademika.
          </p>
        </header>

        {/* TOOLBAR: Filter & Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            {['semua', 'berita', 'pengumuman'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === f
                    ? 'bg-green-600 text-white shadow-xl shadow-green-600/20'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-green-500 transition-colors">
              🔍
            </span>
            <input 
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        {/* CONTENT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-white/5 rounded-3xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 rounded-3xl border border-dashed border-white/10">
            <p className="text-5xl mb-6 grayscale opacity-50">📁</p>
            <h3 className="text-xl font-bold text-white/60">Tidak ditemukan</h3>
            <p className="text-white/30 text-sm mt-2">Coba kata kunci atau filter kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map(b => (
              <Link 
                key={b.id} 
                href={`/berita/${b.slug}`} 
                className="group relative bg-[#111625] border border-white/5 hover:border-green-500/30 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                {/* Image Container */}
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111625] to-transparent z-10" />
                  {b.gambar ? (
                    <img 
                      src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}/uploads/${b.gambar}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={b.judul} 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-5xl">
                      📰
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${
                    b.kategori === 'pengumuman' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-400/30'
                  }`}>
                    {b.kategori}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-7 relative z-20">
                  <h3 className="text-lg font-bold leading-tight mb-4 group-hover:text-green-400 transition-colors line-clamp-2">
                    {b.judul}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-white/30">
                      <span className="text-xs">📅</span>
                      <span className="text-[11px] font-medium uppercase tracking-wider">
                        {new Date(b.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <span className="text-green-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}