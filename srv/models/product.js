// product.js

var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
    name  : String,
    price : Number,
    description : String,
    categorie  : {},
    photo : []
});

module.exports = mongoose.model('Product',ProductSchema);