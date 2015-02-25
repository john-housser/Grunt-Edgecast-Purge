/*
 * grunt-edgecast-purge
 * https://github.com/housserj/grunt-edgecast-purge
 *
 * Copyright (c) 2015 John Housser
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function ( grunt ) {
  var http = require( 'http' ),
    async = require('async');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask( 'edgecast_purge', 'Purge files from the Edgecast CDN', function () {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options( {
      host: 'api.edgecast.com',
      port: 80,
      method: 'PUT'
    } );

    var reqOptions = {
      host: options.host,
      port: options.port,
      path: '/v2/mcc/customers/' + options.customer + '/edge/purge',
      method: options.method,
      headers: {
        'Authorization': options.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': 'api.edgecast.com'
      }
    };

    this.files.forEach( function ( f ) {
      if ( ! f.src.length ) {
        return grunt.fail.warn( 'No source files were found.' );
      }

      async.eachSeries(f.src,
        function(filepath, callback){

          var postData = JSON.stringify({
            "MediaPath": options.edgeCNAME + filepath,
            "MediaType": options.mediaType
          });

          var req = http.request( reqOptions, function ( res ) {
            res.setEncoding( 'utf8' );
            res.on( 'data', function ( chunk ) {
              // Don't want to actually log anything here, but the request doesn't seem to work without this function???
              //grunt.log.writeln( 'BODY: ' + chunk );
            } );
            res.on('end', function () {
              grunt.log.writeln( 'File ' + filepath + ' processed, response code: ' + res.statusCode );
              //done(res.statusCode);
              callback();
            });
          } );

          req.on( 'error', function ( e ) {
            grunt.log.writeln( 'problem with request: ' + e.message );
          } );

          // write data to request body
          req.write( postData );
          req.end();

        },
        function(err){
          if (err) {
            grunt.log.error(err);
          }
          done(err);
        }
      );


      f.src
        .forEach( function ( filepath ) {

        } );
    } );


  } );

};
