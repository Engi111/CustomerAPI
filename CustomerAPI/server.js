http = require("http");
const app = require("./src/app.js")
 
const express = require("express");
const appconfig = require("./src/config/app.config.js");

const PORT = appconfig.PORT || 3300;
const HOST = appconfig.HOST

//creating server instance
const server = http.createServer(app);

//listening port
server.listen(PORT, HOST, () => {
    console.log(`listening on http://${HOST}:${PORT}`)
})

