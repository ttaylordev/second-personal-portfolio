angular.module( "app" )
  .service( "mainSvc", function () {

    this.mainSvcTest = '...mainSvc';

// ### --- Project and project can be replaced with whichever the index.js post, put, delete, get require as the '/urlhash'. --- ### \\\

const baseUrl = '/project';

    this.getProjects = function () {
      return $http( {
          method: 'GET',
          url: baseUrl
        } )
        .then( function ( response ) {
          return response;
        } );
    };
    // singular project
    this.getProject = function ( id ) {
      return $http( {
        method: 'GET',
        url: '/project?_id=' + id
      } );
    };

    this.postProject = function ( project ) {
      return $http( {
          method: 'POST',
          url: baseUrl,
          data: project
        } )
        .then( function ( response ) {
          return response;
        } );
    };

    this.editProject = function ( id, project ) {
      return $http( {
          method: 'PUT',
          url: "/project/" + id,
          data: project
        } )
        .then( function ( response ) {
          return response;
        } );
    };

    this.deleteProject = function ( id ) {
      return $http( {
          method: 'DELETE',
          url: '/project/' + id
        } )
        .then( function ( response ) {
          return response;
        } );
    };

  } );
