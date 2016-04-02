var passport       = require("passport");
var BasicStrategy  = require("passport-http").BasicStrategy;
var User           = require("../models/client");

passport.use(new BasicStrategy(

    function(username, password, callback){

        User.findOne({username : username}, function (err, user) {

          if (err) {
            return callback(err)
          }
          // No user found with that username
          if (!user) {
            return callback(null, false)
          }
          // Make you sure the password is correct
          user.verifyPassword(password ,function(err, isMatch){

            if (err) {
              return callback(err)
            }
            console.log(isMatch);

            // Password did not match
              if(!isMatch) { return callback(null, false)}


              //Suucess
              return callback(null , user);
            })


        });
}));

exports.isAuthenticated = passport.authenticate('basic', {session : false});
