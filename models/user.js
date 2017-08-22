var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING(30)
        },
        last_name: {
            type: DataTypes.STRING(30)
        },
        date_of_birth: {
            type: DataTypes.DATE
        },
        gender: {
            type: DataTypes.CHAR(1)
        },
        phone: {
            type: DataTypes.CHAR(20)
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.STRING(60),
            defaultValue: "active"
        }
    },{
        classMethods: {
            encryptPassword: function(password, cb) {
                bcrypt.hash(password, bcrypt.genSaltSync(5), null, function(error, hash) {
                    if (error) {
                        return done(error);
                    } else {
                        cb(hash);
                    }
                });
            },
            validPassword: function(password, passwd, cb) {
                bcrypt.compare(password, passwd, function(error, isMatch) {
                    if (error) console.log(error);
                    cb(isMatch);
                });
            }
        }
    });

    // User.sync({
    // 	force: true
    // });

    return User;
};