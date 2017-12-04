var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../modules/user');
var Record = require('../modules/record');

router.get('/', function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;
    if(!username||!year||!month||!day){
        throw err;
    }
    User.findOne({"username":username, "password":password}, null, {sort:{"createAt":1}},function(err, user){
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
    var username = req.query.username;
    var password = req.query.password;
    if(!username||!password||!body.year||!body.month||!body.day||!body.ndbno||!body.serving_number){
        throw err;
    }
    User.findOne({"username":username, "password":password}, function(err, user){
        if(!user){
            res.json(null);
        }else{
            var record = new Record(body);
            record.createAt = Date.now();
            User.update({_id:user._id}, {"$push": {"records":record}},function (err) {
                if(err){
                    res.json(null);
                }else{
                    res.json(record);
                }
            })
        }
    })
});

router.delete('/', function(req,res){

    var username = req.query.username;
    var password = req.query.password;
    var id = req.query._id;
    if(!username||!id||!password){
        res.json({"success":false});
    }
    User.findOneAndUpdate({"username":username,  "password":password},
        {"$pull":{"records":{"_id":id}}},{new:true},function (err,doc) {
            if(err){
                res.json({"success":false});
            }
            res.json(doc);
        })
});

router.put('/', function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    var number = req.query.serving_number;
    var id = req.query._id;
    if(!username||!number||!id||!password){
        res.json({"success":false});
    }

    User.findOneAndUpdate({"username":username, "password":password, "records._id":id},
        {"$set":{"records.$.serving_number":number}},function (err) {
        if(err){
            res.json({"success":false});
        }
            res.json({"success":true});
    })
});

module.exports = router;