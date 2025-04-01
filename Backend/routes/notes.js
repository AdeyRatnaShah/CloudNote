const express = require("express");
// const router = express.Router
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { getNotes, addNewNote, updateNote, deleteNote } = require("../controllers/notesManip");



//Route 1 : Get all the notes Get :
router.get("/fetchallnotes", fetchUser,getNotes );

//Route 2 : Add new notes
router.post(
    "/addnewnote",
    fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Enter a valid description").isLength({ min: 5 }),
    ],
    addNewNote
);

//Route 3 : Updating a note :login required
router.put(
    "/updatenote/:id",
    fetchUser,
   updateNote
);

// Delete a note : Login required using put
router.delete(
    "/deletenote/:id",
    fetchUser,
    deleteNote
)


module.exports = router;
