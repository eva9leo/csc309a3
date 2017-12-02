var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../modules/user');
var Record = require('../modules/record');

router.get('/', function(req,res){
    var username = req.query.username;
    var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;
    if(!username||!year||!month||!day){
        throw err;
    }
    User.findOne({"username":username}, function(err, user){
        if(!user){
            res.json([]);

        }else{
            var records = user.records;
            var result =[];
            for(i=0; i<records.length; i++){
                var r = records[i];
                if(r.year === parseInt(year) &&
                    r.month === parseInt(month) &&
                    r.day === parseInt(day)){
                    result.push(r);
                }
            }
            res.json(result);

        }
    })
});

router.post('/', function(req,res){
    var body = req.body;
    var username = req.param("username");
    if(!username||!body.year||!body.month||!body.day){
        throw err;
    }
    User.findOne({"username":username}, function(err, user){
        if(!user){
            res.json({"success":false});
        }else{
            User.update({_id:user._id}, {"$push": {"records":body}},function (err) {
                if(err){
                    console.log("error\n")
                    res.json({"success":false});
                }else{
                    res.json({"success":true});
                }
            })
        }
    })
});

router.delete('/', function(req,res){
    //var id = req.query._id;
    var body = req.body;
    var username = req.param("username");
    if(!username||!body.year||!body.month||!body.day){
        throw err;
    }
    User.findOne({"username":username}, function(err, user){
        if(!user){
            res.json({"success":false});
        }else{
            User.update({_id:user._id}, {"$pull": {"records":body}},function (err) {
                if(err){
                    res.json({"success":false});
                }else{
                    res.json({"success":true});
                }
            })
        }
    })
});

router.put('/', function(req,res){
    var body = req.body;
    console.log(body.serving_number);
    var record = body;
    var username = req.query.username;
    var number = req.query.serving_number;
    record.serving_number = number;
    if(!username||!number||!body.year||!body.month||!body.day){
        throw(err);
    }
    User.update({"username":username,"records":body },{"$set":{"records": record}}, function(err){
        if(err){
            throw err;
        }else{
            res.json(record);
        }
    })
});

module.exports = router;