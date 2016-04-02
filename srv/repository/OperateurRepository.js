/**
 * Created by macbookpro on 18/03/16.
 */
var Operateur = require('../models/operateur');
var q = require('q');
var u = require('../util');

function create(object) {
  var operateur = new Operateur();
  var deffered = q.defer();
  operateur.username = object.username;
  operateur.password = object.password;
  operateur.nom = object.nom;
  operateur.prenom = object.prenom;
  operateur.agence = object.agence;
  operateur.admin = object.admin;
  if (!isExist(operateur)) {
    operateur.save(function (err, operateur) {
      if (err) deffered.reject(err);
      deffered.resolve({message: 'l\'operateur a été crée !', data: operateur});
    });
  } else {
    var err = {
      message: 'l\'operateur existe déjà!',
      statusCode: u.HTTP_CODE.CONFLICT
    };
    deffered.reject(err);
  }
  return deffered.promise;
}


function update(id, operateur){
  var deffered = q.defer();
  return Operateur.findById(id, function(err, object){
    if(err) deffered.reject(err);
    console.log(object);
    if (object !== null){
        object.username = operateur.username;
        object.password = operateur.password;
        object.nom      = operateur.nom;
        object.prenom   = operateur.prenom;
        object.agence   = operateur.agence;

        object.save(function(err, data){
          if(err) deffered.reject(err);
          deffered.resolve(data);
        });
    }else{
      deffered.reject({message : 'agent n\'existe deja', statusCode: u.HTTP_CODE.CONFLICT});
    }
  });
  return deffered.promise;
}

function findAll(){
  var deffered = q.defer();
   Operateur.find(function(err, objects){
   if(err) deffered.reject(err);
     deffered.resolve({message:'La liste des operateurs', data: objects});
   });
  return deffered.promise;
}


function findOne(id){
 var deffered = q.defer();
 Operateur.findById(id, function(err, agent){
   if(err) deffered.reject(err);
   deffered.resolve({message:'l\'agent',data:agent});
 });
 return deffered.promise;
}

function findByAgence(code){

}

function remove(id){
  return Operateur.remove({_id :id});
}
function isExist(operateur){
   return Operateur.findOne({nom: operateur.nom, prenom: operateur.prenom, username: operateur.username}, function(err, ope){
     var result = false;
      if(!err && ope)  result = true;
       return result;
   });

}

exports.findAll = findAll;
exports.create = create;
exports.findOne = findOne;
exports.update = update;
exports.remove = remove;

