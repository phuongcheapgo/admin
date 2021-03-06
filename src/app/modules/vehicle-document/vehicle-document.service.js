/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
  'use strict';

  angular.module('app').service('vehicleDocAPI',service);

  /** @ngInject */
  function service($http, CONFIG, $localStorage, $q, $rootScope){
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
        $rootScope.isLoadingAjax = true;
        var deferer = $q.defer();

        var url = [HOST_API,'api/admin/vehicle-document/add'].join('/');

        $.ajax({
            url: url,
            headers: {
                "Authorization":"Bearer "+$localStorage.AUTHENTICATE_TOKEN
            },
            method: 'post',
            data: params,
            processData: false,
            contentType: false
        })
        .done(function (data) {
            $rootScope.isLoadingAjax = false;
            deferer.resolve(data);
        });

        return deferer.promise;

    }

    function getDetail(id) {
        var url = [HOST_API,'api/admin/vehicle-document/detail',id].join('/');
        return $http.get(url);
    }

    function updateDocument(id,params) {
        $rootScope.isLoadingAjax = true;

        var deferer = $q.defer();
        var url = [HOST_API,'api/admin/vehicle-document/update',id].join('/');

        $.ajax({
            url: url,
            headers: {
                "Authorization":"Bearer "+$localStorage.AUTHENTICATE_TOKEN
            },
            method: 'put',
            data: params,
            processData: false,
            contentType: false
        })
        .done(function (data) {
            $rootScope.isLoadingAjax = false;
            deferer.resolve(data);

        });

        return deferer.promise;

    }

    function removeDocument(id) {
        var url = [HOST_API,'api/admin/vehicle-document/delete',id].join('/');
        return $http.delete(url);
    }
  }
})();
