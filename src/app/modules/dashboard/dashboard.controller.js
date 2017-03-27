/**
 * Author : phuong.tran
 * Date   : 2017-03-22
 */


(function () {
    'use strict';
    angular.module('app').controller('dashboard.controller',controller);

    /** @ngInject */
    function controller($scope, dashboardAPI, $timeout, $window) {
        var _this = this;

        $scope.filterDate = $scope.filterRange[0];

        $scope.total = {};

        $scope.changeFilter = changeFilter;


        (function onInit() {
            getNewUser();
            getNewVehicle();
            getInActivatedDriver();
            getActivatedDriver();
        })();


        /** Internal functions */


        function getNewUser() {
            var params = getParams();
            dashboardAPI.getNewUser(params).then(function (res) {
                try{

                    $scope.total.user = res.data.result;
                }catch (e){
                    console.log(e);
                }
            });
        }

        function getNewVehicle() {
            var params = getParams();
            dashboardAPI.getNewVehicle(params).then(function (res) {
                try{
                    $scope.total.vehicle = res.data.result;
                }catch (e){
                    console.log(e);
                }
            });
        }

        function getInActivatedDriver() {
            dashboardAPI.getInActivatedDriver().then(function (res) {
                try {
                    $scope.total.inactivated_driver = res.data.result;
                    console.log();
                }catch (e){
                    console.log(e);
                }
            });
        }

        function getActivatedDriver() {
            dashboardAPI.getActivatedDriver().then(function (res) {
                try {
                    $scope.total.activated_driver = res.data.result;
                    console.log();
                }catch (e){
                    console.log(e);
                }
            });
        }


        function changeFilter(filter) {
            $scope.filterDate = filter;
            getNewUser();
            getNewVehicle();
        }

        function getParams() {
            var res = {};

            res.range_date = $scope.filterDate.key;

            return res;
        }
    }

})();
