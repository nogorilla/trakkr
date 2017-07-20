const Trackr = require('../models/Trackr');
const moment = require('moment');

exports.index = (req, res) => {
  let view  = 'landing'
      title = 'Welcome',
      trackrs = null;

  if (req.user) {
    view = 'home';
    title = 'Trackr';
    Trackr.find({created_by: req.user.id}, (err, trackrs) => {
      res.render(view, {
        trackrs: trackrs.reduce((trackrMap, trackr) => {
          if (moment(trackr.date).get('month') === moment().get('month')) {
            trackrMap[trackr.id] = trackr;
          }
          return trackrMap;
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
