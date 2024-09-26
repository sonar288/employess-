const mongoose = require('mongoose');

// Connect to MongoDB

// Create a simple schema and model
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  Name: String,

});
const admin = mongoose.model('User', adminSchema);

module.exports = admin;





