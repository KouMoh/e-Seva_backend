const Bid = require('../models/bidModel');
const Tender = require('../models/tenderModel');

const createBid = async (req, res) => {
  try {
    const { bidAmount, bidderName, documents } = req.body;
    const tenderId = req.params.tenderId;
    const tender = await Tender.findById(tenderId);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });

    const bid = new Bid({ tender: tender._id, bidAmount, bidderName, documents });
    await bid.save();
  console.log(`Created bid ${bid._id} for tender ${tenderId} by ${bidderName}`);
    res.status(201).json(bid);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate('tender').lean();
    res.json(bids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('tender').lean();
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.json(bid);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBidsByTender = async (req, res) => {
  try {
    const bids = await Bid.find({ tender: req.params.tenderId }).populate('tender').lean();
    res.json(bids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: update bid status (e.g., 'granted', 'rejected')
const updateBidStatus = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('tender');
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    const newStatus = req.body.status || bid.status;
    // if already decided, prevent changes
    if (["granted", "rejected"].includes(bid.status)) {
      return res.status(400).json({ message: "Bid already decided" });
    }
    bid.status = newStatus;
    await bid.save();

    // if granted, mark tender as awarded and store winner info
    if (newStatus === "granted" && bid.tender) {
      await Tender.findByIdAndUpdate(
        bid.tender._id,
        { status: "awarded", winnerBid: bid._id, winnerName: bid.bidderName }
      );
      console.log(`Tender ${bid.tender._id} marked as awarded (winner: ${bid.bidderName})`);
    }

    // create a simple notification (recipient is bidderName for now)
    const Notification = require("../models/notificationModel");
    const tenderLabel = bid.tender?.title || bid.tender?.toString();
    await Notification.create({
      recipient: bid.bidderName,
      message: `Your bid for tender "${tenderLabel}" is now ${bid.status}`,
      link: `/tenders/${bid.tender}`,
    });

    console.log(`Bid ${bid._id} status updated to ${bid.status}`);

    res.json(bid);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get bids for current user (mocked by query param ?bidder=Name)
const getMyBids = async (req, res) => {
  try {
    const bidder = req.query.bidder;
    if (!bidder) return res.status(400).json({ message: 'bidder query param required' });
    const bids = await Bid.find({ bidderName: bidder }).populate('tender').lean();
  console.log(`getMyBids for bidder=${bidder} returned ${bids.length} bids`);
    res.json(bids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBid, getBids, getBidById, getBidsByTender, updateBidStatus, getMyBids };
