const Tender = require('../models/tenderModel');

// GET /api/tenders
const getTenders = async (req, res) => {
  try {
    const tenders = await Tender.find().limit(50).lean();
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/tenders/:id
const getTenderById = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id).lean();
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTender = async (req, res) => {
  try {
    const payload = req.body;
    const tender = new Tender(payload);
    await tender.save();
  console.log(`Tender created ${tender._id} (${tender.title})`);
    res.status(201).json(tender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTender = async (req, res) => {
  try {
  const deleted = await Tender.findByIdAndDelete(req.params.id);
  console.log(`Tender deleted ${req.params.id} -> ${deleted ? 'removed' : 'not found'}`);
  res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTenders, getTenderById, createTender, updateTender, deleteTender };
