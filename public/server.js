const express = require("express");
const path = require("path");
const fs = require('fs');
const uuid = require('uuid');
const noteRoutes = require('./assets/js/notesroute');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);

const PORT = 3001;
const app = express();


// TODO: Implement middleware for the parsing of JSON data
// TODO: Implement middleware for parsing of URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', noteRoutes);

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, "../../notes.html"))
//     readFromFile(path.join(__dirname, "../db/diagnostics.json"))
//         .then(data => {
//             return res.json(JSON.parse(data));
//         })
// });


app.get('*', (req, res) => {
    console.log("\n\ndirectoryName: ", __dirname);
    console.log("Path: ", req.path);

    res.sendFile(path.join(__dirname, req.path))
});


// // GET request that returns data
// app.get('/api/data', (req, res) => {
//     // code which gathers up the data
//     const data = {};
//     // return the data
//     res.status(200).json(data);
// });

// // GET request that returns data by id value
// app.get('/api/data/:id', (req, res) => {
//     // get the id value
//     const dataId = req.params.id;
//     // gather up the data
//     const data = {};
//     // return the data
//     res.status(200).json(data);
// });

// // POST request that handles submitted data
// app.post("/api/widget", (req, res) => {
//     // grab the data submitted
//     const data = req.body;
//     // do something with it... then send back a response
//     res.json({ result: "success" });
// });

// Tell express to start listening!
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);