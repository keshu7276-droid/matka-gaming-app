const Game = require('../models/game.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

exports.placeBet = async (req, res) => {
  try {
    const { marketName, gameType, number, amount } = req.body;
    const user = await User.findById(req.user.id);
    if (user.walletBalance < amount) return res.status(400).json({ success: false, message: 'Insufficient balance' });
    user.walletBalance -= amount;
    await user.save();
    const game = await Game.create({ marketName, gameType, number, amount, user: req.user.id });
    await Transaction.create({ user: req.user.id, type: 'bet', amount: -amount, status: 'completed' });
    res.status(201).json({ success: true, message: 'Bet placed', game });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyGames = async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, games });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMarkets = async (req, res) => {
  try {
    const markets = [
      { name: 'Milan Day', open: '12:00 PM', close: '02:00 PM' },
      { name: 'Milan Night', open: '08:00 PM', close: '10:00 PM' },
      { name: 'Kalyan', open: '03:30 PM', close: '05:30 PM' },
      { name: 'Rajdhani Day', open: '03:00 PM', close: '05:00 PM' },
      { name: 'Rajdhani Night', open: '09:00 PM', close: '11:00 PM' },
      { name: 'Main Bazar', open: '09:30 PM', close: '12:00 AM' }
    ];
    res.json({ success: true, markets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
