const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
//const winston = require('winston');
//const rateLimit = require('express-rate-limit');

//const logger = winston.createLogger({
//  level: 'info',
//  format: winston.format.combine(
//    winston.format.timestamp(),
//    winston.format.printf(({ timestamp, level, message }) => {
//    return `${timestamp} [${level.toUpperCase()}] ${message}`;
//    })
//  ),
//  transports: [
//    new winston.transports.File({ filename: 'register.log' })
//  ],
//});

//const exclusions = JSON.parse(fs.readFileSync('exclusions.json', 'utf8')).excludedIPs;
//const registerLimiter = rateLimit({
//  windowMs: 24 * 60 * 60 * 1000,
//  max: 1,
//  message: 'You have already submitted a registration today. Please try again tomorrow.',
//  standardHeaders: true,
//  legacyHeaders: false,
//  skip: (req, res) => exclusions.includes(req.ip)
//});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { currentPage: 'home' });
});

//app.post('/register', registerLimiter, (req, res) => {
//  const formData = req.body;
//  logger.info(`New registration:
//    Name: ${formData.name}
//    Email: ${formData.email}
//    Reason: ${formData.message}
//    Telegram: ${formData.telegram}`);
//  res.render('success');
//});

// Shelved for now
// Logic needs improvements

//app.get('/success', (req, res) => {
//  res.render('success');
//});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});