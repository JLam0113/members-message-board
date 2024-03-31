const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/user");

router.get("/", (req, res) => res.render("sign-up-form"));

router.post("/", async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            // if err, do something
            if (err) {
                console.log("error hashing");
                res.redirect('back');
                return;
            }
            // otherwise, store hashedPassword in DB
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });
            const result = await user.save();
            res.redirect("/");
        });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;