/**
 * Created by macbookpro on 05/03/16.
 */

var Client = require('../models/client');
var u = require('../util');
var q = require('q');



function save(object){
  var client = new Client();
  var deffered = q.defer();
  var existMessage = u.errorFormat('le client existe deja', u.HTTP_CODE.CONFLICT);
  var errorMessage = u.errorFormater(object.nom,'creation du client non abouti', u.HTTP_CODE.ERROR);
  var responseMessage = u.responseFormater('creation du client a abouti');

  Client.findOne({nom: object.nom, prenom:object.prenom}, function(err, clientOld){

    if(err) deffered.reject(errorMessage);

    if(clientOld === null){
      client.nom = object.nom;
      client.prenom = object.prenom;
      client.adresse = object.adresse;
      client.email = object.email;
      client.phone = object.phone;
      client.dateNaissance = object.dateNaissance;

      client.save(function(err, client){
        if(err) deffered.reject(errorMessage);
        responseMessage.data = client;
        deffered.resolve(responseMessage);
      });
    }else{
     deffered.reject(existMessage);
    }
  });
  return deffered.promise;
}

function findAll(){
  var deffered = q.defer();
  var errorMessage = u.errorFormater('','la requete n\' a pas abouti', u.HTTP_CODE.ERROR);
  var responseMessage = u.responseFormater('la liste des clients');


  Client.find(function(err, clients){
    if(err) deffered.reject(errorMessage);
    responseMessage.data = clients;
    deffered.resolve(responseMessage);
  });

  return deffered.promise;

}

function findOne(id){
  var deffered = q.defer();
  var errorMessage = u.errorFormater(id,'ce client n\'existe pas', u.HTTP_CODE.NOT_EXIST);
  var responseMessage = u.responseFormater('le client');

    Client.findById(id,function(err, client){
      if(err) deffered.reject(errorMessage);
      responseMessage.data = client;
      deffered.resolve(responseMessage);
    });
  return deffered.promise;
}

function update(id, newClient){
  var deferred = q.defer();
  var erroMessage = u.errorFormater(id,'le client n\' a pas été modifié !', u.HTTP_CODE.ERROR);
  var existMessage =  u.errorFormater(id,'le client existe deja !', u.HTTP_CODE.CONFLICT);
  var responseMessage = u.responseFormater('le client a été modifié');

  Client.findById(id, function(err, client){
    if(err) deferred.reject(erroMessage);
    if(!err && client === null){
      client.nom = newClient.nom;
      client.prenom = newClient.prenom;
      client.dateNaissance = newClient.dateNaissance;
      client.adresse = newClient.adresse;
      client.email = newClient.email;
      client.phone = newClient.phone;

      client.save(function(err, client){
        if(err) deferred.reject(erroMessage);
        responseMessage.data = client;
        deferred.resolve(responseMessage);
      });
    }else{
       deferred.reject(existMessage);
    }
  });

  return deferred.promise;
}

/**
 * Supprime un client par son ID
 * @param id
 * @returns {*}
 */
function remove(id){
  var deffered = q.defer();
  Client.remove({_id : id}, function(err, object){
    if(err) deffered.reject(err);
    deffered.resolve(object);
  });
  return deffered.promise;
}
/**
 * Supprime une liste de client par IDs
 * @param ids
 * @returns {*}
 */
function removeAllById(ids){
  var deffered = q.defer();
  var errorMessage = u.errorFormater(ids,'La suppression n\'a pas abouti', u.HTTP_CODE.ERROR);
  var responseMessage = u.responseFormater('La suppression a  abouti');

  Client.remove({_id :{$in:ids}}, function(err, object){
    if(err) deffered.reject(errorMessage);
    responseMessage.data = object;
    deffered.resolve(responseMessage);
  });

  return deffered.promise;
}

exports.save = save;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
exports.remove = remove;
exports.removeAllById = removeAllById;
