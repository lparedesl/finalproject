module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("team", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        image: {
            type: DataTypes.STRING
        }
    });

    // Team.sync({
    // 	force: true
    // });

    return Team;
};