myApp.controller('InfoController', function(UserService, $mdDialog, $interval) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObj = UserService.userObj;

  vm.deletePitchers = (id) => {
    UserService.deletePitchers(id);

  }

  vm.showAdvanced = function (ev, i) {
    UserService.userObj.selectedIndex = i;


    $mdDialog.show({
        controller: 'DialogController as dc',
        templateUrl: '/views/templates/dialog1.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
    })
}

});
