const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Book Schema
const BookSchema = mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }]
});

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getBooks = function(callback){
    Book.find(callback);
}

module.exports.addBook = function(newBook, callback) {
    console.log(newBook.tags);
    newBook.save(callback);
}