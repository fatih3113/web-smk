const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve folder uploads sebagai file statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/ppdb',   require('./routes/ppdb'));
app.use('/api/berita', require('./routes/berita'));
app.use('/api/galeri', require('./routes/galeri'));
app.use('/api/kontak', require('./routes/kontak'));


// Health check
app.get('/', (req, res) => res.json({ msg: 'Backend SMK Tegal berjalan ✓' }));

app.listen(process.env.PORT, () => {
  console.log(`✓ Server jalan di http://localhost:${process.env.PORT}`);
});