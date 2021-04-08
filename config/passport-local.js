const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const bcrypt = require('bcryptjs');
const User = require('../models').User


module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async function (username, password, done) {
            const user = await User.findOne({
                where: {
                    email: username
                }
            }).catch(error => { return done(error) });
            if (!user) {
                return done(null, false, { message: 'That email is not registered' });
            }
            let matched = await bcrypt.compare(password, user.password);
            if (!matched) {
                return done(null, false, { message: 'Password is incorrect' });
            }
            return done(null, user);
        }

    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};