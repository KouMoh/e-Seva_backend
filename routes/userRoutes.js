const express = require('express');
const router = express.Router();
const { getOrCreateTestCompanyUser } = require('../controllers/userController');

router.get('/test-company', getOrCreateTestCompanyUser);

module.exports = router;



