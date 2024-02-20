const express = require('express');
const citiesControllers = require('../controllers/citiesControllers');

const citiesRouter = express.Router();

// routes
citiesRouter.get('/cities', citiesControllers.getAllCities);

module.exports = citiesRouter;
