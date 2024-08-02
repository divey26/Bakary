const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema for the form data
const formSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  residence: [String],
  address: String,
  phone: String,
  captcha: String,
  agreement: Boolean,
});

// Create a model from the schema
const FormData = mongoose.model('FormData', formSchema);

// Endpoint to handle form submission
app.post('/api/register', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).send({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(400).send({ error: 'Error saving form data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
