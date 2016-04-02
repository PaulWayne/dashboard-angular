/**
 * Created by macbookpro on 14/03/16.
 */
var Pays = require('../models/pays');
var q = require('q');

function findAll(){
  var deffered = q.defer();
   Pays.find(function (err, pays) {
     if(err) deffered.reject(err);
      deffered.resolve({message: 'La liste des pays', data:pays});
   });
  return deffered.promise;
}

function findPays(id){
  var deffered = q.defer();
  Pays.findById(id, function (err, pays) {
    if(err) deffered.reject(err);
    deffered.resolve({message: 'La liste des pays', data:pays});
  });
  return deffered.promise;
}
function findPaysByCode(code){
  var deffered = q.defer();
  Pays.findOne({code:code}, function (err, pays) {
    if(err) deffered.reject(err);
    deffered.resolve(pays);
  });
  return deffered.promise;
}
exports.findAllPays = findAll;
exports.findPays = findPays;
exports.findPaysByCode = findPaysByCode;

function init(){
  Pays.collection.insert(data);
}

