/**
 * Created by macbookpro on 29/03/16.
 */
(function(angular) {
  'use strict';
  angular.module('app.transferts')
    .factory('transfertFraisService',transfertFraisService);

  function transfertFraisService(){
    var object = {
     getFrais:_getFrais,
     getTotal:_getTotal,
     getTranche: _getTranche,
     isNum: _isNum
      };
    var tranche = 0;
    var total = 0;
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
      if ((montant !== undefined && montant !== '') && !_isNum(montant)){
        total = montant + frais;
      }
      console.log(total);

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
    return object;
  }
})(angular);
