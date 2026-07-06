const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  marketName: { type: String, required: true },
  gameType: { type: String, required: true },
  number: { type: String, required: true },
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  result: { type: String, enum: ['pending', 'win', 'loss'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
