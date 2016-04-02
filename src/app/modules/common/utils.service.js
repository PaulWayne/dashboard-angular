/**
 * Created by macbookpro on 26/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.common')
    .factory('utilsService', utilsService);

  function utilsService(){
    var tranche = 0;
    var total = 0;
    var instance = {
      findIndexByCode: _findIndexByCode,
      findObjectByCode: _findObjectByCode,
      findObjectByNameAndFirstName:_findObjectByNameAndFirstName,
      getFrais: _getFrais,
      getTotal:_getTotal,
      isEmptyObject:_isEmptyObject
    };
    function _getFrais(montant){
      if (montant === '')
        return tranche;
      if (montant !== undefined && _isNum(montant)){
        switch (true){
          case montant > 0 && montant <= 100 :
            tranche = _getTranche().tranche1;
            return tranche;
            break;
          case  montant > 100 && montant <= 200 :
            tranche = _getTranche().tranche2;
            return tranche;
            break;
          case montant > 200 && montant <= 500 :
            tranche = _getTranche().tranche3;
            return tranche;
            break;
          case montant > 500 && montant <= 1000:
            tranche = _getTranche().tranche4;
            return tranche;
            break;
          case montant >  1000 && montant <= 1500:
            tranche = _getTranche().tranche5;
            return tranche;
            break
          case montant > 1500 && montant <= 2000 :
            tranche = _getTranche().tranche6;
            return tranche;
            break;
          case montant > 2000 :
            tranche = _getTranche().tranche1;
            return tranche;
            break;
        }
      }else {
        return tranche;
      }
    }

    function _getTotal(montant, frais){
      if ((montant !== undefined && montant !== '') && _isNum(montant)){
        total = montant + frais;
      }
      return total;
    }
    function _isNum(montant){
      if (montant !== '')
        return !isNaN(montant);
    }
    function _getTranche(){
      var tranche = {
        'tranche1': 3.9,
        'tranche2': 8,
        'tranche3': 12,
        'tranche4': 17,
        'tranche5': 25,
        'tranche6': 35,
        'tranche7': 55
      }
      return tranche;
    }
    function _findIndexByCode(field, value, array){
      var obj = {};
    angular.forEach(array, function(item, key){
        if (item[field] === value){
          obj.key = key;
        }
    }, obj);
    return obj.key;
    }

    function _findObjectByCode(field, value, array){
      var obj = {};
      array.filter(function(item){
        if (item[field] === value)
          obj = item;
      });
      return obj;
    }
    function _findObjectByNameAndFirstName(value, array){
      var obj = {};
      array.filter(function(item){
        if (item['nom'] === value.nom && item['prenom'] === value.prenom)
          obj = item;
      });
      return obj;
    }
    function _isEmptyObject(obj){
      return !Object.keys(obj).length;
    }

    return instance;
  }
})(angular);
