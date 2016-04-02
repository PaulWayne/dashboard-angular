// user.js

var mongoose     = require("mongoose");
var bcrypt       = require("bcrypt-nodejs");

var schema       = mongoose.Schema;

var OperateurSchema   = new schema({
     username : String,
     password : String,
     nom: String,
     prenom: String,
     agence   : String,
     admin    : Boolean
});

// Execute before each user.save() call
OperateurSchema.pre('save', function(callback){
    var user = this;

    if(!user.isModified('password')) return callback();


    bcrypt.genSalt(5, function (err, salt) {
        if(err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return callback(err);
            user.password = hash;
            callback();

        });
    });

});

OperateurSchema.methods.verifyPassword = function(password , cb){

    var currentPassword = this.password;

    bcrypt.compare(password, currentPassword, function (err, isMatch) {

        if(err) return cb(err);

        cb(null,isMatch);
    })
};
//Export Model
module.exports = mongoose.model('Operateur', OperateurSchema);
