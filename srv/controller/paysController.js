/**
 * Created by macbookpro on 14/03/16.
 */
var paysRepository = require('../repository/PaysRepository');

function findAllPays() {
  return paysRepository.findAllPays();
}

function findPays(req) {
  var id = req.params.id;
  return paysRepository.findPays(id);
}

function findPaysByCode(req) {
  var code = req.params.code;
  return paysRepository.findPaysByCode(code);
}

exports.findAllPays = findAllPays;
exports.findPays = findPays;
exports.findPaysByCode = findPaysByCode;
