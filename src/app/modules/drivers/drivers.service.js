/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
    'use strict';

    angular.module('app').service('drivesAPI',service);

    /** @ngInject */
    function service($http){
        var HOST_API = '//localhost:5050';


        this.getDrivers = getDrivers;

        /** Internal functions */

        function getDrivers(params){
            var url = [HOST_API,'api/admin/vehicle/get'].join('/');
            return $http.get(url,{params : params });
        }
    }
})();