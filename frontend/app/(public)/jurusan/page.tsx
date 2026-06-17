import Link from 'next/link';

export default function JurusanPage() {
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
        <Link href="/" className="text-white/60 hover:text-white text-sm">← Beranda</Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">Program Keahlian</p>
        <h1 className="text-4xl font-extrabold mb-4">Jurusan Kami</h1>
        <p className="text-white/50 mb-12 max-w-2xl">Dua program keahlian unggulan yang dirancang sesuai kebutuhan industri dan membuka peluang karir yang luas.</p>

        <div id="farmasi" className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-purple-900/50 flex items-center justify-center text-3xl flex-shrink-0">💊</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-extrabold">Farmasi</h2>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">Akreditasi BAIK
                </span>
              </div>
              <p className="text-white/60 leading-relaxed mb-6">
                Program keahlian Farmasi membekali siswa dengan pengetahuan dan keterampilan di bidang kefarmasian,
                mulai dari identifikasi obat, peracikan, hingga pelayanan kefarmasian sesuai standar BPOM dan Kemenkes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-sm text-white/80 mb-3">Mata Pelajaran Kejuruan</h3>
                  <ul className="text-white/50 text-sm space-y-1.5">
                    {['Dasar Kefarmasian', 'Farmakologi', 'Kimia Farmasi', 'Pelayanan Farmasi', 'Teknologi Sediaan Farmasi'].map(m => (
                      <li key={m} className="flex items-center gap-2"><span className="text-green-400">✓</span>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white/80 mb-3">Prospek Karir</h3>
                  <ul className="text-white/50 text-sm space-y-1.5">
                    {['Asisten Apoteker', 'Staf Apotek/Rumah Sakit', 'Industri Farmasi', 'Distributor Obat', 'Wirausaha Apotek'].map(m => (
                      <li key={m} className="flex items-center gap-2"><span className="text-purple-400">→</span>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="tkj" className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-blue-900/50 flex items-center justify-center text-3xl flex-shrink-0">🌐</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-extrabold">Teknik Komputer & Jaringan</h2>
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">Akreditasi BAIK</span>
              </div>
              <p className="text-white/60 leading-relaxed mb-6">
                Program keahlian TKJ membekali siswa dengan kemampuan instalasi, konfigurasi, dan pemeliharaan
                jaringan komputer, sistem operasi, serta keamanan jaringan sesuai standar industri IT terkini.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-sm text-white/80 mb-3">Mata Pelajaran Kejuruan</h3>
                  <ul className="text-white/50 text-sm space-y-1.5">
                    {['Jaringan Komputer', 'Sistem Operasi', 'Administrasi Server', 'Keamanan Jaringan', 'Pemrograman Dasar'].map(m => (
                      <li key={m} className="flex items-center gap-2"><span className="text-green-400">✓</span>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white/80 mb-3">Prospek Karir</h3>
                  <ul className="text-white/50 text-sm space-y-1.5">
                    {['Network Engineer', 'IT Support', 'System Administrator', 'Web Developer', 'Teknisi Komputer'].map(m => (
                      <li key={m} className="flex items-center gap-2"><span className="text-blue-400">→</span>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}