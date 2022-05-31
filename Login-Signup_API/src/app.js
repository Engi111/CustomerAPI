const express = require("express");
const bcrypt = require("bcrypt")
const  connection = require("./config/db.config");
const indexRouter = require("./routers/index");
const logger = require('./middleware/logger')

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

app.use("/", indexRouter)

app.use("/", (req, res,next) => {
    res.status(200).json({
        app: "CustomerAPI",
        message: "sup"
    })
});




module.exports = app;