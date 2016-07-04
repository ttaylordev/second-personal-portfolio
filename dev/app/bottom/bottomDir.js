angular.module( "app" ).directive( "bottomDir", function () {
  return {
    templateUrl: './../html/bottom/bottom.html',
    controller: 'mainCtrl',
    restrict: 'E'
  };
  
  } );
