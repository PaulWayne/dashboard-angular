/**
 * Created by macbookpro on 14/03/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaysSchema = new Schema({
    name : String,
    code : String
});
module.exports = mongoose.model('Pays', PaysSchema);
