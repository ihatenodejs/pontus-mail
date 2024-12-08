const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { currentPage: 'home' });
});

app.get('/services', (req, res) => {
  res.render('services', { currentPage: 'services' });
});

app.get('/register', (req, res) => {
  res.render('register', { currentPage: 'register' });
});

app.get('/donate', (req, res) => {
  const donations = JSON.parse(fs.readFileSync('donations.json', 'utf8'));
  res.render('donate', {
    currentPage: 'donate',
    bitcoin: donations.bitcoin,
    litecoin: donations.litecoin,
    ethereum: donations.ethereum,
    current: donations.current,
    goal: donations.goal
  });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { currentPage: 'privacy' });
});

app.get('/guides', (req, res) => {
  res.render('guides', { currentPage: 'guides' });
});

app.get('/guides/user', (req, res) => {
  res.render('guides/user/index', { currentPage: 'guides' });
});

app.get('/guides/webmail', (req, res) => {
  res.render('guides/webmail/index', { currentPage: 'guides' });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});