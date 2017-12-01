var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../modules/user');
var db = mongoose.connection;
/* GET users listing. */
router.get('/',function(req, res){
  User.find(function(err, users){
      if(err){
          throw err;
      }
      res.json(users);
  })
});
router.post("/", function (req, res) {
    var new_user = req.body;
    if(!new_user.username||!new_user.password){

      throw err;
    }
    User.create(new_user, function (err, user) {
        if(err){
            throw err;
        }
        res.json(user);
    })
});
router.get('/user', function(req, res) {
  var username = req.param("username");
  User.findOne({"username": username},"username password", function (err, doc) {
      if(err){
        throw err;
      }
      res.json(doc);
  })
});

router.delete('/',function(req, res){
    User.remove({}, function(err){
        if(err){
            throw err;
        }
        res.json({"success": true});
    })
});
module.exports = router;
