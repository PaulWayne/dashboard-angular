var q = require('q');
var crypto   = require('crypto');

exports.requestHelper = _requestHelper;
exports.hidePassword = _hidePassword;
exports.getRandomValueHex = getRandomValueHex;
exports.getAgenceCode = _getAgenceCode;
exports.createReponseHelper = _createReponseHelper;
exports.getAllReponseHelper = _getAllReponseHelper;
exports.updateReponseHelper = _updateReponseHelper;
exports.getReponseHelper = _getReponseHelper;
exports.isEmptyObject = _isEmptyObject;
exports.errorFormater = _errorFormater;
exports.responseFormater = _responseFormater;
exports.errorFormat = _errorFormat;
exports.HTTP_CODE = {
  CONFLICT: '403',
  OK: '200',
  ERROR:'500',
  BAD_REQUEST:'404',
  CREATED:'201',
  NOT_EXIST:'203'
};
exports.STATUT_TRANSFERT = {
    CREATED : '1',
    ACCEPTED : '2',
    REFUSED : '3',
    CLOSED : '4',
    ABORT : '5'
}

function _requestHelper(func) {
    return function(req, res) {
        return func(req).then(function(data) {
          res.send(data);
        }, function(err) {
          res.status(err.statusCode || 500).send({message: err.message, statusCode:err.statusCode});
        });
    };
}

function _hidePassword(user) {
    var clonedUser = JSON.parse(JSON.stringify(user));  //cloning user object
    delete clonedUser.password;
    return clonedUser;
}

function getRandomValueHex(data){

    return crypto.randomBytes(Math.ceil(data/2))
        .toString('hex')
        .slice(0, data);
}

function _getAgenceCode(agence){
  return agence.nom.substring(0,1)+''+agence.pays.substring(0,1)+''+agence.ville.substring(0,1);
}


function _createReponseHelper(){
  var deffered = q.defer();
  return function (err, object) {
   if(err) deffered.reject(err);
    deffered.resolve({message: object +' a ete bien crée', data: object});
  };
  return deffered.promise;
}
function _updateReponseHelper(){
  var deffered = q.defer();
  return function (err, object) {
   if(err) deffered.reject(err);
    deffered.resolve({message:object+' a ete bien modifié', data: object});
  };
  return deffered.promise;
}
function _getAllReponseHelper(){
  return function (err, objects) {
    return 'iejejieji';
  };
}
function _getReponseHelper(type){
  var deffered = q.defer();
  var message = type ==='D'? ' a été supprimé !' : '';
  return function (err, object) {
   if(err) deffered.reject(err);
    deffered.resolve({message:'L\''+object+''+message, data: object});
    return deffered.promise;
  };
}

/**
 * Cette fonction permet de spliter un attribut en nom+prenom
 * @param data --> la donnée
 * @returns {{nom: *, prenom: *}}
 */
function splitProperties(data){

  var result = data.split(' ');

  var person = {
    nom : result[0],
    prenom : result[1]
  };
  return person;
}
/**
 * Fonction qui verifie si un objet est vide
 * @param obj
 * @returns {boolean}
 * @private
 */
function _isEmptyObject(obj){
  return !Object.keys(obj).length;
}


function _errorFormater(param, message, statusCode){
  var object = {};
  object.param  = param;
  object.message = message;
  object.statusCode = statusCode;
  return object;
}

function _errorFormat(message, statusCode){
  var object = {};
  object.message = message;
  object.statusCode = statusCode;
  return object;
}



function _responseFormater(message, data){
  var object = {};
  object.message = message;
  object.data = data;
  return object;
}
