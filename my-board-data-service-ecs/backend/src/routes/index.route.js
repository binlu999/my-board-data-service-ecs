const express = require('express');

const docc = require('./docc.route');
const swagger = require('./swagger.route');

const router = express.Router();

router.use('/docc', docc);
router.use('/', swagger);

router.get('/', (req, res) => res.send('My Board Data Service API'));

router.get('/health', (req, res) => {
    const healthcheck = {
          uptime: process.uptime(),
          message: 'OK',
          timestamp: Date.now()
    };
    res.send(JSON.stringify(healthcheck));
  });
  
module.exports = router;