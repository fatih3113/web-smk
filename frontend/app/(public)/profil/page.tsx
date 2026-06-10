import Link from 'next/link';

export default function ProfilPage() {
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
        <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">Tentang Kami</p>
        <h1 className="text-4xl font-extrabold mb-6">Profil Sekolah</h1>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Sejarah Singkat</h2>
          <p className="text-white/60 leading-relaxed">
            SMK Farmasi Al Amin Dukuhturi adalah sekolah kejuruan berbasis pesantren yang berlokasi di
            Jl. Pesantren No. 8 Bandasari, Dukuhturi. Sekolah ini hadir untuk mencetak generasi muda
            yang kompeten di bidang Farmasi dan Teknologi Komputer Jaringan, sekaligus berakhlak mulia
            melalui program Sekolah Sambil Mondok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">🎯 Visi</h2>
            <p className="text-white/60 leading-relaxed">
              Menjadi SMK unggulan yang menghasilkan lulusan berkarakter islami, kompeten di bidang
              farmasi dan teknologi, serta berdaya saing di tingkat nasional.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">🚀 Misi</h2>
            <ul className="text-white/60 space-y-2 text-sm leading-relaxed">
              <li>• Menyelenggarakan pendidikan kejuruan berstandar industri</li>
              <li>• Membangun karakter siswa yang berintegritas dan islami</li>
              <li>• Menjalin kemitraan dengan dunia usaha dan industri</li>
              <li>• Menyediakan program beasiswa bagi siswa berprestasi</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">📋 Identitas Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Nama Sekolah',    val: 'SMK Farmasi Al Amin Dukuhturi' },
              { label: 'Status',          val: 'Swasta' },
              { label: 'Program',         val: 'Sekolah Sambil Mondok' },
              { label: 'Alamat',          val: 'Jl. Pesantren No. 8 Bandasari RT 06/01' },
              { label: 'Kota',            val: 'Dukuhturi, Tegal' },
              { label: 'Instagram',       val: '@smkfarmindukuhturi' },
            ].map(item => (
              <div key={item.label} className="flex gap-3">
                <span className="text-white/40 w-36 flex-shrink-0">{item.label}</span>
                <span className="text-white/80">: {item.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">📞 Kontak SPMB</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { nama: 'Bu Rahma', no: '0895-3578-24656' },
              { nama: 'Bu Anis',  no: '0821-3792-9140'  },
              { nama: 'Bu Salma', no: '0856-4042-6203'  },
            ].map(k => (
              <div key={k.nama} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="font-bold text-white/90 mb-1">{k.nama}</p>
                <p className="text-green-400 text-sm">{k.no}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}