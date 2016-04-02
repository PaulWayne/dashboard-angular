/**
 * Created by macbookpro on 08/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.clients')
    .service('deleteClientModal', deleteClientModal);

  deleteClientModal.$inject = ['clientsResource', 'commonModal', 'notificator'];

  function deleteClientModal(clientsResource, commonModal, notificator){
    var vm = this;
    this.modalOptions = {
      closeButtonText: 'Annuler',
      actionButtonText: 'Supprimer',
      headerText: 'Confirmer la suppression du client',
      bodyText: 'Le client  sera supprimée definitivement, voulez-vous continuer ?'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(clients) {
      return function(client) {
        commonModal.show(vm.modalDefaults,vm.modalOptions).then(function() {
          clientsResource.delete({id: client._id}, function() {
            var index = clients.indexOf(client);
            clients.splice(index,1);
            notificator.success('Le client a été bien supprimé !!');
          });
        });
      };
    }
  }
})(angular);
