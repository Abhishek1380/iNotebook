const express = require('express');
const router = express.Router();
const User = require('../models/User1.js');

// router.get('/', (req, res) => {
//     console.log(req.body);
//     res.send("Hello alina rai");
//     const newUser = User(req.body);
//     newUser.save();
// })


router.post('/', (req, res) => {
    console.log(req.body);
    res.send("Hello alina rai");
    const newUser = User(req.body);
    newUser.save();
})

module.exports = router;