const express = require("express");
const router = express.Router();
const passport = require("passport");
const Message = require("../models/message");

// TODO Message routes

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
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

module.exports = router;