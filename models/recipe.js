const mongoose = require('mongoose');


var recipeSchema = mongoose.Schema({
    day: Number,
    number: Number,
    title: String,
    url: String,
    name: String,
    bienfaits: String,
    instruction: String,
    ingredients: String,
    coiffure: String,
    nuit: String,
    astuce: String,
    alimentation: String,
  
  });
  
var recipeModel = mongoose.model('recipes', recipeSchema);

module.exports = recipeModel