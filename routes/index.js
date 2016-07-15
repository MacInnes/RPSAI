var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Hands = require('../models/hands');
var router = express.Router();
var db = require('../db');
var connection = db.connect();
var hands = connection.collection('hands');





router.get('/', function (req, res) {
    res.render('index', { user : req.user, title: "Rock Paper Scissors" });
});

router.get("/about", function (req, res) {
    res.render("about", {user: req.user, title: "About RPS"})
})

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    console.log("HANDS FROM INDEX", hands);
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {

            return res.redirect( {info: "Sorry. That username already exists. Try again."}, "/");
        }

        passport.authenticate('local')(req, res, function () {
            hands.insert({user: req.body.username}, function(){
                res.redirect('/game');
            })
        });
    });
    
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/game');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;