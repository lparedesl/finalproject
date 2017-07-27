module.exports = function(sequelize, DataTypes) {
    var LocationSport = sequelize.define("location_sport", {});

    // LocationSport.sync({
    // 	force: true
    // });

    return LocationSport;
};