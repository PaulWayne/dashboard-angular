/**
 * Created by macbookpro on 06/03/16.
 */
(function(angular) {
  'use strict';
  var test = angular.module('app.clients', ['ui.router', 'ngResource', 'app.data', 'app.common']);
  test.config(appConfig);
  appConfig.$inject = ['$stateProvider'];
  function appConfig($stateProvider){
     $stateProvider
       .state('app.clients',{
         url:'/clients',
         templateUrl:'app/modules/clients/list/clients-list.html',
         'resolve': {
           clients: ['clientsResource', function(clientsResource){
             return clientsResource.query().$promise.then(function(allClient) {
               return allClient.data;
             });
           }]
         },
         'controller': 'ClientsListController as vm'
       })
       .state('app.editClient', {
         url:'/client/edit/:id',
         templateUrl:'app/modules/clients/edit/client-edit.html',
         resolve:{
             data:['clientsResource','$stateParams', function(clientsResource, $stateParams){
                return $stateParams.id ? clientsResource.get({id:$stateParams.id}).$promise : {};
             }]
         },
         controller:'ClientEditController as vm'

       });
  }
})(angular);
