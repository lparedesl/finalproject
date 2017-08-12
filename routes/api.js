var express = require("express");
var router = express.Router();
var _ = require("lodash");
var env = require("../config/env");
var moment = require('moment');
var db = require("../models");
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: env.GOOGLE_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

router.get("/get-user-info", function(req, res, next) {
    db.User.findOne({
        where: {
            email: req.session.passport.user
        }
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.get("/get-locations", function(req, res, next) {
    db.Location.findAll({
        include: [
            {
                model: db.LocationSchedule
            },
            {
                model: db.Sport,
                include: {
                    model: db.Field,
                    include: {
                        model: db.Reservation,
                        include: {
                            model: db.User
                        }
                    }
                }
            },
            {
                model: db.User
            }
        ]
    })
    .then(function(locations) {
        _.map(locations, function(location, i) {
            var favorites = _.filter(location.dataValues.users, user => user.email === req.session.passport.user);
            location.dataValues.favorite = favorites.length > 0;
            var fields = _.filter(location.sports[0].fields, data => { return data.location_id === location.id; });
            location.dataValues.first_field = fields[0];
            geocoder.geocode(location.address + ', ' + location.city + ', ' + location.state + ' ' + location.zip_code)
                    .then(function(response) {
                        location.dataValues.lat = response[0].latitude;
                        location.dataValues.lng = response[0].longitude;

                        if (locations.length === i + 1) {
                            res.json(locations);
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
        });
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/get-location", function(req, res, next) {
    db.Location.findOne({
        where: {
            id: req.body.id
        },
        include: [
            {
                model: db.LocationSchedule
            },
            {
                model: db.Sport,
                include: {
                    model: db.Field,
                    include: {
                        model: db.Reservation,
                        include: {
                            model: db.User
                        }
                    }
                }
            },
            {
                model: db.User
            }
        ]
    })
    .then(function(location) {
        var favorites = _.filter(location.dataValues.users, user => user.email === req.session.passport.user);
        location.dataValues.favorite = favorites.length > 0;
        var fields = _.filter(location.dataValues.sports[0].fields, data => { return data.location_id === location.dataValues.id; });
        location.dataValues.first_field = fields[0];
        geocoder.geocode(location.dataValues.address + ', ' + location.dataValues.city + ', ' + location.dataValues.state + ' ' + location.dataValues.zip_code)
              .then(function(response) {
                  location.dataValues.lat = response[0].latitude;
                  location.dataValues.lng = response[0].longitude;

                  res.json(location);
              })
              .catch(function(err) {
                  console.log(err);
              });
    })
    .catch(function(error) {
      console.log(error);
    })
});

router.get("/get-teams", function(req, res, next) {
    db.Team.findAll({
        include: [
            {
                model: db.User
            }
        ]
    })
    .then(function(teams) {
        var userTeams = _.filter(teams, function(team) {
            var teamUser = _.filter(team.dataValues.users, function(user) {
                return user.email === req.session.passport.user;
            });
            if (teamUser.length > 0) {
                return true;
            }
        });
        res.json(userTeams);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/get-team", function(req, res, next) {
    db.Team.findOne({
        where: {
            id: req.body.id
        },
        include: [
            {
                model: db.User
            }
        ]
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/get-field", function(req, res, next) {
    db.Field.findOne({
        where: {
            id: req.body.id
        },
        include: {
            model: db.Reservation,
            include: {
                model: db.User
            }
        }
    })
    .then(function(field) {
        res.json(field);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.get("/get-user-reservations", function(req, res, next) {
    db.Reservation.findAll({
        include: [
            {
                model: db.User
            },
            {
                model: db.Field,
                include: [
                    {
                        model: db.Location
                    },
                    {
                        model: db.Sport
                    }
                ]
            }
        ]
    })
    .then(function(data) {
        var userReservations = _.filter(data, function(reservation) {
            return reservation.user.email === req.session.passport.user;
        });

        var reservations = [];
        _.map(userReservations, function(reservation) {
            var obj = {
                location: reservation.field.location.name,
                field: "Field " + reservation.field.field_number,
                sport: reservation.field.sport.name,
                resDate: moment.tz(reservation.reservation_date, "America/New_York").format("MMMM D, YYYY"),
                resTime: moment.tz(reservation.reservation_date, "America/New_York").format("h:mm A")
            };
            reservations.push(obj);
        });

        res.json(reservations);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/field-schedule", function(req, res, next) {
    db.Reservation.findAll({
        where: {
            field_id: req.body.id
        },
        include: [
            {
                model: db.User
            },
            {
                model: db.Field,
                include: {
                    model: db.Location
                }
            }
        ]
    })
      .then(function(data) {
          if (data.length > 0) {
              var openTime = JSON.stringify(data[0].dataValues.field.location.open_time).substring(1, 6);
              var closeTime = JSON.stringify(data[0].dataValues.field.location.close_time).substring(1, 6);
              var info = {
                  openTime: openTime,
                  closeTime: closeTime
              };
              info.reservations = [];
              _.map(data, function(reservation) {
                  var obj = {
                      title: reservation.user.first_name + " " + reservation.user.last_name,
                      start: moment.tz(reservation.reservation_date, "America/New_York").format(),
                      end: moment.tz(moment(reservation.reservation_date).add(1, 'hours'), "America/New_York").format(),
                      backgroundColor: 'green',
                      allDay: false,
                  };
                  info.reservations.push(obj);
              });
              res.json(info);
          } else {
              db.Field.findOne({
                  where: {
                      id: req.body.id
                  },
                  include: {
                      model: db.Location
                  }
              })
                .then(function(data) {
                    var openTime = JSON.stringify(data.dataValues.location.open_time).substring(1, 6);
                    var closeTime = JSON.stringify(data.dataValues.location.close_time).substring(1, 6);
                    var info = {
                        openTime: openTime,
                        closeTime: closeTime,
                        reservations: []
                    };
                    res.json(info);
                })
                .catch(function(error) {
                    console.log(error);
                });
          }
      })
      .catch(function(error) {
          console.log(error);
      });
});

router.post("/reserve-field", function(req, res, next) {
    db.Field.findOne({
        where: {
            id: req.body.field
        },
        include: [
            {
                model: db.Location,
                include: {
                    model: db.LocationSchedule
                }
            },
            {
                model: db.Reservation
            }
        ]
    })
    .then(function(field) {
        var error = false;
        var body = {
            reservation_date: moment(req.body.reservation_date + " " + req.body.reservation_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
            user_id: parseInt(req.body.user),
            field_id: parseInt(req.body.field)
        };

        // Field is taken
        _.map(field.reservations, function(reservation) {
            var dbDate = moment.tz(reservation.reservation_date, "America/New_York").format("YYYY-MM-DD HH:mm:ss");
            if (dbDate === body.reservation_date) {
                error = true;
                res.json({error: "This field is reserved at the selected time"});
            }
        });

        // Nonbusiness Day
        if (field.location.location_schedule.days_long.indexOf(moment(req.body.reservation_date, "YYYY-MM-DD").format("dddd")) === -1) {
            error = true;
            res.json({error: "This location is not open on the selected day"});
        }

        // Nonbusiness Time
        if (moment(req.body.reservation_time, "HH:mm:ss").format("HH:mm:ss") < moment(field.location.open_time, "HH:mm:ss").format("HH:mm:ss") || moment(req.body.reservation_time, "HH:mm:ss").format("HH:mm:ss") >= moment(field.location.close_time, "HH:mm:ss").format("HH:mm:ss")) {
            error = true;
            res.json({error: "This location is not open at the selected time"});
        }

        if (!error) {
            db.Reservation.create(body)
            .then(function(reservation) {
                res.json(reservation);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/favorite-location", function(req, res, next) {
    if (!req.body.favorite) {
        db.FavoriteLocation.create({
            user_id: req.body.user_id,
            location_id: req.body.location_id
        })
        .then(function() {
            res.json({newState: true});
        })
        .catch(function(error) {
            console.log(error);
        });
    } else {
        db.FavoriteLocation.destroy({
            where: {
                user_id: req.body.user_id,
                location_id: req.body.location_id
            }
        })
        .then(function() {
            res.json({newState: false});
        })
        .catch(function(error) {
            console.log(error);
        });
    }
});

router.post("/create-team", function(req, res, next) {
    db.Team.findOne({
        where: {
            name: req.body.teamName
        }
    })
    .then(function(team) {
        var error = false;

        if (team) {
            error = true;
            res.json({error: "A team with this name already exists. Choose a different name."});
        }

        if (!error) {
            db.Team.create({
                name: req.body.teamName,
                image: req.body.imgLink
            })
            .then(function(newTeam) {
                db.UserTeam.create({
                    user_id: req.body.userId,
                    team_id: newTeam.dataValues.id
                })
                .then(function() {
                    res.json(newTeam);
                })
                .catch(function(error) {
                    console.log(error);
                })
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/add-team-member", function(req, res, next) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(function(user) {
        var error = false;

        if (!user) {
          error = true;
          res.json({error: "We couldn't find a user with that email. Try another one."});
        } else {
            db.UserTeam.findOne({
                where: {
                    user_id: user.dataValues.id,
                    team_id: req.body.teamId
                }
            })
            .then(function(member) {
                if (member) {
                    error = true;
                    res.json({error: "This user is already on this team."});
                }

                if (!error) {
                    db.UserTeam.create({
                        user_id: user.dataValues.id,
                        team_id: req.body.teamId
                    })
                    .then(function() {
                        res.json(user);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

module.exports = router;
