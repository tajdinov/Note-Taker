const express = require('express');


// Import our modular routers for notes 
const notesRoute = require('./notes');

const app = express();

//application to use notesRoute
app.use('/notes', notesRoute);

//export app
module.exports = app;