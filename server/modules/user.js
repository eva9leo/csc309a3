var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    records:{
        type:[],
        default:[]
    }
});
module.exports = mongoose.model('User',userSchema );

