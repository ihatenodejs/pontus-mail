const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 1800 });

require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//async function fetchDomainData() {
//  const cachedData = cache.get('domainData');
//  if (cachedData) {
//    return cachedData;
//  }
//
//  try {
//    const response = await axios.get('https://user.p0ntus.com/api/v1/get/domain/all', {
//      headers: {
//        'accept': 'application/json',
//        'X-API-Key': process.env.MC_API_KEY
//      }
//    });
//    const domainData = response.data;
//    cache.set('domainData', domainData);
//    return domainData;
//  } catch (error) {
//    console.error('Error fetching domain data:', error);
//    return [];
//  }
//}

//function getDomains() {
//  const domainsPath = path.join(__dirname, 'domains.txt');
//  try {
//    const domains = fs.readFileSync(domainsPath, 'utf-8').split('\n').filter(Boolean);
//    return domains;
//  } catch (error) {
//    console.error('Error reading domains.txt:', error);
//    return [];
//  }
//}

app.get('/', async (req, res) => {
  //const domainData = await fetchDomainData();
  //const domainCount = Array.isArray(domainData) ? domainData.length : 0;
  //const accountCount = Array.isArray(domainData) ? domainData.reduce((acc, domain) => acc + domain.mboxes_in_domain, 0) : 0;
  //const totalData = Array.isArray(domainData) ? domainData.reduce((acc, domain) => acc + parseInt(domain.bytes_total), 0) / (1024 * 1024) : 0;

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

// Start server on internal port defined in .env
app.listen(process.env.INTERNAL_PORT, () => {
  console.log(`Server started on port ${process.env.INTERNAL_PORT}`);
});