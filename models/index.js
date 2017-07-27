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
        underscored: true
    }
});

db.User          = require("./user")(sequelize, Sequelize);
db.Schedule       = require("./schedule")(sequelize, Sequelize);
db.Reservation       = require("./schedule")(sequelize, Sequelize);

// Join Tables
// db.ClassStudent      = require("./class_student")(sequelize, Sequelize);
// db.AttendanceStudent = require("./attendance_student")(sequelize, Sequelize);
// db.AssignmentStudent = require("./assignment_student")(sequelize, Sequelize);
// db.OrderBook         = require("./order_book")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
