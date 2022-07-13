const uploadFile = require("../helpers/upload");
const fileUploadServices = require("../services/fileUpload");

exports.upload = async (req, res, next) => {
  fileUploadServices
    .upload(req,res)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error();
    });
};

exports.uploads = async (req, res, next) => {
    fileUploadServices
      .uploads()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error();
      });
  };

  exports.getFileLists = async (req, res, next) => {
    fileUploadServices
      .getFileLists()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error();
      });
  };

  exports.download = async (req, res, next) => {
    fileUploadServices
      .download()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error();
      });
  };