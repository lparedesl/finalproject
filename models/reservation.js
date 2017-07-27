module.exports = function(sequelize, DataTypes) {
    var Reservation = sequelize.define("reservation", {
        reservation_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Reservation.sync({
    // 	force: true
    // });

    return Reservation;
};