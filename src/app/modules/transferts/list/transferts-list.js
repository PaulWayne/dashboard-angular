/**
 * Created by macbookpro on 08/02/16.
 */
(function() {
    'use strict';
    var module = angular.module('app.transferts');
    module.controller('TransfertsListController', transfertsListController);

    transfertsListController.$inject = ['transferts', 'deleteTransfertModal'];

    function transfertsListController(transferts, deleteTransfertModal){
        var vm = this;
        vm.transferts = transferts;
        vm.delete = deleteTransfertModal.getDeleteMethod(transferts);
    }
})();

