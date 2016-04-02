var jwt  = require('jsonwebtoken');
var Operateur = require('../models/Operateur');
var config   = require('../config/database');

/**
 * Cette fonction permet à un operateur de se connecter ,afin d'obtenir un token
 * @param req
 * @param res
 */
 function authToken(req, res){



     Operateur.findOne({username : req.body.username}, function(err, operateur){


             if(err) throw err;

             if(!operateur) {

                 res.json({success : false, message: 'Authentication failed. User not found.'});

             }else if(operateur){

                 // Make you sure the password is correct
                 operateur.verifyPassword(req.body.password ,function(err, isMatch){

                   if (err) {
                     return callback(err)
                   }
                   console.log(isMatch);

                     // Password did not match
                     if(!isMatch) {

                         return  res.json({success : false, message : 'Authentication failed. Wrong password.'});
                     }


                    // create a token
                     var token = jwt.sign(operateur, config.secret, {

                         expiresInMinutes : 1440  // expires in 24 hours
                     });
                     // return the information including  token as JSON
                     res.json({
                         success : true,
                         message : 'Enjoy your token !',
                         token : token
                     });
                 })
             }

         });
 }


/**
 * Cette fonction permet de verifier que le token est toujours valide
 * @param req
 * @param res
 * @param next
 */
function verifToken(req,  res, next){

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] ;

    //decode token
    if(token) {

        //verifies secret and checks  exp
      jwt.verify(token, config.secret, function(err, decoded){

        if(err){
            return res.json({success : false, message: 'Failed to Authenticate token.'});

        }else {
            req.decoded = decoded ;

            next();
        }
        });
    }else{
        // if there is no token
        // return an error
        return res.status(403).send({
            success : false,
            message : 'No token provided.'
        });
    }
}

exports.authenticate = authToken;

exports.middleware   = verifToken;
