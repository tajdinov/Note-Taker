// import packages.. //
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

//Port that works with Heroku too. 
const PORT = process.env.PORT || 3001;

const app = express();

//middleware for parsing JSON and urlencoded from data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route to get API
app.use('/api', api);

// allowing full access to folder public
app.use(express.static('public'));

// GET Route for homepage. i.e. index.html 
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET route for notes . i.e. notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET wildcard route to redirect back to the  homepage 
app.get('*', (req, res) => res.redirect('/'));

//application to listen for all GET requests. 
app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
);