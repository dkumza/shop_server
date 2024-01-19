const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const { sqlQuarryHelper, jWTTokenHelper } = require('../utils/helpers');
const APIError = require('../utils/apiErrors');

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM customers WHERE email=?';
    const [customer, error] = await sqlQuarryHelper(sql, [email]);

    if (error) {
      console.log(chalk.bgRed.whiteBright('login error ==='));
      return next(error);
    }

    // user not found
    if (customer.length === 0) {
      console.log(chalk.bgRed.whiteBright('user not found ==='));
      return next(new APIError('Email not found', 400));
    }

    // user found
    const foundUserInDB = customer[0];

    const passHash = foundUserInDB.password;

    // check passwords match
    if (!bcrypt.compareSync(password, passHash)) {
      return next(new APIError('Password and email do not match', 401));
    }

    // if all conditions met - generate session token
    const token = jWTTokenHelper({ email: foundUserInDB.email, sub: foundUserInDB.id });
    res.json({
      msg: 'Login success',
      token,
    });
  },

  register: async (req, res, next) => {
    const { name, email, password } = req.body;

    // bcrypt password
    const passwordHash = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO `customers` (`name`, `email`, `password`) VALUES (?, ?, ?)';
    const [customer, error] = await sqlQuarryHelper(sql, [name, email, passwordHash]);

    if (error) {
      console.log(chalk.bgRed.whiteBright('register error ==='));
      return next(error);
    }

    console.log(chalk.bgRed.whiteBright('customer.affectedRows ==='), customer.affectedRows);

    // created sucess
    if (customer.affectedRows === 1) {
      res.status(201).json({
        msg: 'Customer created successfully',
        id: customer.insertId,
      });
    }

    console.log(chalk.bgRed.whiteBright('customer ==='), customer);

    if (customer.length !== 1) {
      console.log(chalk.bgRed.whiteBright('customer.length !== 1'));
      return next(new APIError('Something went wrong', 400));
    }
  },
};
