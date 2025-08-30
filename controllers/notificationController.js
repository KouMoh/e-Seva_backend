const Notification = require('../models/notificationModel');

const getNotifications = async (req, res) => {
  try {
    const recipient = req.query.recipient;
    if (!recipient) return res.status(400).json({ message: 'recipient query param required' });
    const notes = await Notification.find({ recipient }).sort({ createdAt: -1 }).lean();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const markRead = async (req, res) => {
  try {
    const note = await Notification.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Notification not found' });
    note.read = true;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getNotifications, markRead };
