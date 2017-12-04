var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    contents:{
        type: String,
        required: true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Msg',msgSchema );
