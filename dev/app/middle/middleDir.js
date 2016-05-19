angular.module( "app" ).directive( "middleDir", function () {
  return {
    templateUrl: './../html/middle/middle.html',
    controller: 'homeCtrl',
    restrict: 'E'
  }
  
  } );
