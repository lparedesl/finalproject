module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("location", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        city: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        state: {
            type: DataTypes.STRING(20),
            validate: {
                notEmpty: true,
                len: [2]
            }
        },
        zip_code: {
            type: DataTypes.CHAR(5),
            validate: {
                notEmpty: true,
                len: [5]
            }
        },
        country: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        open_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        close_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Location.sync({
    // 	force: true
    // });

    return Location;
};