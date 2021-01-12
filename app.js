const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const multer = require('multer');
//Database Connect
mongoose.connect(config.database,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

//on error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

//image uploading
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({storage: storage})

const app = express();
app.use(cors());
app.post('/image-upload', upload.single('file'), (req, res) => {
    res.json({success: true, msg:'Image Uploaded', filename: req.file.filename});
})
    

const users = require('./routes/users');
const books = require('./routes/books');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Set Static Folder (serves it essentially)
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/img',express.static(path.join(__dirname, 'public/images')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/books', books);

//Index Route
// app.get('/', (req, res) => {
//     res.send("Invalid endpoint");
// });

//Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});