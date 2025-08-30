const express = require('express');
const router = express.Router();
const { getNotifications, markRead } = require('../controllers/notificationController');

// GET /api/notifications?recipient=Name
router.get('/', getNotifications);

// PUT /api/notifications/:id/read
router.put('/:id/read', markRead);

module.exports = router;
