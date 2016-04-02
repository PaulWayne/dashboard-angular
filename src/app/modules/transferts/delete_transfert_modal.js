(function() {
  'use strict';

  var module = angular.module('app.transferts');

  module.service('deleteTransfertModal', deleteTransfertModal);

  deleteTransfertModal.$inject = ['transfertsResource', 'commonModal', 'notificator'];
  function deleteTransfertModal(transfertsResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Annuler',
      actionButtonText: 'Supprimer',
      headerText: 'Confirmer la suppression de la transaction',
      bodyText: 'La Transaction  sera supprimée definitivement, voulez-vous continuer ?'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(transferts) {
      return function(transfert) {
        commonModal.show(that.modalDefaults,that.modalOptions).then(function() {
          transfertsResource.delete({id: transfert.code}, function() {
            var index = transferts.indexOf(transfert);
            transferts.splice(index,1);
            notificator.success('Transfert was successfully deleted')
          });
        });
      };
    }
  }
})();
