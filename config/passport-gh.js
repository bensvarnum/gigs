require('dotenv').config()
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport')
const User = require('../models').User

//https://devswanted.herokuapp.com/auth/github/callback 
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.HOST_URL
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ where: { githubId: parseInt(profile.id) } })

            if (!user) {
                // if User doesn't exist then make a new database entry
                user = await User.build({
                    githubId: parseInt(profile.id),
                    name: profile.displayName,
                    email: profile.email,
                    username: profile.username,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                })
                await user.save()
            }
            done(null, profile)
        } catch (err) {
            console.error("OOPS, something went wrong", err)
        }

    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
module.exports = passport