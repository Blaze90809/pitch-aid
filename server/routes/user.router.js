var express = require('express');
var router = express.Router();
var Pitchers = require('../models/pitchers.js');
var path = require('path');
var userIdIn;
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  userIdIn = '';
  console.log('get /user route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username,
      userId: req.user._id
    };
    userIdIn = req.user._id;
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.sendStatus(403);
  }
});

//This route will get pitchers from the DB.
router.get('/getpitchers', function (req, res) {
  // console.log('Get pitchers', userIdIn);
  if (req.isAuthenticated()) {
    Pitchers.find({ userId: userIdIn }, function (err, pitchers) {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log('Got pitchers: ', pitchers)
        res.send(pitchers);
      }
    })
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');

    res.sendStatus(403);
  }
}); //End Pitchers route.

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
