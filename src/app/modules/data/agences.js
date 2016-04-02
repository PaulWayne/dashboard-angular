/**
 * Created by macbookpro on 14/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.data')
    .factory('agencesResource', agencesResource);

  agencesResource.$inject = ['$resource'];

  function agencesResource($resource){
    var resource = $resource('/api/agences/:id', {id:'@_id'}, {
    update:{
      method:'PUT'
    },
    query: {
      method:'GET', isArray:false
    }
    });
    return resource;
  }
})(angular);
