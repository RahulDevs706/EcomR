const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controller/paymentController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/payment/process').post(isAuthenticated, processPayment);
router.route('/getStripeApi').get(isAuthenticated, sendStripeApiKey);

module.exports = router;

