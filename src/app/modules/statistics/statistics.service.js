/**
 * Author : phuong.tran
 * Date   : 2017-03-17
 */

(function () {
    'use strict';

    angular.module('app').service('statisticsAPI',service);

    /** @ngInject */
    function service($http, CONFIG) {
        var HOST_API = CONFIG.HOST_API;

        this.getDrivers = getDrivers;
        this.getDriverTotal = getDriverTotal;


        /** Internal functions */

        function getDrivers(params) {
            var url = [HOST_API,'api/admin/statistics/driver'].join('/');
            return $http.get(url,{params : params });
        }

        function getDriverTotal(params) {
            var url = [HOST_API,'api/admin/statistics/driver-total'].join('/');
            return $http.get(url,{params : params });
        }
    }
})();
