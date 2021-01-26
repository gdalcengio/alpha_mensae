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
    console.log("hit models");
    // Book.find(callback);

    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("vivissimiDB");
    //     dbo.collection("books").find({}).toArray(function(err, result) {
    //       if (err) throw err;
    //       console.log(result);
    //       db.close();
    //     });
    //   });

    
}

module.exports.addBook = function(newBook, callback) {
    console.log(newBook.tags);
    newBook.save(callback);
}