const express = require('express');
const router = express.Router();
const User = require('../models/User1.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js');

const JWT_SECRET = "Imgonnabegreat";
// router.get('/', (req, res) => {
//     console.log(req.body);
//     res.send("Hello alina rai");
//     const newUser = User(req.body);
//     newUser.save();
// })

// ROUTE 1 : Create a user using :POST "/api/auth/createUser".No login required
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






        // Here after creating user password will directlt be stored in database. We don't want that. so instead we would add salt in password using bcrypt
        // user = await User.create({
        //     name: req.body.name,
        //     password: req.body.password,
        //     email: req.body.email
        // });



        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });


        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);




        // Send the created user object in response
        res.status(201).json(authToken);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Router 2 : Authenticate a user using :POST "/api/auth/login".No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            // return res.send(400).json({error:"User does not exist"});
            // If somebody is trying to use my website with wrong intentions then why would I tell him that user soes not exist Insted use this
            return res.send(400).json({ error: "Please enter valid credentials" });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.send(400).json({ error: "Please enter valid credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Router 3 : Get user details using :POST "/api/auth/getUser".Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;