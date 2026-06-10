const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const db      = require('../config/db');
const protect = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Publik: ambil semua berita
router.get('/', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM berita WHERE published = 1 ORDER BY created_at DESC'
  );
  res.json(rows);
});

// Publik: detail berita by slug
router.get('/:slug', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM berita WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ msg: 'Berita tidak ditemukan' });
  res.json(rows[0]);
});

// Admin: tambah berita
router.post('/', protect, upload.single('gambar'), async (req, res) => {
  const { judul, isi, kategori } = req.body;
  const slug   = judul.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const gambar = req.file?.filename || null;
  await db.query(
    'INSERT INTO berita (judul, slug, isi, gambar, kategori) VALUES (?, ?, ?, ?, ?)',
    [judul, slug, isi, gambar, kategori]
  );
  res.json({ msg: 'Berita ditambahkan' });
});

// Admin: edit
router.put('/:id', protect, upload.single('gambar'), async (req, res) => {
  const { judul, isi, kategori, published } = req.body;
  const gambar = req.file?.filename || req.body.gambar_lama;
  await db.query(
    'UPDATE berita SET judul=?, isi=?, gambar=?, kategori=?, published=? WHERE id=?',
    [judul, isi, gambar, kategori, published, req.params.id]
  );
  res.json({ msg: 'Berita diperbarui' });
});

// Admin: hapus
router.delete('/:id', protect, async (req, res) => {
  await db.query('DELETE FROM berita WHERE id = ?', [req.params.id]);
  res.json({ msg: 'Berita dihapus' });
});

module.exports = router;