const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  tender: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
  bidderName: { type: String },
  bidAmount: { type: Number, required: true },
  documents: [{ filename: String, url: String }],
  status: { type: String, default: 'submitted' },
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);
