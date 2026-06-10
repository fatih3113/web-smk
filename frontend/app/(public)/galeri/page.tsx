'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function GaleriPage() {
  const [galeri, setGaleri]     = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter]     = useState('semua');

  useEffect(() => {
    api.get('/galeri')
      .then(r => setGaleri(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Tutup lightbox dengan Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight' && selected) {
        const idx = galeri.findIndex(g => g.id === selected.id);
        if (idx < galeri.length - 1) setSelected(galeri[idx + 1]);
      }
      if (e.key === 'ArrowLeft' && selected) {
        const idx = galeri.findIndex(g => g.id === selected.id);
        if (idx > 0) setSelected(galeri[idx - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, galeri]);

  // Lock scroll saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const imgUrl = (nama: string) =>
    `${process.env.NEXT_PUBLIC_UPLOAD_URL}/uploads/${nama}`;

  const currentIdx = galeri.findIndex(g => g.id === selected?.id);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      {/* NAVBAR */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-[#080c18]/90 backdrop-blur sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-bold text-xs ring-2 ring-green-500/30">
            SMK
          </div>
          <div>
            <p className="font-bold text-sm">SMK FARMASI AL AMIN</p>
            <p className="text-green-400 text-xs">Dukuhturi</p>
          </div>
        </Link>
        <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">
          ← Beranda
        </Link>
      </nav>

      {/* HEADER */}
      <div className="relative overflow-hidden py-16 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-3">
            Dokumentasi
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Galeri Kegiatan
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Momen berharga dan kegiatan seru di SMK Farmasi Al Amin Dukuhturi
          </p>

          {/* Counter */}
          {!loading && galeri.length > 0 && (
            <div className="inline-flex items-center gap-2 mt-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-white/50">
              🖼️ {galeri.length} foto tersedia
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-white/10" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                  <div className="h-2 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KOSONG */}
        {!loading && galeri.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🖼️
            </div>
            <p className="text-white/40 text-lg font-medium mb-2">Belum ada foto</p>
            <p className="text-white/20 text-sm">Foto kegiatan akan segera ditambahkan</p>
          </div>
        )}

        {/* GRID FOTO */}
        {!loading && galeri.length > 0 && (
          <>
            {/* Masonry-style grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {galeri.map((g, idx) => (
                <div
                  key={g.id}
                  onClick={() => setSelected(g)}
                  className="break-inside-avoid group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/30"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {g.gambar ? (
                    <img
                      src={imgUrl(g.gambar)}
                      alt={g.judul}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-48 bg-white/5 flex items-center justify-center text-4xl">
                      🖼️
                    </div>
                  )}

                  {/* Overlay saat hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-semibold text-sm leading-tight">{g.judul}</p>
                    <p className="text-white/50 text-xs mt-1">
                      {new Date(g.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-green-400 text-xs font-medium">
                      <span>🔍</span>
                      <span>Lihat foto</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          {/* Container foto */}
          <div
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Tombol tutup */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              ✕ Tutup (Esc)
            </button>

            {/* Counter */}
            <div className="absolute -top-12 left-0 text-white/40 text-sm">
              {currentIdx + 1} / {galeri.length}
            </div>

            {/* Foto utama */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {selected.gambar ? (
                <img
                  src={imgUrl(selected.gambar)}
                  alt={selected.judul}
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-6xl">🖼️</div>
              )}
            </div>

            {/* Info foto */}
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="font-semibold text-white">{selected.judul}</p>
                <p className="text-white/40 text-sm mt-0.5">
                  {new Date(selected.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </p>
              </div>
              <div className="text-white/30 text-xs">
                ← → untuk navigasi
              </div>
            </div>

            {/* Tombol navigasi */}
            <button
              onClick={() => {
                if (currentIdx > 0) setSelected(galeri[currentIdx - 1]);
              }}
              disabled={currentIdx === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
            >
              ‹
            </button>
            <button
              onClick={() => {
                if (currentIdx < galeri.length - 1) setSelected(galeri[currentIdx + 1]);
              }}
              disabled={currentIdx === galeri.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
            >
              ›
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto pb-2">
            {galeri.map((g, i) => (
              <button
                key={g.id}
                onClick={e => { e.stopPropagation(); setSelected(g); }}
                className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  selected.id === g.id
                    ? 'border-green-500 scale-110'
                    : 'border-white/10 opacity-50 hover:opacity-80'
                }`}
              >
                {g.gambar ? (
                  <img src={imgUrl(g.gambar)} alt={g.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center text-lg">🖼️</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}