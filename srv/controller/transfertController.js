// transfertController.js

var TransfertRepo = require('../repository/TransfertRepository');
var u = require('../util');
var transfert={
  code : null,
  montant : null,
  agenceEnvoi : null,
  agenceReception : null,
  agentEnvoi : null,
  agentReception : null,
  clientEnvoi : null,
  clientReception : null,
  frais : null,
  tva : null,
  statut : null,
  dateCreation : null,
  dateModification : null,
  };


/**
 * Fonction de création d'un transfert
 */
function saveTransfert(req){
    //Set a transfert properties
    transfert.code = u.getRandomValueHex(12);
    transfert.montant = req.body.montant;
    transfert.agenceEnvoi = req.body.agenceEnvoi;
    transfert.agenceReception = req.body.agenceReception;
    transfert.agentEnvoi =   req.body.agentEnvoi;
    transfert.agentReception = req.body.agentReception;
    transfert.clientEnvoi =    req.body.clientEnvoi;
    transfert.clientReception =    req.body.clientReception;
    transfert.frais =    req.body.frais;
    transfert.statut = req.body.statut;
    transfert.total = req.body.total;
    transfert.tva = 19.9;
    transfert.dateCreation = new Date();
    transfert.dateModification = new Date();

    return TransfertRepo.create(transfert);

};


function updateTransfert(req){
  var id = req.params.id;
  transfert.montant = req.body.montant;
  transfert.agenceEnvoi = req.body.agenceEnvoi;
  transfert.agenceReception = req.body.agenceReception;
  transfert.agentEnvoi =   req.body.agentEnvoi;
  transfert.agentReception = req.body.agentReception;
  transfert.clientEnvoi =    req.body.clientEnvoi;
  transfert.clientReception =    req.body.clientReception;
  transfert.frais =    req.body.frais;
  transfert.statut = req.body.statut;
  transfert.total = req.body.total;
  transfert.dateModification = new Date();

  return TransfertRepo.update(id, transfert);
}

/**
 * List all transfert
 */
function findTransferts(){
  return TransfertRepo.findAll();
}
/* One Transfert By Id
 */
function findTransfert(req){
  var id = req.params.id;
  return TransfertRepo.findOne(id);
}


function findTransfertsByAgence(code){
  return TransfertRepo.findByAgence(code);
};

/**
 * Cette fonction permet de supprimer un transfert
 * @param req
 * @param res
 */
function deleteTransfert(req){
  var code = req.params.id;
  return TransfertRepo.remove(code);
}



exports.saveTransfert = saveTransfert;
exports.updateTransfert = updateTransfert;
exports.getTransferts =  findTransferts;
exports.getTransfertsByAgence =  findTransfertsByAgence;
exports.deleteTransfert =  deleteTransfert;
exports.findTransfertById =  findTransfert;
