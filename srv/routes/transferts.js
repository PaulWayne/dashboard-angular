/**
 * Created by macbookpro on 08/02/16.
 */
var transfertController= require('../controller/transfertController');
var u = require('../util');

exports.configure = function(app) {
    app.get('/api/transferts', u.requestHelper(transfertController.getTransferts));
    app.post('/api/transferts', u.requestHelper(transfertController.saveTransfert));
    app.put('/api/transferts/:id', u.requestHelper(transfertController.updateTransfert));
    app.get('/api/transferts/:id', u.requestHelper(transfertController.findTransfertById));
    app.delete('/api/transferts/:id', u.requestHelper(transfertController.deleteTransfert));
};



