/**
 * Created by macbookpro on 13/03/16.
 */
var Agence = require('../models/agence');
var q = require('q');
var u = require('../util');
var model = {
   message : 'L\'agence(s) n\'exixte pas',
   data : null,
   statusCode: u.HTTP_CODE.NOT_EXIST
}

function create(newAgence){
  var deferred = q.defer();
  Agence.findOne({nom:newAgence.nom}, function (err, agen) {
  if(!agen){
    var agence = new Agence();

    agence.code  = newAgence.code;
    agence.nom   = newAgence.nom;
    agence.pays  = newAgence.pays;
    agence.ville = newAgence.ville;

    agence.save(function(err, agence){
      if(err)   deferred.reject (err);
      deferred.resolve({message:'L\'agence a été crée', data:agence});
    });
  }else{
      if(!err){
        err = {
          message : 'L\'agence existe dejà !',
          statusCode : '403'
        };
        deferred.reject(err);
      }

     }
   });
  return deferred.promise;
}
function update(id, agence){
  var deffered = q.defer();
   Agence.findById(id, function(err, oldAgence){

     oldAgence.nom = agence.nom;
     oldAgence.pays = agence.pays;
     oldAgence.ville = agence.ville;

     oldAgence.save(function(err, agence){
       if(err) deferred.reject(err);
       deffered.resolve({message:'L\'agence a été modifiée', data:agence});
     });
   });
   return deffered.promise;
}

function findAll(){
  var deferred = q.defer();
 Agence.find(function(err, agences){
   if(err) deferred.reject(err);
   deferred.resolve({message:'La liste des agences!', data:agences});
  });
  return deferred.promise;
}

function findOne(id){
  var deferred = q.defer();
  Agence.findById(id, function(err, agence){
     if(err) deferred.reject(err);
    if(agence === undefined){
       model.message ='L\'agence';
       model.statusCode = u.HTTP_CODE.OK
     }
     deferred.resolve(model);
  });
  return deferred.promise;
}
function findByCode(code){
  var deferred = q.defer();
  Agence.find({code : code}, function(err, agence){
    if(agence.length) {
      model.message = 'L\'agence';
      model.data = agence;
      model.statusCode = u.HTTP_CODE.OK;
    }
    deferred.resolve(model);
  });
  return deferred.promise;
}


function remove(id){
  return Agence.remove({_id:id}, u.getReponseHelper('D'));
}

exports.save = create;
exports.findOne = findOne;
exports.findByCode = findByCode;
exports.findAll = findAll;
exports.update = update;
exports.delete = remove;
