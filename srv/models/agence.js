var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var SchemaAgence = new  Schema({
    code    : String,
    nom     : String,
    pays    : String,
    ville   : String
});

module.exports = mongoose.model('Agence', SchemaAgence);
