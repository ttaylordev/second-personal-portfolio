angular.module( 'app' )
  .config( [ '$compileProvider', '$stateProvider', '$urlRouterProvider', function ( $compileProvider, $stateProvider, $urlRouterProvider ) {
    // $compileProvider.debugInfoEnabled( false );
    
    $urlRouterProvider.otherwise( '/home' );
    
    var homeState = {
      name: 'home',
      url: '/home',
      templateUrl: './../html/home/home.html',
      controller: 'homeCtrl'
    };
    
    var adminState = {
      name: 'admin',
      url: '/admin',
      templateUrl: './../html/admin/admin.html',
      controller: 'adminCtrl'
    };
    
    
    
    $stateProvider
      .state( homeState )
      .state( adminState );
} ] );