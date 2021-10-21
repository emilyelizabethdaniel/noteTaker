const fs = require('fs');
const uuid = require('uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );
class NoteRepo {

    constructor(dbPath, ) {
        this.dbPath = dbPath;
    }

    async saveNote(newTitle, newText) {
        var notes = await this.getNotes();

        var newNote = {
            id: uuid.v4(),
            title: newTitle,
            text: newText
        };
        notes.push(newNote);

        fs.writeFile(this.dbPath, JSON.stringify(notes, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData written to ${this.dbPath}`)
        );
        return newNote;
    };

    async getNotes() {
        var notes = await readFromFile(this.dbPath)
            .then(data => {
                return JSON.parse(data);
            })
        return notes;
    }

    deleteNote(id) {
        this.getNotes()
            .then(notes => {
                console.log('notes :>> ', notes);
                var newNotes = notes.filter(note => note.id !== id);
                return writeToFile(this.dbPath, newNotes);
            });
    };
}

module.exports = NoteRepo;