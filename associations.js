module.exports = function(db) {
    db.User.hasMany(db.Reservation, {
        onDelete: "cascade"
    });
    db.User.hasMany(db.Location, {
        onDelete: "cascade"
    });
    db.User.belongsToMany(db.Team, {
        through: db.UserTeam
    });
    db.User.belongsToMany(db.Location, {
        through: db.FavoriteLocation
    });

    db.Team.belongsToMany(db.User, {
        through: db.UserTeam
    });

    db.Location.belongsTo(db.User, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Location.belongsTo(db.Schedule, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Location.hasMany(db.Field, {
        onDelete: "cascade"
    });
    db.Location.belongsToMany(db.Sport, {
        through: db.LocationSport
    });
    db.Location.belongsToMany(db.User, {
        through: db.FavoriteLocation
    });

    db.Sport.hasMany(db.Field, {
        onDelete: "cascade"
    });
    db.Sport.belongsToMany(db.Location, {
        through: db.LocationSport
    });

    db.Field.belongsTo(db.Location, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Field.belongsTo(db.Sport, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Field.hasMany(db.Reservation, {
        onDelete: "cascade"
    });

    db.Schedule.hasMany(db.Location, {
        onDelete: "cascade"
    });

    db.Reservation.belongsTo(db.User, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Reservation.belongsTo(db.Field, {
        foreignKey: {
            allowNull: false
        }
    });
};
