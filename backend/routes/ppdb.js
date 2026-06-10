const ExcelJS = require('exceljs');
const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const db      = require('../config/db');
const protect = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/ppdb/'),
  filename:    (req, file, cb) => cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf|doc|docx/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) return cb(null, true);
    cb(new Error('Format file tidak didukung'));
  }
});

const uploadFields = upload.fields([
  { name: 'file_ijazah', maxCount: 1 },
  { name: 'file_skhun',  maxCount: 1 },
  { name: 'file_akta',   maxCount: 1 },
  { name: 'file_kk',     maxCount: 1 },
  { name: 'file_foto',   maxCount: 1 },
]);

// Publik: daftar SPMB
router.post('/', uploadFields, async (req, res) => {
  try {
    const {
      nama_lengkap, tempat_lahir, tanggal_lahir,
      alamat, nisn, no_hp, jurusan, asal_sekolah
    } = req.body;

    const file_ijazah = req.files['file_ijazah']?.[0]?.filename || null;
    const file_skhun  = req.files['file_skhun']?.[0]?.filename  || null;
    const file_akta   = req.files['file_akta']?.[0]?.filename   || null;
    const file_kk     = req.files['file_kk']?.[0]?.filename     || null;
    const file_foto   = req.files['file_foto']?.[0]?.filename   || null;

    await db.query(
      `INSERT INTO ppdb
       (nama_lengkap, tempat_lahir, tanggal_lahir, alamat, nisn, no_hp,
        jurusan, asal_sekolah, file_ijazah, file_skhun, file_akta, file_kk, file_foto)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nama_lengkap, tempat_lahir, tanggal_lahir, alamat, nisn, no_hp,
       jurusan, asal_sekolah, file_ijazah, file_skhun, file_akta, file_kk, file_foto]
    );

    res.json({ msg: 'Pendaftaran berhasil dikirim! Pantau status secara berkala.' });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mendaftar', err: err.message });
  }
});

// Publik: cek status
router.get('/status/:nama', async (req, res) => {
  const [rows] = await db.query(
    'SELECT nama_lengkap, nisn, jurusan, status, created_at FROM ppdb WHERE nama_lengkap LIKE ? OR nisn = ?',
    [`%${req.params.nama}%`, req.params.nama]
  );
  res.json(rows);
});

// ⚠️ PENTING: /export harus di atas /:id
// Admin: export Excel
router.get('/export', protect, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ppdb ORDER BY created_at DESC');

    const workbook  = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data SPMB');

    worksheet.columns = [
      { header: 'No',             key: 'no',           width: 5  },
      { header: 'Nama Lengkap',   key: 'nama_lengkap', width: 28 },
      { header: 'NISN',           key: 'nisn',         width: 18 },
      { header: 'Tempat Lahir',   key: 'tempat_lahir', width: 18 },
      { header: 'Tanggal Lahir',  key: 'tanggal_lahir',width: 18 },
      { header: 'Alamat',         key: 'alamat',       width: 35 },
      { header: 'No HP',          key: 'no_hp',        width: 18 },
      { header: 'Jurusan',        key: 'jurusan',      width: 25 },
      { header: 'Asal Sekolah',   key: 'asal_sekolah', width: 28 },
      { header: 'Status',         key: 'status',       width: 12 },
      { header: 'Tanggal Daftar', key: 'created_at',   width: 22 },
    ];

    // Style header
    worksheet.getRow(1).eachCell(cell => {
      cell.font      = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF166534' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    worksheet.getRow(1).height = 20;

    // Isi data
    rows.forEach((row, i) => {
      const newRow = worksheet.addRow({
        no:           i + 1,
        nama_lengkap: row.nama_lengkap,
        nisn:         row.nisn,
        tempat_lahir: row.tempat_lahir,
        tanggal_lahir: row.tanggal_lahir
          ? new Date(row.tanggal_lahir).toLocaleDateString('id-ID')
          : '-',
        alamat:       row.alamat,
        no_hp:        row.no_hp,
        jurusan:      row.jurusan,
        asal_sekolah: row.asal_sekolah,
        status:       row.status,
        created_at:   new Date(row.created_at).toLocaleDateString('id-ID'),
      });

      // Warna baris selang-seling
      if (i % 2 === 1) {
        newRow.eachCell(cell => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } };
        });
      }

      // Warna kolom status
      const statusCell = newRow.getCell('status');
      if (row.status === 'diterima') {
        statusCell.font = { bold: true, color: { argb: 'FF166534' } };
      } else if (row.status === 'ditolak') {
        statusCell.font = { bold: true, color: { argb: 'FF991B1B' } };
      } else {
        statusCell.font = { bold: true, color: { argb: 'FF92400E' } };
      }
    });

    // Auto border semua sel
    worksheet.eachRow(row => {
      row.eachCell(cell => {
        cell.border = {
          top:    { style: 'thin' },
          left:   { style: 'thin' },
          bottom: { style: 'thin' },
          right:  { style: 'thin' },
        };
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data-spmb.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).json({ msg: 'Gagal export Excel', error: err.message });
  }
});

// Admin: list semua
router.get('/', protect, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM ppdb ORDER BY created_at DESC');
  res.json(rows);
});

// Admin: update status
router.patch('/:id/status', protect, async (req, res) => {
  await db.query('UPDATE ppdb SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
  res.json({ msg: 'Status diperbarui' });
});

// Admin: hapus
router.delete('/:id', protect, async (req, res) => {
  await db.query('DELETE FROM ppdb WHERE id = ?', [req.params.id]);
  res.json({ msg: 'Data dihapus' });
});

module.exports = router;