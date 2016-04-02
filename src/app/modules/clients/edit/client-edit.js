/**
 * Created by macbookpro on 06/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.clients')
  .controller('ClientEditController', ClientEditController);

  ClientEditController.$inject = ['data','clientsResource', '$state', 'shortHistory', 'notificator'];
  function ClientEditController(data, clientsResource, $state, shortHistory, notificator){
      var vm = this;
      vm.client = data;
      vm.client.dateNaissance = new Date(vm.client.dateNaissance);

      vm.save = function(){
      clientsResource.save(this.client, function(client) {
        if (client.statusCode == '403') {
          notificator.warning('Le client existe dejà !');
        }else {
          shortHistory.goTo('from');
          notificator.success('Le client a été ajouté !');
        }
      },function(error){
        if (error.statusCode === '403') {
           console.log(error);
          notificator.warning('Le client existe dejà !');
        }else {
          notificator.warning('La creation n\'a pas abouti');
        }
      });
    };

    vm.update = function(){
      clientsResource.update(this.client, function(client){
        notificator.success('Le client a  été modifiée !!');
        $state.go('app.clients');
      });
    }
  }

})(angular);
