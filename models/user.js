const mongoose = require('mongoose');


var photoSchema = mongoose.Schema({
    comment: String,
    date: Date,
    url: String,
    check: Boolean,
   
  });


var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String,
    photo: [photoSchema],
    likes: [Number],
    likes1: [Number],
    likes2: [Number],
    likes3: [Number],
    likes4: [Number],
    dislikes: [String],
    dislikes1: [String],
    dislikes2: [String],
    
  });
  
var userModel = mongoose.model('users', userSchema);


module.exports = userModel