angular.module( "app" ).directive( "navDir", function () {
  return {
    templateUrl: './../html/nav/nav.html',
    controller: 'mainCtrl',
    restrict: 'E'
  }
  
  } );
