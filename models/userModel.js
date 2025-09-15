const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String },
  role: { type: String, enum: ['user','admin','company'], default: 'company' },
  location: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);


