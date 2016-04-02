/**
 * Created by macbookpro on 06/03/16.
 */
(function(angular) {
  'use strict';
 var module =  angular.module('app.clients');
   module.factory('clientsResource', clientsResource);

  clientsResource.$inject = ['$resource'];
  function clientsResource($resource){
     return $resource('/api/clients/:id', {id: '@_id'}, {
       update: {
         method:'PUT'
       },
       query:{
         method:'GET',
         isArray: false
       }
     });
  }
})(angular);
