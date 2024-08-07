const mongoose = require('mongoose'); // Import mongoose

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
});

const Cake = mongoose.model('Cake', itemSchema);

module.exports = Cake;
