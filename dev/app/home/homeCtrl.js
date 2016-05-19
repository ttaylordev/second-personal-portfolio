angular.module('app').controller('homeCtrl', ['$scope', 'homeSvc', 'mainSvc', function($scope, homeSvc, mainSvc ) {
  
  $scope.homeTest = ('...testing homeCtrl, index.html');
  $scope.svcTest = (homeSvc.homeSvcTest + ' ' + ' ' + mainSvc.mainSvcTest);
  console.log('logging to console', $scope.homeTest, $scope.svcTest);
}]);