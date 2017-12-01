var mongoose = require('mongoose');
var Record = require('./record');
var recordSchema = mongoose.model('Record').schema;
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    records:{
        type:[recordSchema],
        default:[]
    }
});
module.exports = mongoose.model('User',userSchema );

