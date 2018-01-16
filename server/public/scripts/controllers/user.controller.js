myApp.controller('UserController', function(UserService, $mdToast) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.pitchers = UserService.pitchers.data;


  vm.addPitchers = (pitcher) => {
    UserService.addPitchers(pitcher);

    vm.pitcher = null;
  }
  
  vm.showToast = () => {

    $mdToast.show(
      $mdToast.simple()
      .textContent('Listing Sent!')
      .hideDelay(3000)
    )
  }

});