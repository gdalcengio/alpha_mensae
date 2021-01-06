const express = require('express');
const router = express.Router();

//Register
router.post('/register', (req, res, next) =>{
    res.send('REGISTER');
});

//Authenticate
router.post('/authenticate', (req, res, next) =>{
    res.send('AUTHENTICATE');
});

module.exports = router;