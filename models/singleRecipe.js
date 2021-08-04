const mongoose = require('mongoose');


var singleRecipeSchema = mongoose.Schema({
    url: String,
    name: String,
    bienfaits: String,
    instruction: String,
    ingredients: String,
    type: String,
    benefice: String,
    conservation: String,
    likes: [String],
    dislikes: [String],
    actionLike: String,
    actionDislike: String,
    like: Boolean,
    
  
  });
  
var singleRecipeModel = mongoose.model('singleRecipe', singleRecipeSchema);

module.exports = singleRecipeModel