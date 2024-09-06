const express = require("express");
// const router = express.Router
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route 1 : Get all the notes Get :
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
});

//Route 2 : Add new notes
router.post(
    "/addnewnote",
    fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Enter a valid description").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ result: result.array() });
            }

            const notes = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await notes.save();
            res.json(savedNote);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error")
        }

    }
);

//Route 3 : Updating a note :login required
router.put(
    "/updatenote/:id",
    fetchUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            let newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };
            // Find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not found")
            }
            if (note.user.toString() != req.user.id) {
                return res.status(401).send("Not Allowed")

            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note })
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error")
        }

    }
);

// Delete a note : Login required using put
router.delete(
    "/deletenote/:id",
    fetchUser,
    async (req, res) => {
    try {
        // const { title, description, tag } = req.body;
       
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        //allow deletion only if user is same
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")

        }

        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success":"note has been deleted",note:note })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

    })
module.exports = router;
