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
            getTopRatingDriver();
            getTopRatingTrip();
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

        function getTopRatingDriver() {
            dashboardAPI.getTopRatingDriver().then(function (res) {
                try {
                    $scope.top_rating_driver = res.data.rows.map(function (item) {
                        var temp = item.rating.total/item.rating.number;
                        var rates = [];
                        for(var i = 1; i <= temp; i++)
                        {
                            rates.push(i);
                        }

                        if(temp - rates.length > 0){
                            rates.push(temp - rates.length);
                        }

                        item.rating_range = rates;

                        return item;
                    });

                    console.log();
                }catch (e){
                    console.log(e);
                }
            });
        }

        function getTopRatingTrip() {
            dashboardAPI.getTopRatingTrip().then(function (res) {
                try{
                    $scope.top_rating_trip = res.data.rows.map(function (item) {

                        var rates = [];
                        for(var i = 1; i <= item.rate; i++)
                        {
                            rates.push(i);
                        }

                        if(item.rate - rates.length > 0){
                            rates.push(item.rate - rates.length);
                        }

                        item.rating_range = rates;

                        console.log(rates);

                        return item;
                    });
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
