const express = require("express");
const router = express.Router();
const passport = require('../config/passport-gh')

router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/users/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

module.exports = router;