const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const APIError = require('../utils/apiErrors');
const chalk = require('chalk');

// default location to save images if no exists - creates
const dir = './uploads/products';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // If the uploadDir property doesn't exist, create it
    if (!req.uploadDir) {
      req.uploadDir = path.join(
        dir,
        `${new Date().toLocaleString('lt').replace(/\W/g, '_')}_${uuidv4()}`,
      );
    }

    // Create the directory if it doesn't exist
    if (!fs.existsSync(req.uploadDir)) {
      fs.mkdirSync(req.uploadDir, { recursive: true });
    }

    cb(null, req.uploadDir);
  },

  filename(req, file, cb) {
    // Create a date string with locale with short date style,
    // replace non-word characters with '_'
    const date = new Date().toLocaleString('lt').replace(/\W/g, '_');
    // Get the original file name, remove the extension,
    // join the remaining parts with '.', and replace non-word characters with '_'
    const originalName = file.originalname
      .split('.')
      .slice(0, -1)
      .join('.')
      .replace(/\W/g, '_');
    // Get the extension of the original file
    const extension = file.originalname.split('.').pop();
    const finalName = `${date}_${originalName}_${uuidv4()}.${extension}`;
    cb(null, finalName);
  },
});

module.exports = {
  upload: multer({
    storage,
    limits: {
      fileSize: 1000000, // limit file size to 1MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(
          new APIError('Please upload an image file (jpg, jpeg, or png)', 400),
          false,
        );
      }
      return cb(null, true);
    },
  }),

  deleteFile: (filePath) => {
    const parentDir = path.dirname(filePath);

    fs.rm(parentDir, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Failed to delete the directory: ${err}`);
      } else {
        console.log(chalk.bgGreen.whiteBright('Directory deleted successfully'));
      }
    });
  },

  imgQuality: (req, res, next) => {
    if (!req.files) {
      return next();
    }

    const promises = req.files.map((file) => {
      const filePath = file.path;
      const newFilePath = path.join(
        path.dirname(filePath),
        `up_${path.basename(filePath)}`,
      );

      return sharp(filePath)
        .resize(null, 576, { withoutEnlargement: true })
        .jpeg({ quality: 70 })
        .toFile(newFilePath)
        .then(() => {
          // Delete the original file
          fs.unlinkSync(filePath);

          // Update the file path in the request
          file.path = newFilePath;
        })
        .catch((err) => {
          console.error('Error processing image', err);
          next(err);
        });
    });

    Promise.all(promises)
      .then(() => next())
      .catch((err) => next(err));
  },
};
