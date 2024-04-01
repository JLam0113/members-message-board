const express = require("express");
const router = express.Router();
const passport = require("passport");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

// TODO Message routes

router.get("/", async (req, res) => {
  const allMessages = await Message.find().sort({ name: 1 }).exec();
  console.log(allMessages);
  res.render("index", { user: req.user, messages: allMessages });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/message", async (req, res) => {
  body("username", "username must be specified").trim().isLength({ min: 1 }).escape(),
    body("message", "message must be specified").trim().isLength({ min: 1 }).escape(),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const message = new Message({
        username: req.body.username,
        message: req.body.message,
        date: new Date()
        ,
      });

      if (!errors.isEmpty()) {
        console.log("error")
        res.redirect('back');
        return;
      }
      else {
        await message.save();
        res.redirect('back');
      }
    });
});

module.exports = router;