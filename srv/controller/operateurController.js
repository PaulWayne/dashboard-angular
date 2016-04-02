// Load a model User
var OperateurRepo     = require("../repository/OperateurRepository");
var operateur ={
  username :null,
  password :null,
  nom      :null,
  prenom   :null,
  agence   :null,
  admin    :true
};

//Create endpoint /api/users for POST
function createOperateur(req) {

    //Set user porperties
  operateur.username = req.body.username,
  operateur.password = req.body.password,
  operateur.nom      = req.body.nom,
  operateur.prenom   = req.body.prenom,
  operateur.agence   = req.body.agence
  return OperateurRepo.create(operateur);
}
//Create endpoint /api/users for GET
function findAllOperateur (){
  return OperateurRepo.findAll();
}

function findOperateur(req){
  var id = req.params.id;
  return OperateurRepo.findOne(id);
}
function updateOperateur(req){
    var id = req.params.id;
    operateur.username = req.body.username,
    operateur.password = req.body.password,
    operateur.nom      = req.body.nom,
    operateur.prenom   = req.body.prenom,
    operateur.agence   = req.body.agence;
    return OperateurRepo.update(id, operateur);
}
function deleteOperateur(req){
  var id = req.params.id;
  return OperateurRepo.remove(id);
}
exports.findAllOperateur = findAllOperateur;
exports.createOperateur =  createOperateur;
exports.updateOperateur =  updateOperateur;
exports.findOperateur =    findOperateur;
exports.deleteOperateur =    deleteOperateur;


