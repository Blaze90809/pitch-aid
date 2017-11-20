var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//This Schema determines the statistics we will list for the pitchers.
let StatisticsSchema = new Schema({
    date: { type: Date, default: Date.now },
    inningsPitched: Number,
    starts: Number,
    strikeouts: Number,
    earnedRuns: Number,
    walks: Number,
    wins: Number,
    losses: Number,
    hits: Number
})

//This Schema will store the pitchers' information.
let PitchersSchema = new Schema({
    name: {type: String, required: true},
    statistics: [StatisticsSchema]
})

let Pitcher = mongoose.model('Pitcher', PitchersSchema);

module.exports = Pitcher;