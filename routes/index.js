var express = require('express');
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/signin", function(req, res, next) {
    // var messages = req.flash("error");
    res.render("user/signin", {
        title: "Project Title | Sign In",
        csrfToken: req.csrfToken(),
        // messages: messages,
        // hasErrors: messages.length > 0
    });
});

router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

router.get("/signup", function(req, res, next) {
    // const messages = req.flash("error");
    res.render("user/signup", {
        title: "Mercado Libre Analytics | Sign Up",
        csrfToken: req.csrfToken(),
        // messages: messages,
        // hasErrors: messages.length > 0
    });
});

router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup",
    failureFlash: true
}));

module.exports = router;
