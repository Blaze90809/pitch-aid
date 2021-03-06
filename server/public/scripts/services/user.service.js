myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.pitchers = { data: [] };
  self.userObj = { selectedIndex: 0 };

  self.getuser = function () {

    $http.get('/user').then(function (response) {

      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        self.userObject.userId = response.data.userId;
       
        self.getPitchers();
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
        self.userObject.userName = ''
        self.userObject.userId = '';
      });
    }


  //This GET route will get the pitcher's names and data
  self.getPitchers = () => {
    // self.pitchers.data = [];

    $http.get('/user/getpitchers').then((response) => {
      pitchers = response.data;
      self.fantasyPoints(pitchers);
    }).catch((response) => {
      console.log('Error getting pitchers')
    })
  }; //End GET route
  
  self.getPitchers();

  //This is the function that calculates total and average fantasy points per pitcher.
  self.fantasyPoints = (pitchers) => {
    for (let i = 0; i < pitchers.length; i++) {
      pitchers[i].name = pitchers[i].name;
      pitchers[i].inningsPitched = pitchers[i].statistics[0].inningsPitched;
      pitchers[i].starts = pitchers[i].statistics[1].starts;
      pitchers[i].strikeouts = pitchers[i].statistics[2].strikeouts;
      pitchers[i].earnedRuns = pitchers[i].statistics[3].earnedRuns;
      pitchers[i].walks = pitchers[i].statistics[4].walks;
      pitchers[i].wins = pitchers[i].statistics[5].wins;
      pitchers[i].losses = pitchers[i].statistics[6].losses;
      pitchers[i].hits = pitchers[i].statistics[7].hits;
      pitchers[i].fantasyPoints = parseFloat((Math.round(((pitchers[i].inningsPitched * 3) + (pitchers[i].wins * 5) + (pitchers[i].hits * -1) + (pitchers[i].earnedRuns * -2) + (pitchers[i].losses * -5) + (pitchers[i].strikeouts * 1) + (pitchers[i].walks * -1)) * 10) / 10).toFixed(1));
      pitchers[i].averagePoints = parseFloat((Math.round((pitchers[i].fantasyPoints / pitchers[i].starts) * 10) / 10).toFixed(1));
      self.pitchers.data = pitchers;
    }
  } //End fantasy pitcher routes.



  //This route will POST pitchers to MongoDB.
  self.addPitchers = (pitcher) => {
    let userId = self.userObject.userId;
    $http.post('/addpitch/' + userId, pitcher).then((response) => {
      self.pitchers.data = [];
      self.getPitchers();
    }).catch((response) => {
      console.log('Error adding pitchers.')
    })
  } //End POST route

  //This function deletes the pitchers from MongoDB.
  self.deletePitchers = (id) => {
    $http.delete('/addpitch/delete/' + id).then((response) => {
      self.getPitchers();
    }).catch(function (error) {
    })
  } //End delete route.

  //This route updates the pitchers stored on MongoDB.
  self.updatePitchers = (pitcher) => {
    $http.put('/addpitch/update/', pitcher).then((response) => {
      self.getPitchers();
    }).catch(function (error) {
      console.log('Update fail');
    })
  } //End PUT route.

}); //End User Service