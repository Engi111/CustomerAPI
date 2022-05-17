const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = 1111;
//c for importing the routes
const authRoutes = require("./routes/authRoutes.js");

//configuring the import
dotenv.config();

//toconnectwithdatabase
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to the Database")
);


//rrouting the middlewares
app.use("/api/user", authRoutes);

app.listen(PORT, () =>{
    console.log(`Running server on port: ${PORT}`);
});