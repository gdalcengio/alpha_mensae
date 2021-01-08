const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Book Schema
const BookSchema = mongoose.Schema({
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
        data: Buffer,
        contentType: String
    },
    link: {
        type: String,
        required: true
    }
});

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getBooks = function(callback){
    Book.find(callback);
}

// module.exports.getUserByUsername = function(username, callback){
//     const query = {username: username}
//     User.findOne(query, callback);
// }

module.exports.addBook = function(newBook, callback) {
    newBook.save(callback);
}