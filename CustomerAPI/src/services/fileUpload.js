const uploadFile = require("../helpers/upload");

exports.upload = async (req, res) => {
  try {
    if (!req.files) {
      return { sucess: true, messsge: "PLease upload a file!!" };
    }
    return {
      message: "File uploaded sucessfully ",
    };
  } catch (error) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return {
        message: "File size cannot be larger than 2MB!",
      };
    }
    return {
      message: `An error occured while uploading a file: ${req.file.originalname}. ${err}`,
    };
  }
};

exports.uploads = async () => {
  try {
    if (!req.files.length) {
      return { message: "Please upload a file" };
    }
    return {
      message: "File uploaded sucessfully " + req.file.originalname,
    };
  } catch (error) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return {
        message: "File size cannot be larger than 2MB!",
      };
    }
    return {
      message: `An error occured while uploading a file: ${req.file.originalname}. ${err}`,
    };
  }
};

// exports.getFileLists = async () => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";
//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }
//     let fileInfos = [];
//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });
//     return {fileInfos};
//   });
// };

// exports.download = async () => {
//   const fileName = req.params.name;
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";
//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       return {
//         message: "Could not download the file. " + err,
//       };
//     }
//   });
// };
