const express = require('express');
const router = express.Router({ mergeParams: true });

const customerOrderController = require('../controllers/customerorder.controller');

router.route('/customerorder')
    .post(customerOrderController.post);

router.route('/customerorder/:_pkey')
    .get(customerOrderController.get);

router.route('/customerorders')
    .get(customerOrderController.getAll);


module.exports = router;