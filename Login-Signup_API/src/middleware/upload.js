const multer = require("multer");
const util = require("util");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
exports.uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// let uploadFile = multer({ dest: './public/data/uploads/' }).single("file");
exports.uploadFiles = multer({storage}).array('files',10);
