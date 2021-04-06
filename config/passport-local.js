const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const bcrypt = require('bcryptjs');
const db = require('../models')
const User = db.User

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async function (username, password, done) {
            const validPassword = async function (userpass, password) {
                return await bcrypt.compare(password, userpass)
            }

            await User.findOne({ where: { email: username } }).then(function (user, userpass, password) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect email address.' });
                }
                if (!validPassword(userpass, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });

        }

    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await User.findByPk(id);
            if (!user) {
                return done(new Error('user not found'));
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};