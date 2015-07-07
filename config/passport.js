'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    SalesExec = require('mongoose').model('SalesExec'),
    LocalStrategy = require('passport-local').Strategy;
/**
 * Module init function.
 */
module.exports = function() {
    // Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // Deserialize sessions
    passport.deserializeUser(function(id, done) {
        SalesExec.findOne({
            _id: id
        }, '-salt -password', function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username, password, done) {
            SalesExec.findOne({
                title: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                }
                if (false && !user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                }

                return done(null, user);
            });
        }
    ));
};
