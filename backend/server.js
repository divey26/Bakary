
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

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

// Register section
////////////////////////////////////////////////////////////////////////////////////

// Define a schema for the form data
const formSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  residence: [String],
  address: String,
  phone: String,
  prefix: { type: String, required: true }, // Make sure to include this
  captcha: String,
  agreement: { type: Boolean, required: true },
});

// Create a model from the schema
const FormData = mongoose.model('FormData', formSchema);

// Validation schema using Joi
const formValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  residence: Joi.array().items(Joi.string()).optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  prefix: Joi.string().required(), // Ensure it's included in validation
  captcha: Joi.string().required(),
  agreement: Joi.boolean().valid(true).required(),
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  console.log('Received request data:', req.body);
  const { email, password, firstname, lastname, residence, address, phone, prefix, captcha, agreement } = req.body;

  // Validate form data
  const { error } = formValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user already exists
    const existingUser = await FormData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user with hashed password
    const newUser = new FormData({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      residence,
      address,
      phone,
      prefix, // Make sure prefix is included
      captcha,
      agreement,
    });

    await newUser.save();
    res.status(201).send({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Error saving form data' });
  }
});

// Login section 
/////////////////////////////////////////////////////////////////////////////////////////////
// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate login data
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user exists
    const user = await FormData.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token as response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
});

// Bread section
/////////////////////////////////////////////////////////////////

// Define a schema for bread
const breadSchema = new mongoose.Schema({
  breadname: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true }, // Add imageURL field
});

// Create a model from the schema
const Bread = mongoose.model('Bread', breadSchema);

// Create a new bread
app.post('/api/bread', async (req, res) => {
  try {
    const { breadname, price, description, imageURL } = req.body;
    // Validate input
    if (!breadname || !price || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBread = new Bread({ breadname, price, description, imageURL });
    await newBread.save();
    res.status(201).json(newBread);
  } catch (error) {
    console.error('Error creating bread:', error);
    res.status(500).json({ error: 'Error creating bread' });
  }
});

// Fetch all bread items
app.get('/api/breads', async (req, res) => {
  try {
    const breads = await Bread.find();
    res.status(200).json(breads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching breads' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
