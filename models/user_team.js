module.exports = function(sequelize, DataTypes) {
    var UserTeam = sequelize.define("user_team", {});

    // UserTeam.sync({
    // 	force: true
    // });

    return UserTeam;
};