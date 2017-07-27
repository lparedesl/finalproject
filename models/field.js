module.exports = function(sequelize, DataTypes) {
    var Field = sequelize.define("field", {
        field_number: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        capacity: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        available: {
            type: DataTypes.INTEGER(2)
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
        },
        price: {
            type: DataTypes.FLOAT(4,2),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Field.sync({
    // 	force: true
    // });

    return Field;
};