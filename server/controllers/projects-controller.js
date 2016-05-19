var projects = require( './../models/Projects' );
module.exports = {

  /** C */
  create: function ( req, res ) {
    console.log( 'PROJECTSCTRL:', req.body );
    projects.create( req.body, function ( err, createProject ) {
      if ( err ) {
        console.error( err );
        return res.status( 500 )
          .json( err );
      }
      res.status( 200 )
        .json( 'CREATEPROJECT:', createProject );
    } )
  },

  /** R */
  read: function ( req, res ) {
    if ( !req.project ) res.status( 401 )
      .send( 'Current Project Undefined' );
    res.status( 200 )
      .json( req.project );
  },

  /** U */
  update: function ( req, res, next ) {
    projects.findByIdAndUpdate( req.params._id, req.body, function ( err, updateProject ) {
      if ( err ) next( err );
      res.status( 200 )
        .send( 'UPDATEPROJECT', updateProject );
    } )
  },

  /** D */
  delete: function ( req, res ) {
    projects.findByIdAndRemove( req.query.id, function ( err, deleteProject ) {
      if ( err ) {
        res.status( 500 )
          .send( err );
      } else {
        res.send( 'DELETEPROJECT', deleteProject );
      }
    } )
  },
};
