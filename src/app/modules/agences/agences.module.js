/**
 * Created by macbookpro on 14/03/16.
 */
(function(angular) {
  'use strict';
 var module = angular.module('app.agences', ['ui.router', 'ngResource', 'app.data', 'app.common']);
  module.config(configModule);

  configModule.$inject = ['$stateProvider'];
  function configModule($stateProvider){
    $stateProvider.state('app.agences',{
      url:'/agences',
      templateUrl:'app/modules/agences/list/agences-list.html',
      controller: 'AgenceListController as vm',
      resolve:{
        data:['agencesResource', function(agencesResource) {
           return agencesResource.query().$promise.then(function(allAgence) {
             return allAgence.data;
           });
        }]
      }
    })
    .state('app.editAgence',{
        url:'/agence/edit/:id',
        templateUrl:'app/modules/agences/edit/agence-edit.html',
        controller:'AgenceEditController as vm',
        resolve:{
          agence:['agencesResource', '$stateParams', function(agencesResource, $stateParams){
              return $stateParams.id ? agencesResource.get({id:$stateParams.id}).$promise.then(function(agence){
                return agence.data;
              }) : {};
          }]
        }
      });

  }

})(angular);
