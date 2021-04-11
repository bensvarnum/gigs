const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get("/", forwardAuthenticated, (req, res) => {
  res.render("welcome", { user: req.user });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {

  res.render('dashboard', { user: req.user })
  console.log('req', req.user)
});

module.exports = router;
