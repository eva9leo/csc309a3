var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Msg = require('../modules/message');
router.get('/',function(req, res){
    Msg.find(function(err, msg){
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
    Msg.create(req.body, function(err, msg){
        if(err){
            throw err;
        }
        res.json(msg);
    })
});

router.delete('/1234',function(req, res){
    Msg.remove({}, function(err){
        if(err){
            throw err;
        }
        res.json({"success": true});
    })
});

module.exports = router;