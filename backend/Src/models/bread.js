const mongoose = require('mongoose');

const breadSchema = new mongoose.Schema({
  breadname: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
});

module.exports = mongoose.model('Bread', breadSchema);
