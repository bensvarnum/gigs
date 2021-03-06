const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../models").User
const passport = require('passport')
const { forwardAuthenticated } = require('../config/auth');

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("register", { user: req.user });
});

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" })
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" })
  }
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" })
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      errors.push({ msg: "Email is already registered" })
      res.render('register', { errors, name, email, password, password2 })
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name,
        password: hashedPassword,
        email
      })
      await newUser.save()
      req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      res.redirect('/users/login');
    }
  }
});

// Login
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/users/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
