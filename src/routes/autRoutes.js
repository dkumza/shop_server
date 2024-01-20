const express = require('express');
const authControllers = require('../controllers/authControllers');

const authRouter = express.Router();

// routes
authRouter.post('/auth/register', authControllers.register);
authRouter.post('/auth/login', authControllers.login);

module.exports = authRouter;
