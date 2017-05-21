const User = require('../models/User');

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
