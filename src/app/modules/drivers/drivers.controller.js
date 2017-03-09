/**
 * Author : phuong.tran
 * Date   : 2017-03-07
 */

(function(){
    'use strict';

    angular.module('app').controller('drivers.controller',controller);

    /** @ngInject */
    function controller($scope, $state, drivesAPI){
        console.log('drivers controller');

        $scope.HOST_API = '//localhost:5050/';
        $scope.goEdit = goEdit;

        $scope.goAdd = goAdd;

        $scope.deleteAction = deleteAction;
        $scope.changeStatus = changeStatus;

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
                } catch (error) {
                    
                }
            });
        }

        function getVehicleType(vehiclesType,id){
            var result = null;
            vehiclesType.forEach(function(item){
                if(item._id === id){
                    result = item;
                }
            });

            return result;
        }

        function goEdit(id){
            $state.go('app.drivers_add',{id : id});
        }

        function goAdd(){
            $state.go('app.drivers_add',{id : null});
        }

        function deleteAction(id){
            swal(
                {
                    title: "Are you sure?",
                    text: "You will not be able to recover this driver!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: true
                },
                function(){

                    drivesAPI.deleteDriver(id).then(function(res){
                        if(res.data.success)
                        {
                            getList();
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            });
                        }
                    });
                }
            );
        }


        function changeStatus(id,status){
            var params = {
                status : status
            };
            drivesAPI.updateStatus(id,params).then(function(res){
                try {
                    if(res.data.success)
                    {
                        swal({
                            title: res.data.msg,
                            showConfirmButton: true,
                            type : 'success'
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }

        
    }
})();