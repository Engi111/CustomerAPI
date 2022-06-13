const http = require("http");


const cors = require("cors");
const express = require("express");
const app = require("./src/app");
const appconfig = require("./src/config/app.config")
const PORT = appconfig.PORT || 3030;
const HOST = appconfig.HOST
global._basedir = __dirname;
var corsOptions = {
    origin: "http://localhost:7777"
};

//imp
// const userRouter = require("./src/routers/users")
// const indexRouter = require("./src/routers/index")
// console.log(PORT,HOST)

//creating server instance
const server = http.createServer(app);

//listening port
server.listen(PORT, HOST, () => {
    console.log(`listening on http://${HOST}:${PORT}`)
})

