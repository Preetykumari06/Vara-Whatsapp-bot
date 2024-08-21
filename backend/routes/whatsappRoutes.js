const express = require('express');
const { handleIncomingMessage, waterUsageData } = require('../controllers/whatsappController');
const whatsappRoutes = express.Router();

whatsappRoutes.post('/webhook', handleIncomingMessage);
whatsappRoutes.get('/api/data', waterUsageData);

module.exports = whatsappRoutes;
