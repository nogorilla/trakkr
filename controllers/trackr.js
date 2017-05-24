const User = require('../models/User');
const Task = require('../models/Trackr');


exports.getTracks = (req, res) => {
  res.render('tracks/list', {
    title: 'Tracking'
  });
};

exports.getCreate = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('tracks/create', {
    title: 'Create Track'
  });
};

exports.postCreate = (req, res) => {
  req.assert('description', 'Please provide a description').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('tracks/create');
  }

  const task = new Trackr({
    description: req.body.description,
    date: req.body.date
  });

  res.redirect('/');
};
