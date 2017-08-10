var express = require("express");
var router = express.Router();
var passport = require("passport");
var csrf = require("csurf");
var csrfProtection = csrf();

router.use(csrfProtection);

router.get("/get-csrf-token", function (req, res, next) {
    var messages = req.flash("error");
    var data = {
        messages: messages,
        hasErrors: messages.length > 0,
        csrfToken: req.csrfToken()
    };
    res.json(data);
});

router.get("/logout", isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect("/");
});

router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/user/signin",
    failureRedirect: "/user/signup",
    failureFlash: true,
    session: false
}));

router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/dashboard/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/dashboard/profile");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
