const express = require('express');
const router = express.Router();

var messageController = require('../controllers/messageController');

router.get('/', messageController.getAllEvents);

router.get('/:id', messageController.getEvent);
router.delete('/:id', messageController.deleteEvent);

module.exports = router;
