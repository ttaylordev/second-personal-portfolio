angular.module( "app" ).directive( "blSecDir", function () {
  return {
    templateUrl: './../html/blocks-section/bl-sec.html',
    controller: 'mainCtrl',
    restrict: 'E'
  };
  
  } );
