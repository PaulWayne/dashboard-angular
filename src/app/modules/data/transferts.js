(function() {
    'use strict';
    angular
        .module('app.data')
        .factory('transfertsResource', transfertsResource);
    transfertsResource.$inject = ['$resource'];
    function transfertsResource($resource) {
        return $resource('/api/transferts/:id', {id:'@_id'}, {
          update:{
            method: 'PUT'
          },
          query:{
            method: 'GET',
            isArray: false
          }
        });
    }
})();
