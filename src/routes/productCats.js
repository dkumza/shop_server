const express = require('express');

const productCats = express.Router();
const productCatControllers = require('../controllers/productCatControllers');

// ROUTES //
// GET all categories
productCats.get('/categories', productCatControllers.getCategories);
// GET all sub categories, by categories ID
productCats.get('/sub-categories/:catID', productCatControllers.getSubCategories);

module.exports = productCats;
