/**
 * Created by macbookpro on 06/03/16.
 */
(function(angular) {
  'use strict';
  var module = angular.module('app.clients');
  module.controller('ClientsListController', clientsController);
  clientsController.$inject = ['clients','clientsResource', 'deleteClientModal'];
  function clientsController(clients, clientsResource, deleteClientModal){
    var vm = this;
    vm.clients = clients;
    vm.delete = deleteClientModal.getDeleteMethod(clients);
  }

})(angular);
