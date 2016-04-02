/**
 * Created by macbookpro on 13/03/16.
 */
var agenceRepository = require('../repository/AgenceRepository');
var u = require('../util');
function findAgences(req) {
   if(u.isEmptyObject(req.query)) {
     return agenceRepository.findAll();
   }
  var code = req.query.code;
  return agenceRepository.findByCode(code);
}

function findAgenceById(req) {
  var id = req.params.id;
  return agenceRepository.findOne(id);
}

function createAgence(req) {
  console.log(req.url);
  var agence = {
    nom:req.body.nom,
    pays:req.body.pays,
    ville:req.body.ville,
    code:null
  };
  agence.code = u.getAgenceCode(agence);
  return agenceRepository.save(agence);
}

function updateAgence(req) {
  var id = req.params.id;
  var agence = {
    nom:req.body.nom,
    pays:req.body.pays,
    ville:req.body.ville,
    code: null
  };
  agence.code = u;
  return agenceRepository.update(id, agence);
}

function deleteAgence(req) {
  var id = req.params.id;
  return agenceRepository.delete(id);
}
exports.createAgence = createAgence;
exports.findAgenceById = findAgenceById;
exports.findAgences = findAgences;
exports.updateAgence = updateAgence;
exports.deleteAgence = deleteAgence;

