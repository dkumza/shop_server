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
    // If the uploadDir property (dir for uploading images) doesn't exist, create it
    // - ensures that all files from the same upload are saved in the same directory.
    if (!req.uploadDir) {
      req.uploadDir = path.join(
        dir,
        `${new Date().toLocaleString('lt').replace(/\W/g, '_')}_${uuidv4()}`,
      );
    }

    // Create the directory in system - if it doesn't exist, by req.uploadDir name
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
    // If there are no files in the request, proceed to the next middleware
    if (!req.files) {
      return next();
    }

    // For each file in the request, create a promise that processes the image
    const promises = req.files.map((file) => {
      // Get the current file path
      const filePath = file.path;
      // Create a new file path for the processed image
      const newFilePath = path.join(
        path.dirname(filePath),
        `up_${path.basename(filePath)}`,
      );

      // Use sharp to process the image
      return sharp(filePath)
        .resize(null, 576, { withoutEnlargement: true }) // Resize the image
        .jpeg({ quality: 70 }) // Convert the image to JPEG with quality 70
        .toFile(newFilePath) // Save the processed image to the new file path
        .then(() => {
          // Delete the original file
          fs.unlinkSync(filePath);

          // Update the file path in the request to the new file path
          file.path = newFilePath;
        })
        .catch((err) => {
          // If there's an error, log it and pass it to the next middleware
          console.error('Error processing image', err);
          next(err);
        });
    });

    // Wait for all the image processing promises to complete
    Promise.all(promises)
      .then(() => next()) // If all promises complete without errors, proceed to the next middleware
      .catch((err) => next(err)); // If there's an error in any promise, pass it to the next middleware
  },
};
