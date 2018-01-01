const Trakkr = require('../models/Trakkr');
const Okkur = require('../models/Okkur');

exports.new = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }

  res.render('okkurs/new', {
    title: 'New Okkurs'
  });
};

exports.create = (req, res, next) => {
  req.assert('description', 'Please provide a description').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/okkurs/new');
  }

  Trakkr.findOne({ _id: req.params.trakkr_id }, (err, trakkr) => {
    if (err) { return next(err); }
    if (trakkr !== null) {
      let okkur = new Okkur({
        description: req.body.description,
        date: req.body.date
      });
      console.log('okkur: ', okkur);
      trakkr.okkurs.push(okkur);
      trakkr.save();

      res.redirect(`/trakkr/${trakkr._id}`);
    } else {
      res.render('404', { status: 404, url: req.url, title: 'Not Found' });
    }

  });
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
