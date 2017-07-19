/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (!req.user) {
    res.render('landing', {
      title: 'Welcome'
    });
  } else {
    res.render('home', {
      title: 'Trackr'
    });
  }
};
