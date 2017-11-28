let express = require('express');
let router = express.Router();
let Pitcher = require('../models/pitchers.js');
let path = require('path');

router.post('/:userId', function(req, res) {
    let userId = req.params.userId;
    console.log('Adding pitcher', req.body, userId);
    let pitcherToSave = {
       name: req.body.name,
       userId: userId,
       statistics: [
           {inningsPitched: req.body.inningsPitched},
           {starts: req.body.starts },
           {strikeouts: req.body.strikeouts},
           {earnedRuns: req.body.earnedRuns},
           {walks: req.body.walks},
           {wins: req.body.wins},
           {losses: req.body.losses},
           {hits: req.body.hits}
       ]
    }

    Pitcher.create(pitcherToSave, function(err, post){
        console.log('Create Pitcher');
        if(err){
            console.log('Error posting pitcher');
            res.sendStatus(500);
        } else {
            console.log('Success posting pitcher');
            res.sendStatus(201);
        }
    })
  });

  //This is the delete route for pitchers
  router.delete('/delete/:id', function (req, res){
      var id = req.params.id;
      Pitcher.findByIdAndRemove({"_id": id}, function(err, data){
          if(err){
              console.log('Error with delete route');
              res.sendStatus(500);
          } else {
              res.sendStatus(201)
          }
      })
  }) //End delete route

  router.put('/update/', function (req, res){
    //   let pitcher = req.body;
      let idIn = req.body._id;
      let pitcherToSave = {
        name: req.body.name,
        userId: req.body.userId,
        statistics: [
            {inningsPitched: req.body.inningsPitched},
            {starts: req.body.starts },
            {strikeouts: req.body.strikeouts},
            {earnedRuns: req.body.earnedRuns},
            {walks: req.body.walks},
            {wins: req.body.wins},
            {losses: req.body.losses},
            {hits: req.body.hits}
        ]
     }
    // console.log(req.body);

      console.log(pitcherToSave, idIn)
      Pitcher.findByIdAndUpdate(idIn, pitcherToSave, function(err, post){
          if(err){
              console.log('Err posting edits');
              res.sendStatus(500);
          } else {
            res.sendStatus(201)
        }
      })
  })

module.exports = router;