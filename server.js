
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rahulsonar28803:JWeX7tOXCdL2JAh0@cluster0.qjoti.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Create a simple schema and model
const itemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
