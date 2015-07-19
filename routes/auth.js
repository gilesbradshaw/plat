'use strict';

var passport = require('passport');

module.exports = function(app) {

  var users = {
    signin: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
          res.status(400).send(info);
        } else {
          // Remove sensitive data before login
          user.password = undefined;
          user.salt = undefined;

          req.login(user, function(lerr) {
            if (lerr) {
              res.status(400).send(lerr);
            } else {
              res.json(user);
            }
          });
        }
      })(req, res, next);
    },
    signout: function(req, res) {
      req.logout();
    },
    /**
 * Send User
 */
    me: function(req, res) {
      res.json(req.user || null);
    }
  };


  app.route('/auth/me').get(users.me);
  app.route('/auth/signin').post(users.signin);
  app.route('/auth/signout').get(users.signout);

};
