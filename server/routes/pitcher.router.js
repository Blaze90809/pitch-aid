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

module.exports = router;