const chalk = require('chalk');
const APIError = require('../utils/apiErrors');

module.exports = {
  makeError: (gotError, req, res, next) => {
    console.log(chalk.bgRed.whiteBright('gotError ==='), gotError);

    if (gotError instanceof APIError) {
      return res.status(gotError.status).json({
        error: gotError.message,
      });
    }

    if (gotError?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: 'Email already taken',
      });
    }

    // in other condition
    res.status(500).json({
      error: 'System error',
    });
  },
};
