var express = require("express");
var router = express.Router();

router.get("/test", function(req, res, next) {
    // res.render("email/add_existent_team_member", {
    res.render("email/add_nonexistent_team_member", {
        layout: 'email_template',
        title: "Project Title | Home"
    });
});

router.get("*", function(req, res, next) {
    res.render("index", {
        title: "Project Title | Home"
    });
});

module.exports = router;
