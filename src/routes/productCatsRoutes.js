const express = require('express');

const productCatsRouter = express.Router();
const productCatControllers = require('../controllers/productCatControllers');

// ROUTES //
// GET all categories
productCatsRouter.get('/categories', productCatControllers.getCategories);
// GET all sub categories, by categories ID
productCatsRouter.get('/sub-categories/:catID', productCatControllers.getSubCategories);

module.exports = productCatsRouter;
