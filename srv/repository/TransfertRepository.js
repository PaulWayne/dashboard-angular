/**
 * Created by macbookpro on 21/03/16.
 */
var Transfert = require('../models/transfert');
var u = require('../util');
var q = require('q');


function create(object){
  var transfert = new Transfert();
  var deffered = q.defer();
  transfert.code = object.code;
  transfert.montant = object.montant;
  transfert.dateCreation = object.dateCreation;
  transfert.dateModification = object.dateModification;
  transfert.agenceEnvoi = object.agenceEnvoi;
  transfert.agenceReception = object.agenceReception;
  transfert.agentEnvoi = object.agentEnvoi;
  transfert.agentReception = object.agentReception;
  transfert.clientEnvoi = object.clientEnvoi;
  transfert.clientReception = object.clientReception;
  transfert.frais = object.frais;
  transfert.tva = object.tva;
  transfert.statut = object.statut;
  transfert.total = object.total;

  transfert.save(function(err, object){
    if(err) deffered.reject(err);
     deffered.resolve({message: 'le transfert a été bien crée !', data: object});
  });
  return deffered.promise;
}

function update(id, object){
 var deffered = q.defer();
 var transfert = {

 }
 Transfert.findById(id, function(err, transfert){
   if(err) deffered.reject(err);
   if(transfert !== null){
   transfert.montant = object.montant;
   transfert.agenceEnvoi = object.agenceEnvoi;
   transfert.agenceReception = object.agenceReception;
   transfert.agenceEnvoi = object.agenceEnvoi;
   transfert.agentReception = object.agentReception;
   transfert.clientEnvoi = object.clientEnvoi;
   transfert.clientReception = object.clientReception;
   transfert.frais = object.frais;
   transfert.total = object.total;
   transfert.statut = object.statut;
   transfert.dateCreation = transfert.dateCreation;
   transfert.dateModification = object.dateModification;

   transfert.save(function(err, object){
     if(err) deffered.reject(err);
     deffered.resolve({message: 'Le transfert a été bien modifiée !', data: object});
   });
   }else {
     deffered.reject({message:'Le transfert n\'existe pas', statusCode: u.HTTP_CODE.NOT_EXIST});
   }
 });
  return deffered.promise;
}

function findOne(id){
  var deffered = q.defer();
  var error = {
    message : 'Ce transfert n\'existe pas !',
    statusCode : u.HTTP_CODE.BAD_REQUEST
  }
  Transfert.findOne({_id :id}, function (err, transfert) {
    if(err || transfert === null) {
      var errorOutput = u.errorFormater(id,error.message,error.statusCode);
      deffered.reject(errorOutput);
    }
    deffered.resolve({message: 'Le transfert', data: transfert});
  });
  return deffered.promise;
}
function findAll(){
  var deffered = q.defer();
  Transfert.find(function(err, transferts){
    if(err) deffered.reject(err);
    deffered.resolve({message: 'La liste des transferts', data:transferts});
  });
  return deffered.promise;
}
function findByAgence(code){
  var deffered = q.defer();
  Transfert.find({agenceEnvoi:code},function(err, transferts){
    if(err) deffered.reject(err);
    deffered.resolve({message: 'La liste des transferts de l\'agence'+code, data:transferts});
  });
  return deffered.promise;
}

function remove(code){
  var deffered = q.defer();
 Transfert.findOne({code:code}, function(err, transfert){
   if(err) deffered.reject(err);
   if(transfert !== null){
    Transfert.remove({_id: transfert._id}, function(err, object){
      if(err) deffered.reject(err);
      deffered.resolve({message: 'le transfert a été bien supprimé', data: object});
    });
  } else{
     deffered.reject({message: 'le transfert n\' a pas abouti'});
   }
 });

  return deffered.promise;
}

exports.create = create;
exports.update = update;
exports.remove = remove;
exports.findAll = findAll;
exports.findOne = findOne;
exports.findByAgence = findByAgence;
