/**
 * Created by macbookpro on 20/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.agents')
    .controller('AgentsController',agentsController);

  agentsController.$inject = ['agents', 'agentsResource'];
  function agentsController(agents, agentsResource){
    var vm = this;
    vm.agents = agents;
    vm.delete = function() {

    }
  }
})(angular);
