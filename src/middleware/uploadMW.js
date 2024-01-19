const multer = require('multer');
const fs = require('fs');
const APIError = require('../utils/apiErrors');

// default location to save images if no exists - creates
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const date = new Date().toLocaleString('lt', { dateStyle: 'short' });
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${date}-${file.originalname}`);
  },
});

// logic for file validation
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // limit file size to 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new APIError('Please upload an image file (jpg, jpeg, or png)', 400), false);
    }

    return cb(null, true);
  },
});

module.exports = upload;
