/**
 * Created by macbookpro on 18/03/16.
 */
var operateurController = require('../controller/operateurController');
var u = require('../util');
exports.configure = function(app) {
  app.post('/api/operateurs',    u.requestHelper(operateurController.createOperateur));
  app.get('/api/operateurs',     u.requestHelper(operateurController.findAllOperateur));
  app.put('/api/operateurs/:id', u.requestHelper(operateurController.updateOperateur));
  app.get('/api/operateurs/:id', u.requestHelper(operateurController.findOperateur));
  app.delete('/api/operateurs/:id', u.requestHelper(operateurController.deleteOperateur));
};
