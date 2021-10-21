const fs = require('fs');
const uuid = require('uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);

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

    async deleteNote(id) {
        var notes = await this.getNotes();

        notes.filter(note => note.id !== id);

        fs.writeFile(this.dbPath, JSON.stringify(notes, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData written to ${this.dbPath}`)
        );
        return newNote;
    };
}

module.exports = NoteRepo;