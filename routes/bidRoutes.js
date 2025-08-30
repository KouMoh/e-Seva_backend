const express = require('express');
const router = express.Router();
const { createBid, getBids, getBidById, getBidsByTender, getMyBids, updateBidStatus } = require('../controllers/bidController');

// POST /api/bids/:tenderId
router.post('/:tenderId', createBid);

// GET /api/bids/my-bids?bidder=Name
router.get('/my-bids', getMyBids);

// GET /api/bids
router.get('/', getBids);

// GET /api/bids/:id
router.get('/:id', getBidById);

// GET /api/bids/tender/:tenderId
router.get('/tender/:tenderId', getBidsByTender);

// Admin: update bid status
router.put('/:id/status', updateBidStatus);

// Ensure backend route handles /api/bids/:id/status

module.exports = router;
