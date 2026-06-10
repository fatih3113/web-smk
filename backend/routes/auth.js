const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const db      = require('../config/db');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ msg: 'Email tidak ditemukan' });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ msg: 'Password salah' });

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, admin: { id: rows[0].id, name: rows[0].name } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err: err.message });
    
  }
});

module.exports = router;