const mongoose = require('mongoose');


var routineSchema = mongoose.Schema({
    types: [String],
    likes: [String],
    likes1: [String],
    likes2: [String],
    likes3: [String],
    likes4: [String],
    dislikes: [String],
    dislikes1: [String],
    dislikes2: [String],
    dislikes3: [String],
    name: String,
    name1: String,
    name2: String,
    name3: String,
    description: String,
    description1: String,
    description2: String,
    description3: String,
    duree: String,
    url: String,
    url1: String,
    url2: String,
    url3: String,
    
  });
  
var routineModel = mongoose.model('routines', routineSchema);

module.exports = routineModel