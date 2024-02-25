const express = require('express');

const productCatsRouter = express.Router();
const productCatControllers = require('../controllers/productCatControllers');
const authToken = require('../middleware/authToken');

// ROUTES //
// GET all categories
productCatsRouter.get('/categories', authToken, productCatControllers.getCategories);
// GET all subcategories
productCatsRouter.get('/sub-categories', productCatControllers.getAllSubCategories);
// GET single sub category, by category ID
productCatsRouter.get('/sub-category/:catID', productCatControllers.getSubCategory);

module.exports = productCatsRouter;
