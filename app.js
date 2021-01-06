const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Database Connect
mongoose.connect(
    config.database,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

//on error
mongoose.connection.on('connected', (err) => {
    console.log('Database error '+err);
});

const app = express();


const users = require('./routes/users');
const books = require('./routes/books');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder (serves it essentially)
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);
app.use('/books', books);

//Index Route
app.get('/', (req, res) => {
    res.send("Invalid endpoint");
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});