// transfert.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var TransfertSchema = new  Schema({
    code        : String,
    montant     : Number,
    agenceEnvoi : String,
    agenceReception : String,
    agentEnvoi   : {
        nom : String,
        prenom : String
    },
    agentReception   : {
        nom : String,
        prenom : String
    },

    clientEnvoi  : {
        nom : String,
        prenom : String
    },
    clientReception : {
        nom : String,
        prenom : String
    },
    frais       : Number,
    tva         : Number,
    grille      : String,
    statut      : String,
    total       : Number,
    dateCreation        : Date,
    dateModification        : Date,

});

module.exports = mongoose.model('Transfert', TransfertSchema);
