/**
 * Created by macbookpro on 20/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.data')
    .factory('agentsResource', agentsResource);
  agentsResource.$inject= ['$resource'];
  function agentsResource($resource){
    return $resource('/api/operateurs/:id', {id:'@_id'}, {
      update:{
        method: 'PUT'
      },
      query:{
        method: 'GET',
        isArray: false
      }
     });
  }
})(angular);
