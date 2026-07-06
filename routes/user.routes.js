const express = require('express');
const router = express.Router();
const { getProfile, getWallet, deposit } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/profile', protect, getProfile);
router.get('/wallet', protect, getWallet);
router.post('/wallet/deposit', protect, deposit);

module.exports = router;
