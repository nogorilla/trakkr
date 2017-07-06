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

  res.redirect('/trackr');
};

exports.showTrackr = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trackr.findOne({ _id: req.params.id }, (err, trackr) => {
    if (err) { return next(err); }
    res.render('trackrs/show', {
      title: 'Trackr',
      trackr: trackr
    })
  });
};

exports.editTrackr = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trackr.findOne({ _id: req.params.id }, (err, trackr) => {
    if (err) { return next(err); }
    res.render('trackrs/edit', {
      title: 'Edit Trackr',
      trackr: trackr
    })
  });
};

exports.updateTrackr = (req, res) => {
  req.assert('description', 'Please provide a description').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect(`/trackr/${trackr._id}/edit`);
  }

  Trackr.findOneAndUpdate({ _id: req.params.id }, req.body, (err, trackr) => {
    if (err) { return next(err); }

    return res.redirect(`/trackr/${trackr._id}/edit`);
  });

};

exports.deleteTrackr = (reg, res) => {
  if (!req.user) {
    return res.redirect('/');
  }


};
