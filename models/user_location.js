module.exports = function(sequelize, DataTypes) {
    var UserLocation = sequelize.define("user_location", {});

    // UserLocation.sync({
    // 	force: true
    // });

    return UserLocation;
};