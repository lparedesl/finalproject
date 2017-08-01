module.exports = function(sequelize, DataTypes) {
    var LocationSchedule = sequelize.define("location_schedule", {
        days_short: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        days_long: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // LocationSchedule.sync({
    // 	force: true
    // });

    return LocationSchedule;
};