require('dotenv').config()
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport')
const User = require('../models').User

// http://localhost:5000/auth/github/callback
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "https://devswanted.herokuapp.com/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, done) {
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
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
module.exports = passport