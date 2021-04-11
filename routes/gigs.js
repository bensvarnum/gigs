const express = require('express')
const router = express.Router()
const Gig = require('../models').Gig
const { ensureAuthenticated } = require('../config/auth');

router.get('/all', ensureAuthenticated, (req, res) => {

  Gig.findAll()
    .then(gigs => res.render('gigs', {
      gigs, user: req.user
    }))
    .catch(err => console.log(err))
  // res.render('gigs', { user: req.user })

})
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add', { user: req.user })
})

router.post('/add', ensureAuthenticated, (req, res) => {
  let { title, technologies, description, contact } = req.body;

  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact) {
    errors.push({ text: 'Please add a way to contact you.' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      description,
      contact
    });
  } else {

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      contact
    })
      .then(gigs => res.redirect('all'))
      .catch(err => res.render('error', { error: err.message }))
  }
});

module.exports = router