 
const express = require('express');
const path = require('path');
const multer = require('multer');
const dbHandler = require('./config/mongoose');
let importRouter = require('./routes/import_data');
 

let app = express();

 
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/autofi/import', importRouter);
 
 

app.use(multer({dest: __dirname + '/uploads/'}).any());
 
dbHandler.connect();



module.exports = app;