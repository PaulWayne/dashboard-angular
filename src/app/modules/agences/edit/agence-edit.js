/**
 * Created by macbookpro on 14/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.agences')
    .controller('AgenceEditController', agenceEditController);
  agenceEditController.$inject = ['agence','agencesResource','paysListService', '$state', 'shortHistory', 'notificator'];
  function agenceEditController(agence, agencesResource, paysListService, $state, shortHistory, notificator){
     var vm = this;
     vm.agence = agence;
     vm.pays = paysListService;
     vm.agence.pays = paysListService[93];
     vm.showReturnBtn = vm.agence._id && shortHistory.from.state.name;
     vm.save = function(){
       agencesResource.save(vm.agence, function(agence) {
         if (agence.statusCode == '403') {
           notificator.warning('L\'agence existe dejà !');
         }else {
           shortHistory.goTo('from');
           notificator.success('Le client a été ajouté !!');
         }
       });
     };
    vm.update = function(){
      agencesResource.update(this.agence, function(agence){
        notificator.success('L\'agence a  été modifiée !!');
        shortHistory.goTo('from');
        $state.go('app.agence');
      });
    };
    vm.return = function() {
      $state.go(shortHistory.from.state.name, shortHistory.from.params);
    };
  }
})(angular);
