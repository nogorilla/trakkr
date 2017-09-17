const Trakkr = require('../models/Trakkr');
const moment = require('moment');

exports.index = (req, res) => {
  let view  = 'landing'
      title = 'Welcome',
      trakkrs = null;

  if (req.user) {
    view = 'home';
    title = 'Trakkr';
    Trakkr.find({created_by: req.user.id}, (err, trakkrs) => {
      res.render(view, {
        trakkrs: trakkrs.reduce((trakkrMap, trakkr) => {
          if (moment(trakkr.date).get('month') === moment().get('month')) {
            trakkrMap[trakkr.id] = trakkr;
          }
          return trakkrMap;
        }, {}),
        'title': title
      });
    });
  } else {
    res.render('landing', {
      title: 'Welcome'
    });
  }
};
