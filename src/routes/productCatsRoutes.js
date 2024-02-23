const express = require('express');

const productCatsRouter = express.Router();
const productCatControllers = require('../controllers/productCatControllers');

// ROUTES //
// GET all categories
productCatsRouter.get('/categories', productCatControllers.getCategories);
// GET all subcategories
productCatsRouter.get('/sub-categories', productCatControllers.getAllSubCategories);
// GET single sub category, by category ID
productCatsRouter.get('/sub-category/:catID', productCatControllers.getSubCategory);

module.exports = productCatsRouter;
