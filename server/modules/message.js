var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    contents:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Msg',msgSchema );
