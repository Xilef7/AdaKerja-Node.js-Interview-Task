const express = require('express');
const router = express.Router();

const webhookController = require('../controllers/webhookController');

router.get('/', webhookController.handleVerification);
router.post('/', webhookController.handleEvent);

module.exports = router;
