const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const APIError = require('../utils/apiErrors');

// default location to save images if no exists - creates
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Create a date string with locale with short date style,
    // replace non-word characters with '_'
    const date = new Date().toLocaleString('lt', { dateStyle: 'short' }).replace(/\W/g, '_');
    // Get the original file name, remove the extension,
    // join the remaining parts with '.', and replace non-word characters with '_'
    const originalName = file.originalname.split('.').slice(0, -1).join('.').replace(/\W/g, '_');
    // Get the extension of the original file
    const extension = file.originalname.split('.').pop();
    cb(null, `${date}_${originalName}_${uuidv4()}.${extension}`);
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
        return cb(new APIError('Please upload an image file (jpg, jpeg, or png)', 400), false);
      }
      return cb(null, true);
    },
  }),

  deleteFile: (path) => {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Failed to delete the uploaded file: ${err}`);
      } else {
        console.log('Uploaded file deleted successfully');
      }
    });
  },

  imgQuality: (req, res, next) => {
    if (!req.file) {
      throw new APIError('System error', 400);
    }

    const { path: filePath } = req.file;

    sharp(filePath)
      // Resize the width to 500 pixels, w/o upscale
      .resize(500, null, { withoutEnlargement: true })
      .jpeg({ quality: 70 })
      .toFile(`${filePath}_xs.jpg`) // Save the resized/reduced file with a new name
      .then(() => {
        // Delete the original file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete the original file: ${err}`);
          }
          next();
        });
      })
      .catch((err) => {
        console.error(`Failed to resize/reduce the image: ${err}`);
        next(err);
      });
  },
};
