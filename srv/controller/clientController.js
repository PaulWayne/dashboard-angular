/**
 * Controller du modele client.js
 * Cet controller expose la ressource Client
 * @type {*|Object}
 */

var ClientRepository = require('../repository/ClientRepository');
var q = require('q');


/**
 * Ajout d'un client
 * @param req
 * @param res
 */
function createClient(req){
 var object = req.body;
 return ClientRepository.save(object);
}

/**
 * Recuperation de la liste de clients
 * @param req
 * @param res
 */
function findAllClients(){
  return ClientRepository.findAll();
}

/**
 * Recuperation du client par son ID
 * @param req
 * @param res
 */
exports.findClient = function(req){
 var id = req.params.id;
 return ClientRepository.findOne(id);
};

/**
 * Recuperation du client par son Nom
 * @param req
 * @param res
 */
function findClientByName(req, res){

}

function updateClient(req){

}

function deleteClient(req){
 var id = req.params.id;
 return ClientRepository.remove(id);
}

function deleteClients(req){
  var ids = req.params.ids.split(',');
  return ClientRepository.removeAllById(ids);
}

exports.createClient = createClient;
exports.findAllClients = findAllClients;
exports.deleteClients = deleteClients;
exports.deleteClient = deleteClient;
exports.updateClient = updateClient;
exports.findClientByName = findAllClients;


