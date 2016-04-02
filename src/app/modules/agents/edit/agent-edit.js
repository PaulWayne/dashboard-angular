/**
 * Created by macbookpro on 20/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.agents')
    .controller('AgentEditController',agentEditController);
  agentEditController.$inject = ['agent', 'agentsResource', 'notificator', 'shortHistory'];
  function agentEditController(agent, agentsResource, notificator, shortHistory){
   var vm = this;
   vm.agent= agent.data;
   vm.save = function(){
     agentsResource.save(vm.agent, function(agent){
       if (agent.statusCode == '403') {
         notificator.warning('L\'agent existe dejà !');
       }else {
         shortHistory.goTo('from');
         notificator.success('L\'agent a été ajouté !!');
       }
     });
    }
   vm.update = function(){
     agentsResource.update(vm.agent, function(agent){
       notificator.success('L\'agent a  été modifiée !!');
       shortHistory.goTo('from');
     });
   }
  }
})(angular);
