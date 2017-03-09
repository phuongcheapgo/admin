/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */


(function(){
    'use strict';

    angular.module('app').service('driverTypesAPI',service);
    
    /** @ngInject */
    function service($http){
        var HOST_API = '//localhost:5050';
        this.getDriverType = getDriverType;
        this.addDriverType = addDriverType;
        this.getDeriverTypeDetail = getDeriverTypeDetail;

        /** Internal functions */

        function getDriverType(params){
            var url = [HOST_API,'api/admin/vehicle-type/get'].join('/');
            return $http.get(url,{params : params });
        }

        function addDriverType(params){
            var url = [HOST_API,'api/admin/vehicle-type/create'].join('/');
            return $http.post(url,params);
        }

        function getDeriverTypeDetail(id,params){
            var url = [HOST_API,'api/admin/vehicle-type/detail',id].join('/');
            return $http.get(url,{params : params });
        }
    }
})();