const noteRoutes = require('express').Router();
const express = require("express");
const path = require("path");
const fs = require('fs');
const uuid = require('uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);


//setting up the routes
//getting the notes from the db json file

noteRoutes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});
//get the db routing info
noteRoutes.get('/api/notes', (req, res) => {
    readFromFile(path.join(__dirname, "../../../db/db.json"))
        .then(data => {
            return res.json(JSON.parse(data));
        })
})

module.exports = noteRoutes;