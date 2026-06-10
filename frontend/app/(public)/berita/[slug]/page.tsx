'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

export default function DetailBerita() {
  const { slug } = useParams();
  const [berita, setBerita] = useState<any>(null);

  useEffect(() => {
    if (slug) api.get(`/berita/${slug}`).then(r => setBerita(r.data)).catch(() => {});
  }, [slug]);

  if (!berita) return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center text-white/50">
      Memuat...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-bold text-sm">SMK</div>
          <div>
            <p className="font-bold text-sm">SMK NUSANTARA TEGAL</p>
            <p className="text-green-400 text-xs">Farmasi & TKJ</p>
          </div>
        </Link>
        <Link href="/berita" className="text-white/60 hover:text-white text-sm">← Berita</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <span className={`text-xs font-bold uppercase tracking-wider ${berita.kategori === 'pengumuman' ? 'text-blue-400' : 'text-green-400'}`}>
          {berita.kategori}
        </span>
        <h1 className="text-3xl font-extrabold mt-3 mb-4">{berita.judul}</h1>
        <p className="text-white/40 text-sm mb-8">
          {new Date(berita.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
        </p>
        {berita.gambar && (
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}/uploads/${berita.gambar}`}
            className="w-full rounded-2xl mb-8 object-cover max-h-80"
            alt={berita.judul}
          />
        )}
        <div className="text-white/70 leading-relaxed whitespace-pre-wrap">
          {berita.isi}
        </div>
      </div>
    </div>
  );
}