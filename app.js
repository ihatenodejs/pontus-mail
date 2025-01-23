const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 1800 });

function checkSetup() {
  if (!fs.existsSync(path.join(__dirname, '.env'))) {
    console.error("Couldn't find .env file, please create one using the provided .env.example file.");
    process.exit(1);
  }

  const reqVar = ['INTERNAL_PORT'];
  const missingVar = reqVar.filter(envVar => !process.env[envVar]);

  if (missingVar.length > 0) {
    console.error(`Oops, you're missing these required variables in your .env file: ${missingVar.join(', ')}`);
    process.exit(1);
  }
}

require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// TODO: Reintegrate backend logic for counters on home page
app.get('/', async (req, res) => {
  res.render('index', { currentPage: 'home' });
});

app.get('/services', (req, res) => {
  res.render('services', { currentPage: 'services' });
});

app.get('/donate', (req, res) => {
  const donations = JSON.parse(fs.readFileSync('donations.json', 'utf8'));
  res.render('donate', {
    currentPage: 'donate',
    bitcoin: donations.bitcoin,
    litecoin: donations.litecoin,
    ethereum: donations.ethereum,
    monero: donations.monero,
    solana: donations.solana,
    current: donations.current,
    goal: donations.goal
  });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { currentPage: 'privacy' });
});

// Guide routes
// TODO: Improve how guides are routed to be simpler

app.get('/guides', (req, res) => {
  res.render('guides', { currentPage: 'guides' });
});

app.get('/guides/user', (req, res) => {
  res.render('guides/user/index', { currentPage: 'guides' });
});

app.get('/guides/user/password-change', (req, res) => {
  res.render('guides/user/password-change', { currentPage: 'guides' });
});

app.get('/guides/user/external-accounts', (req, res) => {
  res.render('guides/user/external-accounts', { currentPage: 'guides' });
});

app.get('/guides/user/create-account', (req, res) => {
  res.render('guides/user/create-account', { currentPage: 'guides' });
});

app.get('/guides/email', (req, res) => {
  res.render('guides/email/index', { currentPage: 'guides' });
});

app.get('/guides/email/thunderbird', (req, res) => {
  res.render('guides/email/thunderbird', { currentPage: 'guides' });
});

app.get('/guides/vaultwarden/android', (req, res) => {
  res.render('guides/vaultwarden/android', { currentPage: 'guides' });
});

app.get('/guides/vaultwarden/chrome', (req, res) => {
  res.render('guides/vaultwarden/chrome', { currentPage: 'guides' });
});

app.get('/guides/vaultwarden/firefox', (req, res) => {
  res.render('guides/vaultwarden/firefox', { currentPage: 'guides' });
});

// Verify .env and start server on internal port defined in .env
checkSetup();
app.listen(process.env.INTERNAL_PORT, () => {
  console.log(`Server started on port ${process.env.INTERNAL_PORT}`);
});