var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render("game", {title: "Statistics", user: req.user })
})

module.exports = router;