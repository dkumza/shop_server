const express = require('express');

const productRouter = express.Router();
const productControllers = require('../controllers/productControllers');

// ROUTES

// GET all products
productRouter.get('/products', productControllers.getAllProducts);

module.exports = productRouter;
