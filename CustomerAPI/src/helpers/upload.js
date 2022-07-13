const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

//determine folder destination and name
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

exports.uploadFiles = multer({storage}).array('files',10);
