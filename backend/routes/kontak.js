const router = require('express').Router();
const db     = require('../config/db');
const protect = require('../middleware/auth');

// Publik: kirim pesan
router.post('/', async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;
    if (!nama || !email || !pesan) {
      return res.status(400).json({ msg: 'Semua kolom wajib diisi' });
    }
    await db.query(
      'INSERT INTO kontak (nama, email, pesan) VALUES (?, ?, ?)',
      [nama, email, pesan]
    );
    res.json({ msg: 'Pesan berhasil dikirim!' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err: err.message });
  }
});

// Admin: lihat semua pesan
router.get('/', protect, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM kontak ORDER BY created_at DESC');
  res.json(rows);
});

// Admin: hapus pesan
router.delete('/:id', protect, async (req, res) => {
  await db.query('DELETE FROM kontak WHERE id = ?', [req.params.id]);
  res.json({ msg: 'Pesan dihapus' });
});

module.exports = router;