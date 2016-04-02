var productController  = require('../controller/productController');
var operateurController = require('../controller/operateurController');
var authController     = require('../controller/auth');
var authToken          = require('../controller/authToken');
var transfertController= require('../controller/transfertController');



function getRoutes (router){

// Create endpoint handlers to authentificate
    router.route('/authenticate')
        .post(authToken.authenticate);


//middleware to use for all requests
// router.use(authToken.middleware);

    router.get('/', function(req, res){

        res.json({message : " HELLO AFRICA !"});

    });

//Create endpoint handlers products
    router.route('/produits')
        .post(authController.isAuthenticated, productController.postProducts)
        .get(authController.isAuthenticated, productController.getProducts);

    router.route('/produits/:product_id')
        .put(authController.isAuthenticated, productController.updateProduct)
        .get(authController.isAuthenticated ,productController.getProduct)
        .delete(authController.isAuthenticated ,productController.deleteProduct);

    router.route('/produits-categories/:categorie')
        .get(authController.isAuthenticated, productController.getPorductByCategorie);

//Create endpoint handlers users
    router.route('/users')
            .post(operateurController.postOperateurs)
            .get(operateurController.getOperateurs);

/*
//Create endpoint handlers transfert
    router.route('/transferts')
        .post(transfertController.postTransfert)
        .get(transfertController.getTransferts)
*/
}

exports.routes = getRoutes ;
