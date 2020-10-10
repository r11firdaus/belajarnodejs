const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

// medaftarkan menu registrasi
router.post('/api/register', auth.registrasi);
router.post('/api/login', auth.login);

// membutuhkan verifikasi
router.get('/api/rahasia', verifikasi(), auth.halamanRahasia)

module.exports = router;