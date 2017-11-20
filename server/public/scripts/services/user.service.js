myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.pitchers = {data: []};
 

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
      console.log(response)
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
  
  //This GET route will get the pitcher's names and data
self.getPitchers = () => {
  $http.get('/user/getpitchers').then((response) => {
    pitchers = response.data;
    console.log(response.data[0].statistics);
    console.log(response.data[0].statistics[2].strikeouts);
    self.fantasyPoints(pitchers);
  }).catch((response) => {
      console.log('Error getting pitchers')
  })
}; //End GET route
self.getPitchers();

//This is the function that calculates total and average fantasy points per pitcher.
self.fantasyPoints = (pitchers) => {
   for (let i=0; i < pitchers.length; i++){
     console.log(pitchers[i].name)
     pitchers[i].name = pitchers[i].name;
     pitchers[i].inningsPitched = pitchers[i].statistics[0].inningsPitched;
     pitchers[i].starts = pitchers[i].statistics[1].starts;
     pitchers[i].strikeouts = pitchers[i].statistics[2].strikeouts;
     pitchers[i].earnedRuns = pitchers[i].statistics[3].earnedRuns;
     pitchers[i].walks = pitchers[i].statistics[4].walks;
     pitchers[i].wins = pitchers[i].statistics[5].wins;
     pitchers[i].losses = pitchers[i].statistics[6].losses;
     pitchers[i].hits = pitchers[i].statistics[7].hits;
     pitchers[i].fantasyPoints = ((pitchers[i].inningsPitched * 3) + (pitchers[i].wins * 5) + (pitchers[i].hits * -1) + (pitchers[i].earnedRuns * -2) + (pitchers[i].losses * -5) + (pitchers[i].strikeouts * 1) + (pitchers[i].walks * -1));
     pitchers[i].averagePoints = (Math.round((pitchers[i].fantasyPoints / pitchers[i].starts) * 10)/10).toFixed(1);
     self.pitchers.data.push(pitchers[i]);
     console.log(self.pitchers.data);
   }
} //End fantasy pitcher routes.



    //This route will POST pitchers to MongoDB.
    self.addPitchers = (pitcher) => {
      console.log('Pitcher: ', pitcher);
      $http.post('/addpitch', pitcher).then((response) => {
          console.log('Pitchers added', response);
          self.pitchers.data = [];
          self.getPitchers();
      }).catch((response) => {
          console.log('Error adding pitchers.')
      })
  } //End POST route



});