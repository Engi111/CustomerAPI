const router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, uploadFiles } = require("../helpers/upload");

const fileController = require("../controllers/file");

// router.post("/upload", uploadFile,fileController.upload);

// router.post("/upload", upload.single("file"), fileController.upload);

router.post("/upload", upload.array("file", 10), fileController.upload);


router.post("/upload/multiple", uploadFiles, fileController.uploads);


router.get("/files", fileController.getFileLists);

router.get("/files/ :name", fileController.download);

module.exports = router;
