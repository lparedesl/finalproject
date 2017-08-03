var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile_test', {
        userEmail: req.session.passport.user
    });
});

router.get("/logout", isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect("/");
});

router.get("/", function(req, res, next) {
    res.render("index", {
        title: "Project Title | Home"
    });
});

router.use("/", notLoggedIn, function(req, res, next) {
    next();
});

router.get("/get-csrf-token", function (req, res, next) {
    var messages = req.flash("error");
    var data = {
        messages: messages,
        hasErrors: messages.length > 0,
        csrfToken: req.csrfToken()
    };
    res.json(data);
});

router.get("*", function(req, res, next) {
    res.render("user/authentication", {
        title: "Project Title",
        signinPage: true
    });
});

router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/profile");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
