angular.module("app").controller("adminCtrl", ['$scope',  'adminSvc', 'mainSvc', function($scope, adminSvc, mainSvc ) {
  
  $scope.adminTest = ('...testing adminCtrl, index.html');
  $scope.svcTest = (adminSvc.adminSvcTest + ' ' + ' ' + mainSvc.mainSvcTest);
  console.log('logging to console', $scope.adminTest, $scope.svcTest);
}]);