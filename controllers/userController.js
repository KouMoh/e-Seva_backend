const User = require('../models/userModel');

// GET /api/users/test-company -> get or create the test IT company user
const getOrCreateTestCompanyUser = async (req, res) => {
  try {
    const query = { email: 'test.it.company@example.com' };
    let userDoc = await User.findOne(query);
    if (!userDoc) {
      const toCreate = new User({
        name: 'Test IT User',
        company: 'TechNova IT Pvt. Ltd.',
        email: 'test.it.company@example.com',
        role: 'company',
        location: 'Bengaluru',
        description: 'We specialize in IT infrastructure, cloud services, web development, and software maintenance for enterprise clients across fintech, e-commerce, and public sector.',
      });
      userDoc = await toCreate.save();
      console.log(`Seeded test company user ${userDoc._id}`);
    } else if (!userDoc.description) {
      userDoc.description = 'We specialize in IT infrastructure, cloud services, web development, and software maintenance for enterprise clients across fintech, e-commerce, and public sector.';
      await userDoc.save();
      console.log(`Updated test company user ${userDoc._id} with description`);
    }
    res.json(userDoc.toObject());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getOrCreateTestCompanyUser };


