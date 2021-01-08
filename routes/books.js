const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Book = require('../models/book');
const book = require('../models/book');

//add
router.post('/add', (req, res, next) =>{
    let newBook = new User({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        review: req.body.review,
        link: req.body.link,
        img: req.body.img
    });

    Book.addBook(newBook, (err, user) => {
        if (err) {
            res.json({success: false, msg:'Failed to add book'});
        } else {
            res.json({success: true, msg:'Book added'});
        }
    });
});

//All books
router.get('/', (req, res, next) =>{
    res.send('books find');
});

//Add Book
router.get('/add', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;

    res.json({
        success: true,
        book: {
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            link: book.link,
            review: book.review,
            img: book.img
        }
    });
});

module.exports = router;