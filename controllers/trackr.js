const User = require('../models/User');
const Trackr = require('../models/Trackr');
const moment = require('moment');

exports.getTrackrs = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trackr.find({created_by: req.user.id}, function(err, trackrs) {
    res.render('trackrs/list', {
      tracks: trackrs.reduce(function(trackrMap, trackr) {
        trackrMap[trackr.id] = trackr;
        return trackrMap;
      }, {}),
      'title': 'Tracking'
    });
  });
};

exports.getCreate = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('trackrs/new', {
    title: 'New Trackr'
  });
};

exports.postCreate = (req, res, next) => {
  req.assert('description', 'Please provide a description').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/trackr/new');
  }

  let date = new Date(req.body.date)
  if (date == 'Invalid Date') {
    date = new Date();
  }

  const task = new Trackr({
    description: req.body.description,
    created_by: req.user.id,
    date: date
  }).save();

  res.redirect('/');
};
