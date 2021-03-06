var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/aboutus', {
      templateUrl: 'views/templates/technologiesused.html',
      // controller: 'AboutController as ac',
      // resolve: {
      //   getuser : function(UserService){
      //     return UserService.getuser();
      //   }
      // }
    })
    // .when('/information', {
    //    templateUrl: '/views/templates/dialog1.html',
    //    controller: 'DialogController as dc',
    // })
    .otherwise({
      redirectTo: 'home'
    });
});
