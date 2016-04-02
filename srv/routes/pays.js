/**
 * Created by macbookpro on 15/03/16.
 */
var paysController = require('../controller/paysController');
var u = require('../util');
exports.configure = function(app) {
  app.get('/api/pays', u.requestHelper(paysController.findAllPays));
  app.get('/api/pays/:id', u.requestHelper(paysController.findPays));
  app.get('/api/pays/:code', u.requestHelper(paysController.findPaysByCode));
};
