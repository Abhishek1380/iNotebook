const express = require('express');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const Note = require('../models/Notes1');
const { body, validationResult } = require('express-validator');
//  Route 1: Get all notes using  : GET "/api/auth/getuser". Login Required
router.get('/fetchallotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({ success: true, notes });
    } catch (error) {
        console.error('Error fetching notes : ', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

})
//  Route 2: Add notes using  : post "/api/auth/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.error('Error fetching notes : ', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

})

// Route 3: Update an Existing note using :POST "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    const newNote = {};

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated
    try {
        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

}
)
module.exports = router;
