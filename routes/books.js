const express = require('express');
const router = express.Router();

//All books
router.get('/', (req, res, next) =>{
    res.send('books find');
});

//Add Book
router.post('/add', (req, res, next) =>{
    res.send('ADD');
});


module.exports = router;