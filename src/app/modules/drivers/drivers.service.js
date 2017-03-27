/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
    'use strict';

    angular.module('app').service('drivesAPI',service);

    /** @ngInject */
    function service($http, CONFIG){
        var HOST_API = CONFIG.HOST_API;

        this.getDrivers = getDrivers;
        this.getDriverType = getDriverType;
        this.addDriver = addDriver;
        this.getDriverDetail = getDriverDetail;
        this.updateDriver = updateDriver;
        this.deleteDriver = deleteDriver;
        this.updateStatus = updateStatus;
        this.getUserDrivers = getUserDrivers;
        this.getDriverHasVerify = getDriverHasVerify;
        this.getDriverHasNoVerify = getDriverHasNoVerify;

        /** Internal functions */

        function getDrivers(params){
            var url = [HOST_API,'api/admin/vehicle/get'].join('/');
            return $http.get(url,{params : params });
        }

        function getDriverType(params){
            var url = [HOST_API,'api/admin/vehicle-type/get'].join('/');
            return $http.get(url,{params : params });
        }

        function addDriver(params){
            var url = [HOST_API,'api/admin/vehicle/create'].join('/');
            return $http.post(url,params);
        }

        function getDriverDetail(id, params){
            var url = [HOST_API,'api/admin/vehicle/detail',id].join('/');
            return $http.get(url,{params : params });
        }

        function updateDriver(id, params){
            var url = [HOST_API,'api/admin/vehicle/update',id].join('/');
            return $http.put(url,params);
        }

        function deleteDriver(id){
            var url = [HOST_API,'api/admin/vehicle/delete',id].join('/');
            return $http.delete(url);
        }

        function updateStatus(id,params){
            var url = [HOST_API,'api/admin/vehicle/update-status',id].join('/');
            return $http.put(url,params);
        }
        function getUserDrivers(params) {
            var url = [HOST_API,'api/admin/users/get'].join('/');
            return $http.get(url,{params : params });
        }

        function getDriverHasVerify(params) {
            var url = [HOST_API,'api/admin/users/has-verify'].join('/');
            return $http.get(url,{params : params });
        }

        function getDriverHasNoVerify(params) {
            var url = [HOST_API,'api/admin/users/has-no-verify'].join('/');
            return $http.get(url,{params : params });
        }
    }
})();
