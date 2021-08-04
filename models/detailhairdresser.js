const mongoose = require('mongoose');


var detailhairdresserSchema = mongoose.Schema({
    url: String,
    name: String,
    coiffures: String,
    niveauprix: String,
    ville: String,
    description: String,
    avis: String
  });
  
var detailhairdresserModel = mongoose.model('detailhairdressers', detailhairdresserSchema);

module.exports = detailhairdresserModel