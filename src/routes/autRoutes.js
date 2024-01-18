const express = require('express');
const authControllers = require('../controllers/authControllers');

const authRouter = express.Router();

// routes

authRouter.post('/auth/login', authControllers.login);

authRouter.post('/auth/register', authControllers.register);

module.exports = authRouter;
