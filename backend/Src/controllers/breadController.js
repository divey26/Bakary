const Bread = require('../models/bread');

const createBread = async (req, res) => {
  const { breadname, price, description, imageURL } = req.body;

  if (!breadname || !price || !description || !imageURL) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newBread = new Bread({
      breadname,
      price,
      description,
      imageURL
    });

    await newBread.save();
    res.status(201).json(newBread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBreads = async (req, res) => {
  try {
    const breads = await Bread.find();
    res.status(200).json(breads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching breads' });
  }
};

module.exports = { createBread, getBreads };
