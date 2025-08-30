const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tender = require('../models/tenderModel');

dotenv.config();

const tenders = [
  {
    title: 'Supply of Office Stationery',
    tenderId: 'TND-001',
    description: 'Supply and delivery of office stationery items to various departments.',
    category: 'Supply',
    value: 50000,
    location: 'Delhi',
    publishDate: new Date('2025-08-01'),
    submissionDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'IT Infrastructure Maintenance',
    tenderId: 'TND-002',
    description: 'Annual maintenance contract for IT infrastructure.',
    category: 'Services',
    value: 250000,
    location: 'Mumbai',
    publishDate: new Date('2025-07-15'),
    submissionDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Construction of Community Hall',
    tenderId: 'TND-003',
    description: 'Construction work for a community hall at block A.',
    category: 'Construction',
    value: 1500000,
    location: 'Lucknow',
    publishDate: new Date('2025-08-10'),
    submissionDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }
];

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/e-suvidha';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
  console.log('Connected to DB, seeding...');
  await Tender.deleteMany({});
  await Tender.insertMany(tenders);
  console.log('Seeding complete');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
