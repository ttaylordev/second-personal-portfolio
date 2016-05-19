var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectsSchema = new Schema({

    desc: { type: String }
});

module.exports = mongoose.model('Projects', ProjectsSchema);