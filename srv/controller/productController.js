//Load required packages

var Product = require('../models/product');

// Create  endpoint /api/products for POST
exports.postProducts = function(req,res){

    //Create a new instance of the Product Model
    var product = new Product();

    //Set the product properties
    product.name = req.body.name;
    product.price = req.body.price;
    product.categorie = req.body.categorie;
    product.description = req.body.description;

    //Save a product and check for errors
    product.save(function(err){
        if(err)
            res.send(err);
        res.json({message : 'product added !' , data : product});
    });

};

// Create  endpoint /api/products for GET
exports.getProducts = function(req,res){
    Product.find(function (err, products) {
        if(err)
           res.send(err);

        res.json({data : products});
    });
};

// Create  endpoint /api/products/:product_id for GET
exports.getProduct = function(req,res){

    console.log("Je suis la !");

    Product.findById(req.params.product_id,function (err, product) {
        if(err)
            res.send(err);

        res.json({data : product});
    });

};

// Create  endpoint /api/products/:product_id for UPDATE
exports.updateProduct = function(req,res){
    Product.findById(req.params.id, function(err,product){
        if(err)
          res.send(err);

        product.name = req.body.name;

        //save product
        product.save(function(req,res){
            if(err)
                res.send(err);

            res.json({message : 'product updated !', data : product});
        });

    });
};

// Create  endpoint /api/products/:product_id for DELETE
exports.deleteProduct = function(req,res){
    Product.remove({_id : req.params.id}, function(err,product){
        if(err)
           res.send(err);

        res.json({message : 'product removed !', data : product});
    });
};


//exports endpoint /api/products/categories/:categorie
exports.getPorductByCategorie = function (req, res) {

    Product.find({categorie : req.params.categorie}, function (err, users) {

        if(err) return res.send(err);

         res.json(users);
    });

};





