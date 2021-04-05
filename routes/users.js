const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../models").User

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
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
      req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      res.redirect('/users/login');
    }
  }
});

module.exports = router;
