/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */


(function(){
    'use strict';

    angular.module('app').service('driverTypesAPI',service);

    /** @ngInject */
    function service($http, CONFIG, $q, $rootScope, $localStorage){
        var HOST_API = CONFIG.HOST_API;
        var URI = 'api/admin/vehicle-type';
        this.getDriverType = getDriverType;
        this.addDriverType = addDriverType;
        this.getDriverTypeDetail = getDriverTypeDetail;
        this.changeStatus = changeStatus;
        this.updateDriverType = updateDriverType;

        /** Internal functions */

        function getDriverType(params){
            var url = [HOST_API,URI,'get'].join('/');
            return $http.get(url,{params : params });
        }

        function addDriverType(params){

            var formData = new FormData();
            for(var key in params)
            {
                formData.append(key,params[key]);
            }

            $rootScope.isLoadingAjax = true;

            var deferer = $q.defer();
            var url = [HOST_API,URI,'create'].join('/');

            $.ajax({
                url: url,
                headers: {
                    "Authorization":"Bearer "+$localStorage.AUTHENTICATE_TOKEN
                },
                method: 'post',
                data: formData,
                processData: false,
                contentType: false
            })
                .done(function (data) {
                    $rootScope.isLoadingAjax = false;
                    deferer.resolve(data);

                });

            return deferer.promise;
        }

        function getDriverTypeDetail(id,params){
            var url = [HOST_API,URI,'detail',id].join('/');
            return $http.get(url,{params : params });
        }

        function changeStatus(id, params) {
            var url = [HOST_API,URI,'update-activate',id].join('/');
            return $http.put(url,params);
        }

        function updateDriverType(id, params) {

            var formData = new FormData();
            for(var key in params)
            {
                formData.append(key,params[key]);
            }

            $rootScope.isLoadingAjax = true;

            var deferer = $q.defer();
            var url = [HOST_API,URI,'update',id].join('/');

            $.ajax({
                url: url,
                headers: {
                    "Authorization":"Bearer "+$localStorage.AUTHENTICATE_TOKEN
                },
                method: 'put',
                data: formData,
                processData: false,
                contentType: false
            })
            .done(function (data) {
                $rootScope.isLoadingAjax = false;
                deferer.resolve(data);

            });

            return deferer.promise;

        }
    }
})();
