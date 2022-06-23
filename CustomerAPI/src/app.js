const express = require("express");
const databaseHelper = require("./config/db.config.js");
const { Router } = require("../src/router/users");
const indexRouter = require("../src/router/index");

const app = express();

//db connection
databaseHelper.init(app);

app.use((req, res, next) => {
  req.db = app.locals.db;

  next();
});

//parsing
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api", indexRouter);

app.use("/", (req, res, next) => {
  res.status(200).json({
    app: "CustomerAPI",
    message: "hello world",
  });
});

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    //application error
    return res.status(400).json({ message: err });
  }

  //default to 500 server error
  return res.status(500).json({ message: err.message });
}

app.use(errorHandler);
module.exports = errorHandler;

module.exports = app;
