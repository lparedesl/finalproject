var env       = require("../config/env");
var Sequelize = require('sequelize');
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

db.User          = require("./user")(sequelize, Sequelize);
db.Schedule       = require("./schedule")(sequelize, Sequelize);
db.Location       = require("./location")(sequelize, Sequelize);
db.Sport       = require("./sport")(sequelize, Sequelize);
db.Field       = require("./field")(sequelize, Sequelize);

// Join Tables
db.LocationSport      = require("./location_sport")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
