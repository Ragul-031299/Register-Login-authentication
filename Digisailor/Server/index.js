const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const otpGenerator = require('otp-generator');
const cors = require('cors');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const jwtSecretKey = '712b196ba7b9e6eace63399cf8d399a621501ce581427d22661641426dfe2d3a';
if (!jwtSecretKey) {
  console.error('JWT_SECRET_KEY is not defined in the environment variables.');
  process.exit(1);
}

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'student',
  multipleStatements: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

const twilioAccountSid = 'AC6278c1cfb56c5d05dc773ee21db1ac87';
const twilioAuthToken = 'ae6fa02fd5f60be8ee5a752ce37b09ca';
const twilioClient = new twilio(twilioAccountSid, twilioAuthToken);
const twilioPhoneNumber = '+12178661119';

const otpData = {};

function generateNumericOtp(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

function insertUserData(user, callback) {
  const { fullName, dob, mobile, password } = user;
  const query = 'INSERT INTO users (fullName, dob, mobile, password) VALUES (?, ?, ?, ?)';

  db.query(query, [fullName, dob, mobile, password], (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      callback(err);
    } else {
      callback(null);
    }
  });
}

function handleLogin(req, res) {
  const { mobile, password } = req.body;

  // Replace this logic with actual database queries for user authentication
  db.query('SELECT * FROM users WHERE mobile = ?', [mobile], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Login failed' });
    } else if (results.length === 1) {
      // If user is found in the database, retrieve their hashed password
      const user = results[0];
      const hashedPassword = user.password;

      // Use bcrypt to compare the provided password with the hashed password
      bcrypt.compare(password, hashedPassword, (compareError, isMatch) => {
        if (compareError) {
          console.error('Error during password comparison:', compareError);
          res.status(500).json({ message: 'Login failed' });
        } else if (isMatch) {
          // Passwords match, you can generate a JWT token here
          const token = jwt.sign(
            {
              mobile: user.mobile,
              fullName: user.fullName,
              dob: user.dob,
            },
            jwtSecretKey,
            { expiresIn: '1h' }
          );
          res.json({ message: 'Login successful', token, fullName: user.fullName, dob: user.dob, mobile: user.mobile });
        } else {
          // Passwords don't match
          res.status(401).json({ message: 'Login failed' });
        }
      });
    } else {
      // User not found
      res.status(401).json({ message: 'Login failed' });
    }
  });
}


app.post('/api/auth/login', handleLogin);

app.post('/api/auth/register', (req, res) => {
  const { fullName, dob, mobile } = req.body;
  const unhashedPassword = fullName.substring(0, 3).toLowerCase() + dob.slice(0, 4);

  // Hash the unhashed password before storing it
  bcrypt.hash(unhashedPassword, 10, (bcryptErr, hashedPassword) => {
    if (bcryptErr) {
      res.status(500).json({ message: 'Registration failed. Password hashing error.' });
    } else {
      const otp = generateNumericOtp(6);
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

      twilioClient.messages
        .create({
          body: `Your OTP is: ${otp}`,
          from: twilioPhoneNumber,
          to: mobile,
        })
        .then(() => {
          const user = { fullName, dob, mobile, password: hashedPassword, otp, otpExpiry };
          otpData[mobile] = user;

          insertUserData(user, (dbErr) => {
            if (dbErr) {
              res.status(500).json({ message: 'Registration failed. Database error.' });
            } else {
              res.json({ message: 'OTP sent to your mobile number.' });
            }
          });
        })
        .catch((smsError) => {
          console.error('Error sending OTP via SMS:', smsError);
          res.status(500).json({ message: 'Failed to send OTP via SMS.' });
        });
    }
  });
});

app.post('/api/auth/verify', (req, res) => {
  const { mobile, otp } = req.body;

  if (otpData[mobile]) {
    const user = otpData[mobile];
    const { otp: storedOtp, otpExpiry } = user;
    const currentTime = new Date();

    if (otp === storedOtp && currentTime <= otpExpiry) {
      res.json({ message: 'OTP verified successfully' });
      delete otpData[mobile];
    } else {
      res.status(401).json({ message: 'Invalid OTP or OTP expired' });
    }
  } else {
    res.status(400).json({ message: 'User not found. Please register again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



