var express = require("express");
var router = express.Router();
var passport = require("passport");

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

router.get("/locations/*?", function(req, res, next) {
    res.render("content", {
        title: "Project Title | Locations",
        name: "Locations"
    });
});

router.get("/locations", function(req, res, next) {
    res.render("content", {
        title: "Project Title | Locations",
        name: "Locations"
    });
});

router.get("/teams", function(req, res, next) {
    res.render("content", {
        title: "Project Title | Teams",
        name: "Teams"
    });
});

router.get("/teams/*?", function(req, res, next) {
    res.render("content", {
        title: "Project Title | Teams",
        name: "Teams"
    });
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
