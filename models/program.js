const mongoose = require('mongoose');


var programSchema = mongoose.Schema({
    number: Number,
    urld1: String,
    urld2: String,
    urld3: String,
    urld4: String,
    urld5: String,
    urld6: String,
    urld7: String,
    name: String,
    desc: String,
    ingredientjour1: String,
    ingredientjour2: String,
    ingredientjour3: String,
    ingredientjour4: String,
    ingredientjour5: String,
    ingredientjour6: String,
    ingredientjour7: String,
  
  });
  
var programModel = mongoose.model('programs', programSchema);

module.exports = programModel