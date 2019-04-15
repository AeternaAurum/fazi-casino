const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const WebSocket = require('ws');
const port = 5000;

const app = express();
const router = express.Router();
const cityRoutes = require('./routes/cityRoutes')(router);
const casinoRoutes = require('./routes/casinoRoutes')(router);

mongoose.connect(config.uri, err => {
  err ? console.log('Could not connect') : console.log('You have connected');
});

// middlewares
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use('/city', cityRoutes);
app.use('/casino', casinoRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const wss = new WebSocket.Server({ port: 4200 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`received message => ${message}`);
  });
  ws.send('hello from server');
});
