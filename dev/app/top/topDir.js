angular.module( "app" ).directive( "topDir", function () {
  return {
    templateUrl: './../html/top/top.html',
    controller: 'homeCtrl',
    restrict: 'E'
  };
  
  } );
