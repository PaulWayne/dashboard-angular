/**
 * Created by macbookpro on 08/02/16.
 */
(function() {
    'use strict';
    var module = angular.module('app.transferts', ['ui.router', 'ngResource', 'app.data', 'app.common']);

    module.config(appConfig);
    appConfig.$inject = ['$stateProvider'];
    function appConfig($stateProvider){
      $stateProvider
          .state('app.transferts',{
            url:'/transferts',
            templateUrl:'app/modules/transferts/list/transferts-list.html',
            'resolve': {
                transferts: ['transfertsResource', function(transfertsResource){
                    return transfertsResource.query().$promise.then(function(allTransfert) {
                        return allTransfert.data;
                    });
                }]
            },
            'controller': 'TransfertsListController as vm'

        })
        .state('app.editTransfert', {
          url:'/transfert/edit/:id',
          templateUrl: 'app/modules/transferts/edit/transfert-edit.html',
          'resolve':{
            transfert:['transfertsResource','$stateParams', function(transfertsResource, $stateParams){
              return $stateParams.id ? transfertsResource.get({id: $stateParams.id}).$promise : {};
            }],
            initList:['transfertLogicService', function(transfertLogicService){
              return transfertLogicService.initLoad().then(function(data){
                return data;
              });
            }]
          },
          'controller': 'TransfertEditController as vm'
        });
    }
})();
