const express = require("express");
const path = require("path");
const noteRoutes = require('./public/assets/js/notesroute');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', noteRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/", req.path))
});

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);