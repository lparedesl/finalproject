var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get("/logout", isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect("/");
});

router.get("*", function(req, res, next) {
    res.render("index", {
        title: "Project Title | Home"
    });
});

router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/dashboard/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
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
