/**
 * Created by macbookpro on 05/03/16.
 */
var clientController = require('../controller/clientController');
var u = require('../util');

exports.configure = function(app) {
  app.get('/api/clients', u.requestHelper(clientController.findAllClients));
  app.post('/api/clients', u.requestHelper(clientController.createClient));
  app.put('/api/clients/:id', u.requestHelper(clientController.updateClient));
  app.get('/api/clients/:id', u.requestHelper(clientController.findClient));
 // app.delete('/api/clients/:ids', clientController.deleteClients);
  app.delete('/api/clients/:id', u.requestHelper(clientController.deleteClient));
};

