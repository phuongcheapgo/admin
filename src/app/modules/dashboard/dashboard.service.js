/**
 * Author : phuong.tran
 * Date   : 2017-03-22
 */

(function () {
    'use strict';

    angular.module('app').service('dashboardAPI',service);

    /** @ngInject */
    function service($http, CONFIG) {
        var HOST_API = CONFIG.HOST_API;
        var URI = 'api/admin/dashboard';

        this.getNewUser = getNewUser;
        this.getNewVehicle = getNewVehicle;


        /** Internal functions */

        function getNewUser(params) {
            var url = [HOST_API,URI,'get-new-user'].join('/');
            return $http.get(url,{params : params });
        }

        function getNewVehicle(params) {
            var url = [HOST_API,URI,'get-new-vehicle'].join('/');
            return $http.get(url,{params : params });
        }
    }
})();
