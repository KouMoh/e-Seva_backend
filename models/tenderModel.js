const mongoose = require('mongoose');

const TenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tenderId: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String },
  value: { type: Number },
  location: { type: String },
  publishDate: { type: Date },
  submissionDeadline: { type: Date },
  status: { type: String, default: 'open' },
  // when a bid is granted, winnerBid stores the Bid id and winnerName stores bidder name
  winnerBid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
  winnerName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Tender', TenderSchema);
