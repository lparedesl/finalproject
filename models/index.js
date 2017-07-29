'use strict';
var env       = require("../config/env");
var Sequelize = require("sequelize");
var db        = {};

var sequelize = new Sequelize (
env.DATABASE_NAME,
env.DATABASE_USERNAME,
env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    define: {
        underscored: true,
        freezeTableName: true
    }
});

db.Field = require("./field")(sequelize, Sequelize);
db.Location = require("./location")(sequelize, Sequelize);
db.Reservation = require("./reservation")(sequelize, Sequelize);
db.Schedule = require("./schedule")(sequelize, Sequelize);
db.Sport = require("./sport")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

// Join Tables
db.FavoriteLocation = require("./favorite_location")(sequelize, Sequelize);
db.LocationSport = require("./location_sport")(sequelize, Sequelize);
db.UserLocation = require("./user_location")(sequelize, Sequelize);
db.UserTeam = require("./user_team")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
