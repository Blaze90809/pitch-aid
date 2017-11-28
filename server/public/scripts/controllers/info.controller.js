myApp.controller('InfoController', function(UserService, $mdDialog, $interval) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObj = UserService.userObj;

  vm.deletePitchers = (id) => {
    UserService.deletePitchers(id);
    console.log('function');
  }

  vm.showAdvanced = function (ev, i) {
    UserService.userObj.selectedIndex = i;
    console.log('Clicked Dialog', i);
    console.log(vm.userObj.selectedIndex);

    $mdDialog.show({
        controller: 'DialogController as dc',
        templateUrl: '/views/templates/dialog1.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
    })
}

});
