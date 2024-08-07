const Cake = require('./../models/cake');
const { createItem, getAllItems } = require('./../controllers/ItemController');

exports.createCake = (req, res) => createItem(req, res, Cake);
exports.getAllCakes = (req, res) => getAllItems(req, res, Cake);
