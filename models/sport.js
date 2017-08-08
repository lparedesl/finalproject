module.exports = function(sequelize, DataTypes) {
    var Sport = sequelize.define("sport", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Sport.sync({
    // 	force: true
    // });

    return Sport;
};