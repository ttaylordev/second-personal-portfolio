angular.module('app').controller('homeCtrl', ['$scope', 'homeSvc', 'mainSvc', function($scope, homeSvc, mainSvc ) {
  
  $scope.homeTest = ('...testing homeCtrl, index.html');
  $scope.svcTest = (homeSvc.homeSvcTest + ' ' + ' ' + mainSvc.mainSvcTest);
  console.log('logging to console', $scope.homeTest, $scope.svcTest);
  $scope.topTest = 'top is loading through the directive into home';
  $scope.middleTest = 'middle is loading through the directive into home';
  $scope.bottomTest = 'bottom is loading through the directive into home';
}]);