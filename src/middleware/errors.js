const chalk = require('chalk');
const APIError = require('../utils/apiErrors');

module.exports = {
  makeError: (gotError, req, res, next) => {
    console.log(chalk.bgRed.whiteBright('gotError ==='), gotError);

    if (gotError instanceof APIError) {
      return res.status(gotError.status).json({
        msg: gotError.message,
      });
    }

    if (gotError?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        msg: 'Email already taken',
      });
    }

    if (gotError?.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        msg: 'Maximum image size is 1MB',
      });
    }

    // in other condition
    res.status(500).json({
      msg: 'System error',
    });
  },
};
