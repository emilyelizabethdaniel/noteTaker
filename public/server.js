const express = require("express");
const path = require("path");
const noteRoutes = require('./assets/js/notesroute');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', noteRoutes);


app.get('*', (req, res) => {
    console.log("\n\ndirectoryName: ", __dirname);
    console.log("Path: ", req.path);

    res.sendFile(path.join(__dirname, req.path))
});

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);