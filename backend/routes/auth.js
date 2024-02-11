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

// Create a user using :POST "/api/auth/createUser".No login required
router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });

        // Send the created user object in response
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;