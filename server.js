//requiring is used to return the function reference
const express = require ('express');
const app = express();

//listen method is used for server to connect with browser
// app.listen(3000,() => { //port 3000 for connections
//     console.log("This is for customer API");
// })
app.listen(3000, () => {
    console.log("xyz");
})
// app.get('/', (req, res) => {
//     res.send("This is for Customer API");
// })
//within callback, res and req arguments are used (CRUD-R-GET)
// app.get('/', ( req, res) => {
// res.sendFile(__dirname + '/index.html'); //_dir -> current directory we're in
// })
app.post("/", (req, res) => {
},