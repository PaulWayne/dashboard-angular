// client.js

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var ClientSchema =  new Schema({

    nom : String,
    prenom : String,
    dateNaissance : Date,
    adresse : String,
    email   : String,
    phone    : Number
});

ClientSchema.index({prenom : 1, nom : -1});

ClientSchema.statics.findClientByPrenom = function(prenom, cb){
  return this.find({prenom : new RegExp(prenom, 'i')}, cb);
};


module.exports = mongoose.model('Client', ClientSchema);
