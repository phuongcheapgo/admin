/**
 * Author : phuong.tran
 * Date   : 2017-03-17
 */

(function () {
    'use strict';

    angular.module('app').controller('statistics.driver.controller',controller);

    /** @ngInject */
    function controller($scope, $state, statisticsAPI) {


        $scope.pagination = {
            limit : 15
        };

        $scope.pageChanged = pageChanged;
        /** Internal functions */

        (function onInit() {
            getList();
            getDriverTotal();
        })();


        function getList() {
            var params = getParams();
            statisticsAPI.getDrivers(params).then(function (res) {
                console.log(res);

                $scope.items = res.data.rows;



                $scope.pagination.page = res.data.page;
                $scope.pagination.total = res.data.total;
            });
        }


        function getParams() {
            var _res = {
                page : $scope.pagination.page || 1,
                limit : $scope.pagination.limit || 15
            };

            return _res;
        }

        function pageChanged() {
            return getList();
        }


        function getDriverTotal() {
            var params = getParams();
            statisticsAPI.getDriverTotal(params).then(function (res) {
                console.log(res);
                $scope.total = res.data;
            });
        }
    }
})();

