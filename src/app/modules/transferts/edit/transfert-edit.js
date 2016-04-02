/**
 * Created by macbookpro on 26/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.transferts')
    .controller('TransfertEditController', transfertEditController);

  transfertEditController.$inject = ['transfert', 'notificator', 'shortHistory', 'utilsService', 'initList', 'transfertLogicService'];
  function transfertEditController(transfert, notificator, shortHistory, utilsService, initList, transfertLogicService){
   var vm = this;
   vm.transfert = transfert.data ? transfert.data : {};
   vm.regex = '^(([1-9]*)|(([1-9]*)\.([0-9]*)))$';
   vm.agenceList = initList.agenceList;
   vm.agentList = initList.agentsList;
   vm.clientsList = initList.clientsList;
   vm.statutList = transfertLogicService.getStatut();
   vm.transfertMontantChange = function(){
      vm.transfert.frais =  utilsService.getFrais(vm.transfert.montant);
      vm.transfert.total =   utilsService.getTotal(vm.transfert.montant, vm.transfert.frais);
    }
   init();

    function init(){
      if (utilsService.isEmptyObject(transfert)){
       vm.transfert.montant = 0;
       vm.transfert.statut = transfertLogicService.getStatut()[0];
       vm.transfert.frais = 0;
       vm.transfert.total = 0;
     }else {
        vm.transfert.agenceEnvoi = utilsService.findObjectByCode('code', vm.transfert.agenceEnvoi, vm.agenceList);
        vm.transfert.agenceReception = utilsService.findObjectByCode('code', vm.transfert.agenceReception, vm.agenceList);
        vm.transfert.clientEnvoi = utilsService.findObjectByNameAndFirstName(vm.transfert.clientEnvoi, vm.clientsList);
        vm.transfert.clientReception = utilsService.findObjectByNameAndFirstName(vm.transfert.clientReception, vm.clientsList);
        vm.transfert.agentEnvoi = utilsService.findObjectByNameAndFirstName(vm.transfert.agentEnvoi, vm.agentList);
        vm.transfert.agentReception = utilsService.findObjectByNameAndFirstName(vm.transfert.agentReception, vm.agentList);
      }
  }

  vm.save = function() {
     transfertLogicService.create(vm.transfert).then(function(data){
       notificator.success('le transfert a été bien crée');
       shortHistory.goTo('from');
     }, function(error){
        notificator.warning('la creation n\' pas abouti');
      });
   }

   vm.update = function(){
    transfertLogicService.update(vm.transfert).then(function(data){
      notificator.success('le transfert a été bien modifié');
      shortHistory.goTo('from');
    }, function(error){
      notificator.warning('la modification n\' pas abouti');
    });
   }
  }

})(angular);
