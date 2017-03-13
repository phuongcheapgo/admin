/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
  'use strict';

  angular.module('app').service('vehicleDocAPI',service);

  /** @ngInject */
  function service($http, CONFIG){
    var HOST_API = CONFIG.HOST_API;
    this.getListDocument = getListDocument;
    this.getDrivers = getDrivers;


    /** Internal functions */
    function getListDocument(params) {
      var url = [HOST_API,'api/admin/vehicle-document-list'].join('/');
      return $http.get(url,{params : params });
    }

    function getDrivers(params){
        var url = [HOST_API,'api/admin/vehicle/get'].join('/');
        return $http.get(url,{params : params });
    }
  }
})();
