myApp.service('PitcherService', ['$http', 'UserService', function($http, UserService){
    let pitch = this;
    let pitchers = {};
     
    pitch.pitchers = pitchersIn;
    //This GET route will get the pitcher's names and data
    pitch.getPitchers = () => {
        $http.get('/pitchers').then((response) => {
            pitchersIn.data = response.data;
        }).catch((response) => {
            console.log('Error getting pitchers')
        })
    }; //End GET route
    pitch.getPitchers();

}]);