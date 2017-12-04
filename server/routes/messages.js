var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Msg = require('../modules/message');
router.get('/',function(req, res){
    Msg.find({}).sort("-createAt").exec(function(err, msg){
        if(err){
            throw err;
        }
        res.json(msg);
    })
});

router.post('/',function(req, res){
    var msg = req.body;
    if(!msg.title||!msg.contents){
        throw err;
    }
    msg.createAt = Date.now();
    Msg.create(msg, function(err, msg){
        if(err){
            throw err;
        }
        res.json(msg);
    })
});

router.delete('/:id',function(req, res){
    Msg.remove({"_id":req.params.id}, function(err){
        if(err){
            res.json({"success": false});
        }
        res.json({"success": true});
    })
});

module.exports = router;