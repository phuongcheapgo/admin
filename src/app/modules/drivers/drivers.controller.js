/**
 * Author : phuong.tran
 * Date   : 2017-03-07
 */

(function(){
    'use strict';

    angular.module('app').controller('drivers.controller',controller);

    /** @ngInject */
    function controller($scope, drivesAPI){
        console.log('drivers controller');


        (function onInit(){
            getList();
        })();


        function getList(){
            drivesAPI.getDrivers().then(function(res){
                try {
                    $scope.items = res.data.rows;

                    $scope.items = $scope.items.map(function(item){
                        item.detail = getVehicleType(res.data.types,item.vehicle_type_id);
                        return item;
                    });

                    console.log($scope.items);
                } catch (error) {
                    
                }
            });
        }

        function getVehicleType(vehiclesType,id){
            var result = null;
            vehiclesType.forEach(item => {
                if(item._id === id){
                    result = item;
                }
            });

            return result;
        }
    }
})();