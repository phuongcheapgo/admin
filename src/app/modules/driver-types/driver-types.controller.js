/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('driver-types.controller',controller);

    /** @ngInject */
    function controller($scope, $state, driverTypesAPI){

        $scope.HOST_API = '//localhost:5050/';

        $scope.goEdit = goEdit; 
        $scope.goAdd = goAdd;

        (function onInit(){
            getList();
        })();

        function getList(){
            driverTypesAPI.getDriverType().then(function(res){
                try {
                    $scope.items = res.data.rows;
                } catch (error) {
                    
                }
            });
        }

        function goEdit(id){
            $state.go('app.driver-types-add',{id : id});
        }

        function goAdd(){
            $state.go('app.driver-types-add',{id : null});
        }
    }
})();