let express = require('express');
let router = express.Router();
let Pitcher = require('../models/pitchers.js');
let path = require('path');

//This POST route adds pitchers to the database.
router.post('/:userId', function (req, res) {
    if (req.isAuthenticated()) {
        let userId = req.params.userId;

        let name = (req.body.firstname + "-" + req.body.lastname);


        //This function calls the MySportsFeeds API.
        (function (callback) {
            'use strict';

            const httpTransport = require('https');
            const responseEncoding = 'utf8';
            const httpOptions = {
                hostname: 'www.mysportsfeeds.com',
                port: '443',
                path: 'https://www.mysportsfeeds.com/api/feed/v1.0/pull/mlb/2017-regular/cumulative_player_stats.json?player=' + name + '&playerstats=GS,IP,SO,ER,BB,W,L,H',
                method: 'GET',
                headers: { "Authorization": "Basic " + Buffer.from("Blaze90809" + ":" + "Turtle11").toString('base64') }
            };
            httpOptions.headers['User-Agent'] = 'node ' + process.version;

            const request = httpTransport.request(httpOptions, (res) => {
                let responseBufs = [];
                let responseStr = '';

                res.on('data', (chunk) => {
                    if (Buffer.isBuffer(chunk)) {
                        responseBufs.push(chunk);
                    }
                    else {
                        responseStr = responseStr + chunk;
                    }
                }).on('end', () => {
                    responseStr = responseBufs.length > 0 ?
                        Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

                    callback(null, res.statusCode, res.headers, responseStr);
                });

            })
                .setTimeout(0)
                .on('error', (error) => {
                    callback(error);
                });
            request.write("")
            request.end();

            //Logs to check data coming back from MySportsFeeds.
        })((error, statusCode, headers, body) => {
            console.log('ERROR:', error);
            console.log('STATUS:', statusCode);
            console.log('HEADERS:', JSON.stringify(headers));
            console.log('BODY:', body);
            let APIdata = JSON.parse(body);
            addPitcher(APIdata);

        });
        let addPitcher = (body) => {
            let players = body.cumulativeplayerstats.playerstatsentry;
            if (players === undefined) {
                console.log('Pitcher not found');
                res.sendStatus(204);
                return 204;
            }
            res.json(players);

            let inningsPitched = parseFloat()

            let pitcherToSave = {
                name: players[0].player.FirstName + " " + players[0].player.LastName,
                userId: userId,
                statistics: [
                    { inningsPitched: parseFloat(players[0].stats.InningsPitched['#text']) },
                    { starts: parseFloat(players[0].stats.GamesStarted['#text']) },
                    { strikeouts: parseFloat(players[0].stats.PitcherStrikeouts['#text']) },
                    { earnedRuns: parseFloat(players[0].stats.EarnedRunsAllowed['#text']) },
                    { walks: parseFloat(players[0].stats.PitcherWalks['#text']) },
                    { wins: parseFloat(players[0].stats.Wins['#text']) },
                    { losses: parseFloat(players[0].stats.Losses['#text']) },
                    { hits: parseFloat(players[0].stats.HitsAllowed['#text']) }
                ]
            }

            //This adds pitchers to MongoDB.
            Pitcher.create(pitcherToSave, function (err, post) {
                console.log('Create Pitcher');
                if (err) {
                    console.log('Error posting pitcher');
                    res.sendStatus(500);
                } else {
                    console.log('Success posting pitcher');
                }
            })
        }
    } else {

        console.log('not logged in');

        res.sendStatus(403);
    }
});//End POST route.

//This is the delete route for pitchers
router.delete('/delete/:id', function (req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        Pitcher.findByIdAndRemove({ "_id": id }, function (err, data) {
            if (err) {
                console.log('Error with delete route');
                res.sendStatus(500);
            } else {
                res.sendStatus(201)
            }
        })
    } else {

        console.log('not logged in');

        res.sendStatus(403);
    }
}) //End delete route

//This Put route updates pitchers in MongoDB.
router.put('/update/', function (req, res) {
    if (req.isAuthenticated()) {
        //   let pitcher = req.body;
        let idIn = req.body._id;
        let pitcherToSave = {
            name: req.body.name,
            userId: req.body.userId,
            statistics: [
                { inningsPitched: req.body.inningsPitched },
                { starts: req.body.starts },
                { strikeouts: req.body.strikeouts },
                { earnedRuns: req.body.earnedRuns },
                { walks: req.body.walks },
                { wins: req.body.wins },
                { losses: req.body.losses },
                { hits: req.body.hits }
            ]
        }
        // console.log(req.body);

        console.log(pitcherToSave, idIn)
        Pitcher.findByIdAndUpdate(idIn, pitcherToSave, function (err, post) {
            if (err) {
                console.log('Err posting edits');
                res.sendStatus(500);
            } else {
                res.sendStatus(201)
            }
        })
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
}) //End Put route.

module.exports = router;