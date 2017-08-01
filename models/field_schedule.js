module.exports = function(sequelize, DataTypes) {
    var FieldSchedule = sequelize.define("field_schedule", {
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
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // FieldSchedule.sync({
    // 	force: true
    // });

    return FieldSchedule;
};