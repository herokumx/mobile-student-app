angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CafeCtrl', function($scope, $http, $filter) {
  // $http.get('http://legacy.cafebonappetit.com/api/2/menus?cafe=17')
  $http.get('public/menus.json')
    .then(function(res){
      $scope.days = res.data.days;
      $scope.items = res.data.items;
      $scope.cor_icons = res.data.cor_icons;
    });

  $scope.currentMenu = function() {
    if ($scope.days) {
      var found = $filter('filter')($scope.days, {date: "2015-02-11"}, true);
      if (found.length) {
        return found[0].cafes[17].dayparts[0]
      }
    }
  }
})


.controller('ChapelsCtrl', function($scope, $http) {
  $http.get('public/chapels.json')
    .then(function(res){
      $scope.chapels = res.data.events.slice(0,50);
    });

  $scope.formatDate = function(date) {
    date = new Date(date)
    return date.toDateString() + " @ " + date.toLocaleTimeString();
  }
  $scope.formatSpeakers = function(speakers) {
    return speakers.map(function(s){ return s.name; }).join(', ');
  }
})

.controller('ChapelCtrl', function($scope, $stateParams, $http, $filter) {
  $http.get('public/chapels.json')
    .then(function(res){
      // Todo, this should only query by ID. Or use already loaded data
      var chapels = res.data.events.slice(0,50);
      var found = $filter('filter')(chapels, {id: +$stateParams.chapelId}, true);
      if (found.length) {
        $scope.chapel = found[0];
      }
    });

  $scope.speakers = function() {
    $scope.chapel.speakers.join(', ');
  }

  $scope.formatDate = function(date) {
    date = new Date(date)
    return date.toDateString() + " @ " + date.toLocaleTimeString();
  }
  $scope.formatSpeakers = function(speakers) {
    return speakers.map(function(s){ return s.name; }).join(', ');
  }

});
