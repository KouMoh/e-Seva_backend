const express = require('express');
const router = express.Router();
const { getTenders, getTenderById, createTender, updateTender, deleteTender } = require('../controllers/tenderController');

router.get('/', getTenders);
router.get('/:id', getTenderById);

// Admin actions (no auth yet)
router.post('/', createTender);
router.put('/:id', updateTender);
router.delete('/:id', deleteTender);

module.exports = router;
