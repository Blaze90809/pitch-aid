myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.pitchers = UserService.pitchers.data;
  console.log(vm.pitchers);

  vm.addPitchers = (pitcher) => {
    UserService.addPitchers(pitcher);
    console.log('Pitcher Added')
  }
  
});