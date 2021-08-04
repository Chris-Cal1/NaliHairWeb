const mongoose = require('mongoose');


var hairdresserSchema = mongoose.Schema({
    url: String,
    name: String,
    coiffures: String,
    niveauprix: String,
    ville: String,
    description: String,
  });
  
var hairdresserModel = mongoose.model('hairdressers', hairdresserSchema);

module.exports = hairdresserModel