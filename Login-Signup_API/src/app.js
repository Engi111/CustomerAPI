const express = require("express");
const bcrypt = require("bcrypt")
const  connection = require("./config/db.config");
const indexRouter = require("./routers/index");
const logger = require('./middleware/logger')
const multer  = require('multer')


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false 
}));

//connect db
connection()

// app.use((req,res,next) => {
//     console.log(`"Method":${req.method} ${req.url}`);
//     next();
// })

app.use(logger)

// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//    // req.file is the name of your file in the form above, here 'uploaded_file'
//    // req.body will hold the text fields, if there were any 
//    console.log(req.file, req.body)
//    res.send("File Upload")
// });

// app.use(router);

app.use("/api", indexRouter)

app.use("/", (req, res,next) => {
    res.status(200).json({
        app: "CustomerAPI",
        message: "sup"
    })
});




module.exports = app;