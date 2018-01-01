const User = require('../models/User');
const Trakkr = require('../models/Trakkr');

exports.getTrakkrs = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trakkr.find({createdBy: req.user.id}, (err, trakkrs) => {
    res.render('trakkrs/list', {
      trakkrs: trakkrs.reduce((trakkrMap, trakkr) => {
        trakkrMap[trakkr.id] = trakkr;
        return trakkrMap;
      }, {}),
      'title': 'Trakking'
    });
  });
};

exports.getCreate = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('trakkrs/new', {
    title: 'New Trakkr'
  });
};

exports.postCreate = (req, res) => {
  req.assert('description', 'Please provide a description').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/trakkr/new');
  }

  new Trakkr({
    description: req.body.description,
    createdBy: req.user.id
  }).save();

  res.redirect('/trakkr');
};

exports.showTrakkr = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trakkr.findOne({ _id: req.params.id }, (err, trakkr) => {
    if (err) { return next(err); }
    if (trakkr !== null) {
      res.render('trakkrs/show', {
        title: 'Trakkr',
        trakkr: trakkr
      });
    } else {
      res.render('404', { status: 404, url: req.url, title: 'Not Found' });
    }

  });
};

exports.editTrakkr = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trakkr.findOne({ _id: req.params.id }, (err, trakkr) => {
    if (err) { return next(err); }
    res.render('trakkrs/edit', {
      title: 'Edit Trakkr',
      trakkr: trakkr
    })
  });
};

exports.updateTrakkr = (req, res, next) => {
  req.assert('description', 'Please provide a description').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect(`/trakkr/${req.params.id}/edit`);
  }

  Trakkr.findOneAndUpdate({ _id: req.params.id }, req.body, (err, trakkr) => {
    if (err) { return next(err); }

    return res.redirect(`/trakkr/${trakkr._id}/edit`);
  });

};

exports.deleteTrakkr = (req, res) => {

  req.flash('message', 'Trakkr deleted');
  console.log('trakkr deleted', req.params.id);
  // return res.redirect('/trakkr/');

  Trakkr.findOneAndRemove({ _id: req.params.id }, req.body, (err, trakkr) => {
    if (err) {
      req.flash('errors', err);
      return res.redirect(`/trakkr/${req.params.id}/edit`);
    }

    req.flash('message', 'Trakkr deleted');
    return res.redirect('/trakkr/');
  });
};
