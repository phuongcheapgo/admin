/**
 * Author : phuong.tran
 * Date   : 2017-03-17
 */

(function () {
    'use strict';

    angular.module('app').controller('statistics.driver.controller',controller);

    /** @ngInject */
    function controller($scope, $state, statisticsAPI, CONFIG, $filter) {

        var _this = this;

        $scope.host_image = [CONFIG.HOST_API,'api/admin/get-image/'].join('/');

        $scope.filterDate = $scope.filterRange[0];

        $scope.pagination = {
            limit : 15
        };

        $scope.sortParams = {};

        $scope.changeFilter = changeFilter;

        $scope.pageChanged = pageChanged;

        $scope.sortAction = sortAction;

        /** Internal functions */

        (function onInit() {
            getList();
            getDriverTotal();
        })();


        function getList() {
            var params = getParams();
            statisticsAPI.getDrivers(params).then(function (res) {


                $scope.items = res.data.rows;

                $scope.pagination.page = res.data.page;
                $scope.pagination.total = res.data.total;
                $scope.total_car = res.data.total;


                _this.fixedList = angular.copy($scope.items);
            });
        }


        function getParams() {
            var _res = {
                page : $scope.pagination.page || 1,
                limit : $scope.pagination.limit || 15
            };
            _res.range_date = $scope.filterDate.key;

            _res = Object.assign(_res,$scope.sortParams);

            return _res;
        }

        function pageChanged() {
            return getList();
        }


        function getDriverTotal() {
            var params = getParams();
            statisticsAPI.getDriverTotal(params).then(function (res) {

                $scope.total = res.data;
            });
        }

        function changeFilter(filter) {
            $scope.filterDate = filter;
            getList();
            getDriverTotal();
        }

        function sortAction(params) {
            $scope.pagination.page = 1;
            return getList();
        }


        $scope.$on('globalSearch',function (event, data) {
            $scope.items = $filter('filter')(_this.fixedList, {'$' : data});
        })
    }
})();

