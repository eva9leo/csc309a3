var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../modules/user');
/* GET users listing. */
router.get('/',function(req, res){
  User.find(function(err, users){
      if(err){
          throw err;
      }
      res.json(users);
  })
});
router.get('/;id', function(req, res) {
  console.log("a");
  User.find({"id": req.params.id}, function (err, user) {
      if(err){
        throw err;
      }
      res.json(user);
  })
});

module.exports = router;
