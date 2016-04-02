/**
 * Created by macbookpro on 14/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.agences')
    .controller('AgenceListController', agenceListController);
  agenceListController.$inject = ['data'];

  function agenceListController(data){
    var vm = this;
    vm.agences = data;
    vm.delete = function(){

    }
  }
})(angular);
