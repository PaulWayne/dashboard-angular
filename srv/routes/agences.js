/**
 * Created by macbookpro on 13/03/16.
 */
var agenceController = require('../controller/agenceController');
var u = require('../util');

exports.configure = function(app) {
  app.get('/api/agences', u.requestHelper(agenceController.findAgences));
  app.get('/api/agences/:id', u.requestHelper(agenceController.findAgenceById));
  app.get('/api/agences/code', u.requestHelper(agenceController.findAgenceByCode));
  app.post('/api/agences/', u.requestHelper(agenceController.createAgence));
  app.delete('/api/agences/:id', u.requestHelper(agenceController.deleteAgence));
  app.put('/api/agences/:id', u.requestHelper(agenceController.updateAgence));
};
