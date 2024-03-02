const express = require('express');
const authControllers = require('../controllers/authControllers');
const { loginValidation, signUpValidation } = require('../middleware/validation');
const authToken = require('../middleware/authToken');

const authRouter = express.Router();

// routes
authRouter.post('/auth/register', signUpValidation, authControllers.register);
authRouter.post('/auth/login', loginValidation, authControllers.login);
authRouter.get('/auth/users-count', authToken, authControllers.usersData);

module.exports = authRouter;
