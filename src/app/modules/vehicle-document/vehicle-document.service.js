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
    this.addDocument = addDocument;
    this.getDetail = getDetail;
    this.updateDocument = updateDocument;
    this.removeDocument = removeDocument;


    /** Internal functions */
    function getListDocument(params) {
      var url = [HOST_API,'api/admin/vehicle-document-list'].join('/');
      return $http.get(url,{params : params });
    }

    function getDrivers(params){
        var url = [HOST_API,'api/admin/vehicle/get'].join('/');
        return $http.get(url,{params : params });
    }

    function addDocument(params) {
        var url = [HOST_API,'api/admin/vehicle-document/add'].join('/');
        return $http.post(url,params);
    }

    function getDetail(id) {
        var url = [HOST_API,'api/admin/vehicle-document/detail',id].join('/');
        return $http.get(url);
    }

    function updateDocument(id,params) {
        var url = [HOST_API,'api/admin/vehicle-document/update',id].join('/');
        return $http.put(url,params);
    }

    function removeDocument(id) {
        var url = [HOST_API,'api/admin/vehicle-document/delete',id].join('/');
        return $http.delete(url);
    }
  }
})();
