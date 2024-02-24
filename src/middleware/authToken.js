// file for authToken validation
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const { jwtSecret } = require('../config/config');

module.exports = function authToken(req, res, next) {
  console.log('authToken in progress');
  try {
    // console.log(
    //   chalk.bgGreen.whiteBright('req.headers.authorization: '),
    //   req.headers.authorization,
    // );
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new Error('no token');
    const decoded = jwt.verify(token, jwtSecret);
    req.userID = decoded.sub;
    next();
  } catch (error) {
    console.log(chalk.bgRed.whiteBright('error: '), error);
    res.status(401).json({ msg: 'Unauthorized' });
  }
};
