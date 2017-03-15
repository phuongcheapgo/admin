/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */


(function(){
    'use strict';

    angular.module('app').service('driverTypesAPI',service);

    /** @ngInject */
    function service($http, CONFIG){
        var HOST_API = CONFIG.HOST_API;
        this.getDriverType = getDriverType;
        this.addDriverType = addDriverType;
        this.getDriverTypeDetail = getDriverTypeDetail;

        /** Internal functions */

        function getDriverType(params){
            var url = [HOST_API,'api/admin/vehicle-type/get'].join('/');
            return $http.get(url,{params : params });
        }

        function addDriverType(params){
            var url = [HOST_API,'api/admin/vehicle-type/create'].join('/');
            return $http.post(url,params);
        }

        function getDriverTypeDetail(id,params){
            var url = [HOST_API,'api/admin/vehicle-type/detail',id].join('/');
            return $http.get(url,{params : params });
        }
    }
})();
