var express = require("express");
var router = express.Router();
var _ = require("lodash");
var env = require("../config/env");
var moment = require('moment');
var csrf = require("csurf");
var csrfProtection = csrf();
var db = require("../models");
var googleMapsClient = require('@google/maps').createClient({
    key: env.GEOCODING_KEY
});

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
            }
        ]
    })
    .then(function(data) {
        _.map(data, function(location, i) {
            googleMapsClient.geocode({
                address: location.address + ', ' + location.city + ', ' + location.state + ' ' + location.zip_code
            }, function(err, response) {
                if (!err) {
                    data[i].dataValues.lat = response.json.results[0].geometry.location.lat;
                    data[i].dataValues.lng = response.json.results[0].geometry.location.lng;

                    if (data.length === i + 1) {
                        res.json(data);
                    }
                }
            });
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
    .then(function(data) {
        res.json(data);
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

module.exports = router;
