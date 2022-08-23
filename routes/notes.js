const notes = require('express').Router();

//readFromFile, readAndAppend, writeToFile require the methods that are found in fsUtils 
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
//dependency that creates a random ID. 
const { v4: uuidv4 } = require('uuid');



//GET route for retrieinvg all the notes; 
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    //read files in db.json 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// POST Route for NEW notes 
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);

    if (req.body) {
        //creating new note with a title, text and id 
        const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uuidv4()
            }
            //readAndAppend newnote to db.json 
        readAndAppend(newNote, './db/db.json');
        res.json('Note added!');
        //error if cant post to db.json
    } else {
        res.error('Error in adding note!');
    }
});


//DELETE Route for Notes 
//creating the path for delete note. //using delete method to delete note
notes.delete('/:id', (req, res) => {
    //noteid = requested note with paramater id 
    let noteId = req.params.id;
    //read notes that are current in db.json file
    readFromFile('./db/db.json')
        //parse the data as a string 
        .then((data) => JSON.parse(data))
        .then((json) => {
            // function to create new array of notes, using filter method, exclude saved note with id that matches noteId with the same id.
            //note pre defined in public folder, index.js 
            const updateNotes = json.filter((note) => note.id !== noteId);
            // updateNote is writen to file path ending at db.json 
            writeToFile('./db/db.json', updateNotes);
            // NoteId has been deleted
            res.json(`${noteId} your note has been deleted ! `);
        });
});


module.exports = notes