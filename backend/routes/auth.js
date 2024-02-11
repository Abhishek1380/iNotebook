const express = require('express');
const router = express.Router();
const User = require('../models/User1.js');
const { body, validationResult } = require('express-validator');

// router.get('/', (req, res) => {
//     console.log(req.body);
//     res.send("Hello alina rai");
//     const newUser = User(req.body);
//     newUser.save();
// })


router.post('/', [body('name').isLength({ min: 3 }),
body('email', 'Please enter valid email').isEmail(),
body('password').isLength({ min: 5 }),
body('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user));


    console.log(req.body);

    // This was to create new user everytime. But insted we used User.create
    // const newUser = new User(req.body);
    // newUser.save()
    //     .then(user => {
    //         res.status(201).json(user);
    //     })
    //     .catch(error => {
    //         console.error('Error creating uset', error.message);
    //         res.status(500).json({ error: 'Error creating user' });
    //     })
});



module.exports = router;