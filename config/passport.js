var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	db.User.findOne({
		where: {
			email: email
		}
	})
	.then(function(user){
		done(null, user);
	})
	.catch(function(error){
		done(error, null);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
}, function(req, email, password, done) {
    console.log("======================");
    console.log("FROM FORM:", req.body);
    console.log("======================");
	req.checkBody("email", "Invalid email")
	.notEmpty()
	.isEmail();
	req.checkBody("password", "Invalid password")
	.notEmpty()
	.isLength({
		min: 6
	});
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash("error", messages));
	}
	db.User.findOne({
		where: {
			email: email
		}
	})
	.then(function (user){
		if (user && user.status === "active") {
			return done(null, false, {
				message: "This email already exists"
			});
		} else if (user && user.status === "pending") {
            db.User.encryptPassword(password, function(hash) {
                db.User.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    date_of_birth: req.body.date_of_birth,
                    gender: req.body.gender,
                    phone: req.body.phone,
                    password: hash,
                    is_admin: req.body.is_admin,
                    status: 'active'
                }, {
                    where: {
                        email: email
                    }
                })
                .then(function(newUser) {
                    return done(null, newUser);
                })
                .catch(function(error) {
                    console.log(error);
                });
            });
		} else if (password !== req.body.confirm_password) {
			return done(null, false, {
				message: "Passwords don't match"
			});
		} else {
            var newUser = db.User.build({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                gender: req.body.gender,
                phone: req.body.phone,
                email: email,
                password: password,
                is_admin: req.body.is_admin,
                status: 'active'
            });

            db.User.encryptPassword(password, function(hash) {
                newUser.password = hash;
                newUser.save().then(function(user) {
                    return done(null, user);
                });
            });
        }
	})
	.catch(function(error) {
	    console.log(error);
	});
}));

passport.use("local.signin", new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
}, function(req, email, password, done) {
    req.session.userType = req.body.userType;
	req.checkBody("email", "Invalid email")
	.notEmpty()
	.isEmail();
	req.checkBody("password", "Invalid password")
	.notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash("error", messages));
	}
	db.User.findOne({
		where: {
            email: email
		}
	})
	.then(function(user){
		if (!user) {
			return done(null, false, {
				message: "Email not found"
			});
		}

		db.User.validPassword(password, user.password, function(isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Wrong password"
                });
            }
        });
	})
	.catch(function(error) {
		console.log(error);
    });
}));
