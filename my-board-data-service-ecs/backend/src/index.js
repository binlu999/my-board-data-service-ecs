const express = require('express');

const http = require('http');
const cors = require('cors');

const config = require('./config');
const {https:{ key, cert}, port, isHttps, serviceName} = config;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const routes = require('./routes/index.route');
app.use(routes);

//start http server
const httpServer = http.createServer(app);

httpServer.listen(port);
console.log(`[${serviceName}] http server listening at port ${port}`);

module.exports = { app };