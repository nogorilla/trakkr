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
        date: req.body.date,
        trakkr: trakkr._id
      });
      okkur.save();
      console.log('okkur: ', okkur);

      res.redirect(`/trakkr/${trakkr._id}`);
    } else {
      res.render('404', { status: 404, url: req.url, title: 'Not Found' });
    }

  });
};

exports.show = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  Trakkr.findOne({ _id: req.params.trakkr_id }, (err, trakkr) => {
    if (err) { return next(err); }

    const okkur = trakkr.okkurs.id(req.params.okkur_id);

    if (trakkr !== null && okkur) {
      res.render('okkurs/show', {
        title: 'Okkur',
        trakkr: trakkr,
        okkur: okkur
      });
    } else {
      res.render('404', { status: 404, url: req.url, title: 'Not Found' });
    }

  });
};

exports.edit = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }

  Trakkr.findOne({ _id: req.params.trakkr_id }, (err, trakkr) => {
    if (err) { return next(err); }

    const okkur = trakkr.okkurs.id(req.params.okkur_id);

    console.log(okkur);

    if (trakkr !== null && okkur !== null) {
      res.render('okkurs/edit', {
        title: 'Edit Okkur',
        trakkr: trakkr,
        okkur: okkur
      });
    } else {
      res.render('404', { status: 404, url: req.url, title: 'Not Found' });
    }
  });
};

exports.update = (req, res, next) => {
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

exports.delete = (req, res) => {

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
