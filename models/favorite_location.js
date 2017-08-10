module.exports = function(sequelize, DataTypes) {
    var FavoriteLocation = sequelize.define("favorite_location", {});

    // FavoriteLocation.sync({
    // 	force: true
    // });

    return FavoriteLocation;
};