myApp.controller('DialogController', function (UserService, $mdDialog, $interval) {
    console.log('DialogController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObj = UserService.userObj;
    vm.pitchers = [];
    
    vm.populatePitchers = (userObj) => {
       let index = vm.userObj.selectedIndex;
        vm.pitchers = vm.userService.pitchers.data[index];

    }
    vm.populatePitchers();


    vm.updatePitchers = (pitcher) => {
        UserService.updatePitchers(pitcher);
    }
    vm.hide = function() {
        $mdDialog.hide();
    }
});