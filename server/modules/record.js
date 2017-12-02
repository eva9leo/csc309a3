var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({
    year:{
        type: Number,
        required: true
    },
    month:{
        type: Number,
        required: true,
        min:1,
        max: 12
    },
    day:{
        type: Number,
        required: true,
        min:1,
        max: 31
    },
    name:{
        type: String,
        required: true
    },
    ndbno:{
        type: Number,
        required: true
    },
    serving_number:{
        type: Number,
        required: true
    },
    serving_size:{
        type: Number,
    },
    serving_unit:{
        type: String,
    },
    energy:{
        type: Number,
    },
    protein:{
        type: Number,
    },
    fat:{
        type: Number,
    },
    carb:{
        type: Number,
    }
});
module.exports = mongoose.model('Record',recordSchema );