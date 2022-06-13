const uploadFile = require("../middleware/upload");
const upload = async (req,res) => {
  try {
     if (!req.file) {
         return res.status(400).send({message: "Please upload a file"})
     } 
     res.status(200).send({
         message: "File uploaded sucessfully " + req.file.originalname,
     });
  } catch (error) {
      if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }
      res.status(500).send({
          message: `An error occured while uploading a file: ${req.file.originalname}. ${err}`,
      });
  }
};
//for multiple files
const uploads = async (req,res) => {
  try {
     if (!req.files.length) {
         return res.status(400).send({message: "Please upload a file"})
     } 
     res.status(200).send({
         message: "File uploaded sucessfully " + req.file.originalname,
     });
  } catch (error) {
      if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }
      res.status(500).send({
          message: `An error occured while uploading a file: ${req.file.originalname}. ${err}`,
      });
  }
};
const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
      res.status(200).send(fileInfos);
    });
  };
  const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };
  module.exports = {
    upload,
    getListFiles,
    download,
  };