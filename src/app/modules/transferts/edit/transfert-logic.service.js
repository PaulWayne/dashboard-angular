/**
 * Created by macbookpro on 29/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.transferts')
  .factory('transfertLogicService', transfertLogicService);

  transfertLogicService.$inject = ['transfertsResource','agencesResource','agentsResource', 'clientsResource', '$q'];
  function transfertLogicService(transfertsResource, agencesResource, agentsResource, clientsResource, $q) {

    var instance = {
      initLoad: initLoad,
      create: _create,
      update: _update,
      getStatut: _getStatut
    };
    function _create(transfert){
     var object = {};
     var deferred = $q.defer();
     object.montant = transfert.montant;
     object.agenceEnvoi = transfert.agenceEnvoi.code;
     object.agenceReception = transfert.agenceReception.code;
     object.clientEnvoi =    _getPersonObject(transfert.clientEnvoi);
     object.clientReception =    _getPersonObject(transfert.clientReception);
     object.agentEnvoi =    _getPersonObject(transfert.agentEnvoi);
     object.agentReception =    _getPersonObject(transfert.agentReception);
     object.frais =     transfert.frais;
     object.total =     transfert.total;
     object.statut =  transfert.statut;
     transfertsResource.save(object, function(data) {
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });
       return deferred.promise;
    }

    function _update(transfert){
      var deffered = $q.defer();
      var object = _getTransfertForEdition(transfert);
      console.log(object);
      transfertsResource.update(object, function(data){
        deffered.resolve(data);
      }, function(error){
        deffered.reject(error);
      });
      return deffered.promise;
    }
    function initLoad() {
      var deffered = $q.defer();
      var agencesResourcePromise = agencesResource.query().$promise;
      var agentsResourcePromise = agentsResource.query().$promise;
      var clientsResourcePromise = clientsResource.query().$promise;
      $q.all([agencesResourcePromise, agentsResourcePromise, clientsResourcePromise]).then(function(data){
        deffered.resolve({
           agenceList: data[0].data,
           agentsList: data[1].data,
           clientsList: data[2].data
         });
      }).catch(function(err) {
        deffered.reject(err);
      });
      return deffered.promise;
    }

    function _getPersonObject(object){
      var person = {
        nom: null,
        prenom: null
      }

      if (object !== undefined){
        person.nom = object.nom;
        person.prenom = object.prenom;
      }
      return person;
    }
    function _getStatut(){
      return [
        'CREATED',
        'ACCEPTED',
        'REFUSED',
        'CLOSED',
        'ABORT'
      ];
    }
    function _getTransfertForEdition(transfert){
      var object = {};
      if (transfert._id) {
        object._id = transfert._id;
        object.code = transfert.code;
      }
      object.montant = transfert.montant;
      object.agenceEnvoi = transfert.agenceEnvoi.code;
      object.agenceReception = transfert.agenceReception.code;
      object.clientEnvoi =    _getPersonObject(transfert.clientEnvoi);
      object.clientReception =    _getPersonObject(transfert.clientReception);
      object.agentEnvoi =    _getPersonObject(transfert.agentEnvoi);
      object.agentReception =    _getPersonObject(transfert.agentReception);
      object.frais =     transfert.frais;
      object.total =     transfert.total;
      object.statut =   transfert.statut;

      return object;
    }
    return instance;

  }
})(angular);
