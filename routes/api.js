var express = require("express");
var router = express.Router();
var _ = require("lodash");
var moment = require('moment');
var csrf = require("csurf");
var csrfProtection = csrf();
var db = require("../models");

router.get("/get-locations", function(req, res, next) {
    db.Location.findAll({
        include: [
            {
                model: db.LocationSchedule
            },
            {
                model: db.Sport,
                include: {
                    model: db.Field
                }
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
                      start: reservation.reservation_date,
                      end: moment(reservation.reservation_date).add(1, 'hours'),
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
