const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer  = require('multer');

const Book = require('../models/book');

//declaring multer function to upload images (might need to be wrapped in fun
//function idk)
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

//image upload route
router.post('/img', upload.any(), function(req, res, next) {
    console.log(req.body);
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        req.body.imageUrl = 'http://192.168.0.7:3000/images/' + req.file.filename;
        // Gallery.create(req.body, function (err, gallery) {
        //     if (err) {
        //         console.log(err);
        //         return next(err);
        //     }
        //     res.json(gallery);
        // });
        res.json(req);
    }
});

//add
router.post('/addabook', (req, res, next) =>{
    let newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        review: req.body.review,
        link: req.body.link,
        img: req.body.img,
        tags: req.body.tags
    });

    Book.addBook(newBook, (err, book) => {
        if (err) {
            res.json({success: false, msg:'Failed to add book'});
        } else {
            res.json({success: true, msg:'Book added'});
        }
    });
});

//All books
router.get('/getBooks', (req, res) =>{
    Book.find().then(doc => {
        console.log("from database", doc);
        if (doc) {
            res.status(200).json({success: true, msg:'get boks hit', doc: doc});
        }
    }).catch();
    // detail.find({}, function(err, result) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.json(result);
    //     }
    // });
    console.log(req);
    console.log(res);
    // Book.getBooks(function(req, res) {
    //     // if (err) {
    //     //     console.log(err);
    //     // } else {
    //         res.json(res);
    //     // }
    // });
    // res.send('books find');
});

module.exports = router;