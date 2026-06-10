import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1e] text-white/60 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
              SMK
            </div>
            <div>
              <p className="text-white font-bold text-sm">SMK NUSANTARA TEGAL</p>
              <p className="text-green-400 text-xs">Farmasi & TKJ</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Mencetak generasi unggul siap kerja di bidang Farmasi dan Teknologi Komputer Jaringan.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm">Navigasi</p>
          <div className="flex flex-col gap-2 text-sm">
            {['Profil', 'Jurusan', 'PPDB', 'Berita', 'Galeri', 'Kontak'].map(m => (
              <Link
                key={m}
                href={`/${m.toLowerCase()}`}
                className="hover:text-green-400 transition-colors"
              >
                {m}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm">Kontak</p>
          <div className="text-sm space-y-2">
            <p>📍 Jl. Pendidikan No. 1, Tegal, Jawa Tengah</p>
            <p>📞 (0283) 123456</p>
            <p>✉️ info@smknusantategal.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/30">
        © {new Date().getFullYear()} SMK Nusantara Tegal. All rights reserved.
      </div>
    </footer>
  );
}