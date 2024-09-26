const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./db'); // Import the User model
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rahulsonar28803:JWeX7tOXCdL2JAh0@cluster0.qjoti.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));
  
// Route to handle login
app.post('/api/login', async (req, res) => {
  const { email, password,name } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        email,
        password: hashedPassword,
        name
      });
      await user.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
