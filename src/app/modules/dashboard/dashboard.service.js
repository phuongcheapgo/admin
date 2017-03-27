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
        this.getInActivatedDriver = getInActivatedDriver;
        this.getActivatedDriver = getActivatedDriver;
        this.getTopRatingDriver = getTopRatingDriver;
        this.getTopRatingTrip = getTopRatingTrip;


        /** Internal functions */

        function getNewUser(params) {
            var url = [HOST_API,URI,'get-new-user'].join('/');
            return $http.get(url,{params : params });
        }

        function getNewVehicle(params) {
            var url = [HOST_API,URI,'get-new-vehicle'].join('/');
            return $http.get(url,{params : params });
        }

        function getInActivatedDriver(params) {
            var url = [HOST_API,URI,'get-inactivated-driver'].join('/');
            return $http.get(url,{params : params });
        }

        function getActivatedDriver(params) {
            var url = [HOST_API,URI,'get-activated-driver'].join('/');
            return $http.get(url,{params : params });
        }

        function getTopRatingDriver(params) {
            var url = [HOST_API,URI,'get-top-rating-driver'].join('/');
            return $http.get(url,{params : params });
        }

        function getTopRatingTrip(params) {
            var url = [HOST_API,URI,'get-top-rating-trip'].join('/');
            return $http.get(url,{params : params });
        }
    }
})();
