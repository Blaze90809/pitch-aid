myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.pitchers = {};
 

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
    console.log(response.data);
    console.log(response.data[0].statistics);
    self.pitchers.data = response.data;
      
  }).catch((response) => {
      console.log('Error getting pitchers')
  })
}; //End GET route
self.getPitchers();

console.log(self.pitchers.data);

    //This route will POST pitchers to MongoDB.
    self.addPitchers = (pitcher) => {
      console.log('Pitcher: ', pitcher);
      $http.post('/addpitch', pitcher).then((response) => {
          console.log('Pitchers added', response);
          self.getPitchers();
      }).catch((response) => {
          console.log('Error adding pitchers.')
      })
  } //End POST route



});