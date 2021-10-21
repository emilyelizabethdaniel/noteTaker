const noteRoutes = require('express').Router();
const path = require("path");
const NoteRepo = require('./NoteRepo');

const noteRepo = new NoteRepo(path.join(__dirname, "../../../db/db.json"));

noteRoutes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

noteRoutes.get('/api/notes', (req, res) => {
    noteRepo.getNotes().then(notes => res.json(notes));

})

noteRoutes.post('/api/notes', (req, res) => {
    noteRepo.saveNote(req.body.title, req.body.text)
        .then(newNote => res.json(newNote));
});

noteRoutes.delete('/api/notes/:id', (req, res) => {
    noteRepo.deleteNote(req.query.id)
        .then(newNote => res.json(newNote));
});

module.exports = noteRoutes;