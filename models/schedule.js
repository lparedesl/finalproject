module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("schedule", {
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

    // Schedule.sync({
    // 	force: true
    // });

    return Schedule;
};