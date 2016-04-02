(function() {
  'use strict';

  var module = angular.module('app.dashboard', ['ui.router', 'ngResource', 'app.data']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/dashboard/dashboard.html',
        resolve: {
          posts: ['postResource', function(postResource) {
            return postResource.query().$promise;
          }],

          transferts: ['transfertsResource', function(transfertsResource) {
            return transfertsResource.query().$promise;
          }],
          clients: ['clientsResource', function(clientsResource){
            return clientsResource.query().$promise;
          }]
        },
        controller: 'dashboardController',
        controllerAs: 'vm'
      })
  }
})();
