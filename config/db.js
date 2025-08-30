const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MONGO_URI not set; falling back to local MongoDB for development.');
    } else {
      console.error('MONGO_URI environment variable is required in production.');
      process.exit(1);
    }
  }

  const finalUri = uri || 'mongodb://localhost:27017/e-suvidha';
  try {
    await mongoose.connect(finalUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
