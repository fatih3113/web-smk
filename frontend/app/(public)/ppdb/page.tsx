'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Link from 'next/link';
import api from '@/lib/api';

export default function PPDBPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [cekNama, setCekNama] = useState('');
  const [statusData, setStatusData] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [sukses, setSukses] = useState(false);
  const [namaPendaftar, setNamaPendaftar] = useState('');

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const form = new FormData();
      const fileFields = ['file_ijazah', 'file_skhun', 'file_akta', 'file_kk', 'file_foto'];
      Object.keys(data).forEach(k => {
        if (fileFields.includes(k)) {
          if (data[k][0]) form.append(k, data[k][0]);
        } else {
          form.append(k, data[k]);
        }
      });
      await api.post('/ppdb', form);
      setNamaPendaftar(data.nama_lengkap);
      setSukses(true);
      reset();
      setStep(1);
      toast.success('Pendaftaran berhasil dikirim!');
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Gagal mengirim pendaftaran');
    }
    setLoading(false);
  };

  const cekStatus = async () => {
    if (!cekNama.trim()) return toast.error('Masukkan nama atau NISN');
    try {
      const res = await api.get(`/ppdb/status/${cekNama}`);
      setStatusData(res.data);
      if (!res.data.length) toast.error('Data tidak ditemukan');
    } catch {
      toast.error('Gagal cek status');
    }
  };

  const inputClass = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500";
  const labelClass = "block text-sm text-white/70 mb-1";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">

      {/* NAVBAR */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0a0f1e]/95 backdrop-blur z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-bold text-xs ring-2 ring-green-500/30">
            SMK
          </div>
          <div>
            <p className="font-bold text-sm">SMK FARMASI AL AMIN DUKUHTURI</p>
            <p className="text-green-400 text-xs">Farmasi & TKJ</p>
          </div>
        </Link>
        <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
          ← Beranda
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* HEADER */}
        <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">
          Penerimaan Murid Baru
        </p>
        <h1 className="text-3xl font-extrabold mb-2">SPMB Online 2025/2026</h1>
        <p className="text-white/50 mb-6">
          Isi formulir berikut dengan data yang benar dan lengkap.
        </p>

        {/* BANNER LINK EKSTERNAL */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              🔗
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-blue-300 mb-1">
                Bisa Juga Daftar Lewat Link Ini!
              </p>
              <p className="text-white/50 text-sm mb-3">
                Selain mengisi formulir di bawah, kamu juga bisa mendaftar melalui link pendaftaran resmi kami:
              </p>
              <a
                href="https://tinyurl.com/SPMBSMKFarmasiAlAmin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105 break-all"
              >
                🌐 tinyurl.com/SPMBSMKFarmasiAlAmin
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500/20 flex flex-wrap gap-3 text-xs text-white/40">
            <span>✅ Link resmi SMK Farmasi Al Amin</span>
            <span>·</span>
            <span>✅ Aman & terpercaya</span>
            <span>·</span>
            <span>✅ Gratis uang pendaftaran</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10"></div>
          <p className="text-white/30 text-sm font-medium whitespace-nowrap">
            atau isi formulir di bawah
          </p>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* NOTIF SUKSES */}
        {sukses && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
              ✅
            </div>
            <h2 className="text-xl font-extrabold text-green-400 mb-2">
              Pendaftaran Berhasil Dikirim!
            </h2>
            <p className="text-white/70 mb-1">
              Terima kasih,{' '}
              <span className="text-white font-semibold">{namaPendaftar}</span>!
            </p>
            <p className="text-white/50 text-sm mb-6">
              Data pendaftaran kamu telah kami terima. Pantau status penerimaan
              melalui fitur{' '}
              <span className="text-green-400">Cek Status</span> di bawah ini.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/60 text-left space-y-2 mb-6">
              <p>📋 Pendaftaran kamu sedang dalam proses review</p>
              <p>
                📞 Jika ada pertanyaan hubungi:{' '}
                <span className="text-green-400">0895-3578-24656</span> (Bu Rahma)
              </p>
              <p>⏳ Hasil seleksi akan diumumkan melalui website ini</p>
            </div>
            <button
              onClick={() => setSukses(false)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Daftar Lagi
            </button>
          </div>
        )}

        {/* FORM */}
        {!sukses && (
          <>
            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-8">
              {[
                { n: 1, label: 'Data Diri' },
                { n: 2, label: 'Upload Berkas' },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= s.n
                      ? 'bg-green-600 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <span className={`text-sm font-medium ${
                    step >= s.n ? 'text-white' : 'text-white/40'
                  }`}>
                    {s.label}
                  </span>
                  {i < 1 && (
                    <div className={`w-16 h-0.5 mx-1 transition-colors ${
                      step > s.n ? 'bg-green-600' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">

                {/* STEP 1 — DATA DIRI */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <h2 className="font-bold text-lg">Data Diri Calon Siswa</h2>
                    </div>

                    <div>
                      <label className={labelClass}>Nama Lengkap *</label>
                      <input
                        {...register('nama_lengkap', { required: 'Wajib diisi' })}
                        className={inputClass}
                        placeholder="Nama sesuai ijazah"
                      />
                      {errors.nama_lengkap && (
                        <p className={errorClass}>{errors.nama_lengkap.message as string}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Tempat Lahir *</label>
                        <input
                          {...register('tempat_lahir', { required: 'Wajib diisi' })}
                          className={inputClass}
                          placeholder="Contoh: Tegal"
                        />
                        {errors.tempat_lahir && (
                          <p className={errorClass}>{errors.tempat_lahir.message as string}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Tanggal Lahir *</label>
                        <input
                          type="date"
                          {...register('tanggal_lahir', { required: 'Wajib diisi' })}
                          className={inputClass}
                          style={{ colorScheme: 'dark' }}
                        />
                        {errors.tanggal_lahir && (
                          <p className={errorClass}>{errors.tanggal_lahir.message as string}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Alamat Lengkap *</label>
                      <textarea
                        {...register('alamat', { required: 'Wajib diisi' })}
                        rows={3}
                        className={inputClass}
                        placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota"
                      />
                      {errors.alamat && (
                        <p className={errorClass}>{errors.alamat.message as string}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>NISN *</label>
                        <input
                          {...register('nisn', {
                            required: 'Wajib diisi',
                            minLength: { value: 10, message: 'NISN minimal 10 digit' },
                          })}
                          className={inputClass}
                          placeholder="Nomor Induk Siswa Nasional"
                          maxLength={10}
                        />
                        {errors.nisn && (
                          <p className={errorClass}>{errors.nisn.message as string}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>Nomor yang Bisa Dihubungi *</label>
                        <input
                          {...register('no_hp', { required: 'Wajib diisi' })}
                          className={inputClass}
                          placeholder="08xxxxxxxxxx"
                        />
                        {errors.no_hp && (
                          <p className={errorClass}>{errors.no_hp.message as string}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Pilihan Jurusan *</label>
                      <select
                        {...register('jurusan', { required: 'Wajib dipilih' })}
                        className="w-full border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none"
                        style={{ background: '#0d1628', colorScheme: 'dark' }}
                      >
                        <option value="" style={{ background: '#0d1628', color: '#6b7280' }}>
                          -- Pilih Jurusan --
                        </option>
                        <option value="Farmasi" style={{ background: '#0d1628', color: 'white' }}>
                          💊 Farmasi
                        </option>
                        <option value="Teknik Komputer Jaringan" style={{ background: '#0d1628', color: 'white' }}>
                          🌐 Teknik Komputer Jaringan
                        </option>
                      </select>
                      {errors.jurusan && (
                        <p className={errorClass}>{errors.jurusan.message as string}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Asal Sekolah *</label>
                      <input
                        {...register('asal_sekolah', { required: 'Wajib diisi' })}
                        className={inputClass}
                        placeholder="Nama SMP/MTs/Sederajat"
                      />
                      {errors.asal_sekolah && (
                        <p className={errorClass}>{errors.asal_sekolah.message as string}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2"
                    >
                      Lanjut ke Upload Berkas
                      <span>→</span>
                    </button>
                  </div>
                )}

                {/* STEP 2 — UPLOAD BERKAS */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <h2 className="font-bold text-lg">Upload Berkas Persyaratan</h2>
                    </div>

                    {[
                      {
                        name: 'file_ijazah',
                        label: 'Scan Ijazah / SKL SMP-MTs Sederajat *',
                        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
                        maxSize: '1 MB',
                        maxBytes: 1,
                        icon: '📜',
                      },
                      {
                        name: 'file_skhun',
                        label: 'Scan SKHUN SMP-MTs Sederajat *',
                        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
                        maxSize: '10 MB',
                        maxBytes: 10,
                        icon: '📄',
                      },
                      {
                        name: 'file_akta',
                        label: 'Scan Akta Kelahiran *',
                        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
                        maxSize: '1 MB',
                        maxBytes: 1,
                        icon: '📋',
                      },
                      {
                        name: 'file_kk',
                        label: 'Scan Kartu Keluarga *',
                        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
                        maxSize: '1 MB',
                        maxBytes: 1,
                        icon: '🏠',
                      },
                      {
                        name: 'file_foto',
                        label: 'Pas Foto Terbaru *',
                        accept: '.jpg,.jpeg,.png',
                        maxSize: '1 MB',
                        maxBytes: 1,
                        icon: '🤳',
                        fotoOnly: true,
                      },
                    ].map(f => (
                      <div
                        key={f.name}
                        className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl mt-0.5">{f.icon}</span>
                          <div className="flex-1 min-w-0">
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              {f.label}
                            </label>
                            <p className="text-xs text-white/30 mb-3">
                              Format:{' '}
                              {f.fotoOnly ? 'JPG, JPEG, PNG' : 'PDF, DOC, JPG, PNG'}{' '}
                              · Maks {f.maxSize}
                            </p>
                            <input
                              type="file"
                              accept={f.accept}
                              {...register(f.name as any, {
                                required: 'File wajib diupload',
                                validate: (files: FileList) => {
                                  if (!files[0]) return 'File wajib diupload';
                                  if (files[0].size > f.maxBytes * 1024 * 1024)
                                    return `Ukuran file melebihi ${f.maxSize}`;
                                  return true;
                                },
                              })}
                              className="w-full text-sm text-white/60 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:text-xs file:font-semibold hover:file:bg-green-700 transition-colors cursor-pointer"
                            />
                            {errors[f.name] && (
                              <p className={errorClass}>
                                {(errors[f.name] as any)?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        ← Kembali
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Mengirim...
                          </span>
                        ) : (
                          '✓ Kirim Pendaftaran'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </>
        )}

        {/* CEK STATUS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🔍</span>
            <h2 className="font-bold text-lg">Cek Status Pendaftaran</h2>
          </div>
          <p className="text-white/40 text-sm mb-5">
            Masukkan nama lengkap atau NISN untuk cek status pendaftaran kamu
          </p>
          <div className="flex gap-3 mb-4">
            <input
              value={cekNama}
              onChange={e => setCekNama(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && cekStatus()}
              className={inputClass + ' flex-1'}
              placeholder="Nama lengkap atau NISN"
            />
            <button
              onClick={cekStatus}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              Cek Status
            </button>
          </div>

          {statusData.length > 0 && (
            <div className="space-y-3">
              {statusData.map((d, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{d.nama_lengkap}</p>
                    <p className="text-sm text-white/50 mt-0.5">
                      NISN: {d.nisn}
                    </p>
                    <p className="text-sm text-white/50">
                      Jurusan: {d.jurusan}
                    </p>
                    <p className="text-xs text-white/30 mt-1">
                      Daftar:{' '}
                      {new Date(d.created_at).toLocaleDateString('id-ID', {
                        dateStyle: 'long',
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold flex-shrink-0 ${
                      d.status === 'diterima'
                        ? 'bg-green-500/20 text-green-400'
                        : d.status === 'ditolak'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {d.status === 'diterima'
                      ? '✅ Diterima'
                      : d.status === 'ditolak'
                      ? '❌ Ditolak'
                      : '⏳ Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}