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

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM galeri ORDER BY created_at DESC');
  res.json(rows);
});

router.post('/', protect, upload.single('gambar'), async (req, res) => {
  const { judul } = req.body;
  const gambar = req.file?.filename || null;
  await db.query('INSERT INTO galeri (judul, gambar) VALUES (?, ?)', [judul, gambar]);
  res.json({ msg: 'Foto ditambahkan' });
});

router.delete('/:id', protect, async (req, res) => {
  await db.query('DELETE FROM galeri WHERE id = ?', [req.params.id]);
  res.json({ msg: 'Foto dihapus' });
});

module.exports = router;