const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || '127.0.0.1', // pulls from .env or defaults to localhost
  port: process.env.DB_PORT || 3306, // pulls from .env or defaults to 3306
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const Request = sequelize.define('Request', {
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  reason: DataTypes.TEXT,
  telegram: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  }
});

// Sync DB models
sequelize.sync();

app.get('/', (req, res) => {
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

app.get('/register', (req, res) => {
  res.render('register', { currentPage: 'register' });
});

app.post('/register', async (req, res) => {
  const { fullName, email, reason, telegram } = req.body;
  const crit = /^[a-zA-Z0-9.-]+$/; // regex (see also: public/js/register.js)
  if (!crit.test(email) || /\s/.test(email) || email !== email.toLowerCase()) {
    return res.render('error/500');
  }
  await Request.create({ fullName, email, reason, telegram });
  res.render('reg-success', { currentPage: 'register' });
});

app.get('/request', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).render('error/email');
  }

  try {
    const request = await Request.findOne({ where: { email } });
    if (!request) {
      return res.status(404).render('error/404');
    }
    res.render('request', { request });
  } catch (error) {
    console.error(error);
    res.status(500).render('error/500');
  }
});

function checkAdminAuth(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin');
  }
}

// Admin routes

app.get('/admin', (req, res) => {
  if (req.session.admin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { currentPage: 'admin', error: null });
});

app.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'An error occurred.' });
  }
});

app.get('/admin/dashboard', checkAdminAuth, async (req, res) => {
  const requests = await Request.findAll();
  res.render('admin/dash', { requests, currentPage: 'admin' });
});

app.post('/admin/update-status', checkAdminAuth, async (req, res) => {
  const { id, status } = req.body;
  await Request.update({ status }, { where: { id } });
  res.redirect('/admin/dashboard');
});

app.post('/admin/delete-request', checkAdminAuth, async (req, res) => {
  const { id } = req.body;
  await Request.destroy({ where: { id } });
  res.redirect('/admin/dashboard');
});

// Start server on internal port defined in .env
app.listen(process.env.INTERNAL_PORT, () => {
  console.log(`Server started on port ${process.env.INTERNAL_PORT}`);
});