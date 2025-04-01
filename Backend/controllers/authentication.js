const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
var fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    // If there are errors, return request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({
                    success,
                    error: "Sorry a user with this email already exists",
                });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;

        // res.json(user)
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const loginUser = async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res
                .status(400)
                .json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res
                .status(400)
                .json({
                    success,
                    error: "Please try to login with correct credentials",
                });
        }

        success = true;
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authtoken });
        // res.json({success})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { createUser, loginUser, getUser };
