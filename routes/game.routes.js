const express = require('express');
const router = express.Router();
const { placeBet, getMyGames, getMarkets } = require('../controllers/game.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/markets', getMarkets);
router.post('/bet', protect, placeBet);
router.get('/my-games', protect, getMyGames);

module.exports = router;
