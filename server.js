const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

// Replace with your own MongoDB connection string
const url = 'mongodb+srv://halkano:28889244@Dad@logindetails.n9wh5hf.mongodb.net/?retryWrites=true&w=majority';

// Replace with your own secret key
const secretKey = 'mysecretkey';

app.post('/register'), async (req, res) => {
  const { name, email, username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Connect to the MongoDB database
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db('loginpcee');
  const collection = db.collection('details');

  try {
    // Insert the new user into the database
    await collection.insertOne({ username, email, password: hashedPassword });

    // Create a verification token
    const verificationToken = jwt.sign({ email }, secretKey, { expiresIn: '1d' });

    // Send a verification email to the user
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email_address',
        pass: 'your_email_password'
        }
        });
        const mailOptions = {
        from: 'your_email_address',
        to: email,
        subject: 'Verify your email address',
        html: '<p>Please click the link below to verify your email address:</p> <a href="http://localhost:3000/verify?token=${verificationToken}">Verify email</a>'
        };
        await transporter.sendMail(mailOptions);
        // Send a response to the client
res.json({ message: 'A verification email has been sent to your email address. Please verify your email before logging in.' });
} catch (err) {
    // Send an error response to the client
    res.json({ error: 'An error occurred. Please try again later.' });
    } finally {
    // Close the MongoDB connection
    await client.close();
    }
    };
    
    app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Connect to the MongoDB database
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('loginpcee');
    const collection = db.collection('details');
    
    try {
    // Check if the email is registered
    const user = await collection.findOne({ email });
    if (!user) {
    res.json({ error: 'Invalid email or password.' });
    return;
    }
    // Compare the hashed password
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  res.json({ error: 'Invalid email or password.' });
  return;
}

// Check if the email is verified
if (!user.isVerified) {
  res.json({ error: 'Please verify your email before logging in.' });
  return;
}

// Create a JWT token
const token = jwt.sign({ email }, secretKey, { expiresIn: '1d' });

// Send a response to the client
res.json({ message: 'Logged in successfully.', token });
} catch (err) {
    // Send an error response to the client
    res.json({ error: 'An error occurred. Please try again later.' });
    } finally {
    // Close the MongoDB connection
    await client.close();
    }
    });
    
    app.get('/verify', async (req, res) => {
    const { token } = req.query;
    
    try {
    // Verify the JWT token
    const { email } = jwt.verify(token, secretKey);
    // Connect to the MongoDB database
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
const db = client.db('mydb');
const collection = db.collection('users');

// Update the user's verification status
await collection.updateOne({ email }, { $set: { isVerified: true } });

// Send a response to the client
res.json({ message: 'Your email has been verified. You can now log in.' });
} catch (err) {
// Send an error response to the client
res.json({ error: 'Invalid token. Please try registering again.' });
}
});

// Replace with your own port number
app.listen(3000, () => {
console.log('Server is running on port 3000.');
})

