const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('walletBalance');
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, walletBalance: user.walletBalance, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    user.walletBalance += Number(amount);
    await user.save();
    await Transaction.create({ user: req.user.id, type: 'deposit', amount: Number(amount), status: 'completed' });
    res.json({ success: true, message: 'Deposit successful', walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
