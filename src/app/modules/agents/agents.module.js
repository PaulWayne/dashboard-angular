/**
 * Created by macbookpro on 20/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.agents', ['ui.router', 'ngResource', 'app.data', 'app.common'])
    .config(agentsConfig);
  agentsConfig.$inject = ['$stateProvider'];
  function agentsConfig($stateProvider){
    $stateProvider
      .state('app.agents',{
        url:'/agents',
        templateUrl: 'app/modules/agents/list/agents-list-tpl.html',
        resolve: {
          agents:['agentsResource', function(agentsResource){
             return agentsResource.query().$promise.then(function(allAgents) {
                 return allAgents.data;
             });
          }]
        },
        controller: 'AgentsController as vm'
      }
    )
    .state('app.editAgent', {
        url:'/agent/edit/:id',
        templateUrl:'app/modules/agents/edit/agent-edit-tpl.html',
        resolve: {
          agent:['agentsResource','$stateParams', function(agentsResource, $stateParams){
            return $stateParams.id ? agentsResource.get({id:$stateParams.id}).$promise : { }
          }]
        },
        controller: 'AgentEditController as vm'
      }
    );
  }
})(angular);
