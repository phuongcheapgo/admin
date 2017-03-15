/**
 * Author : phuong.tran
 * Date   : 2017-03-07
 */

(function(){
    'use strict';

    angular.module('app').controller('drivers.controller',controller);

    /** @ngInject */
    function controller($scope, $state, drivesAPI, usersAPI, driverTypesAPI, CONFIG, DOCUMENT_CONFIG){
        $scope.DOCUMENT_TYPE_ARRAY =  Object.keys(DOCUMENT_CONFIG.TYPE).map(function(key){
            var item = DOCUMENT_CONFIG.TYPE[key];
            return item;
        });


        $scope.HOST_API = CONFIG.HOST_API + '/';
        $scope.goEdit = goEdit;

        $scope.goAdd = goAdd;

        $scope.deleteAction = deleteAction;
        $scope.changeStatus = changeStatus;
        $scope.changeActivation = changeActivation;
        $scope.deleteUserAction = deleteUserAction;
        $scope.loadDrivers = loadDrivers;
        $scope.editUserAction = editUserAction;

        (function onInit(){
            getList();
            getUserDrivers();
        })();


        function getList(){
            drivesAPI.getDrivers().then(function(res){
                try {
                    $scope.items = res.data.rows;

                    $scope.items = $scope.items.map(function(item){
                        item.detail = getVehicleType(res.data.types,item.vehicle_type_id);
                        item.document_types = item.documents.map(function (_doc) {
                            return _doc.type;
                        });
                        return item;
                    });
                } catch (error) {
                    console.log(error);
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

        function goEdit(user,id){

            $state.go('app.drivers_add',{id : id, user : user});
        }

        function goAdd(user){
            $state.go('app.drivers_add',{id : null, user : user});
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

        function getUserDrivers() {
            drivesAPI.getUserDrivers().then(function (res) {
                console.log(res);
                try{
                    $scope.users = res.data.rows;
                }catch (e){

                }
            });
        }

        function changeActivation(id,status) {

            usersAPI.changeActivation(id,{status : status}).then(function (res) {
                try {
                    if(res.data.success)
                    {
                        swal({
                            title: res.data.msg,
                            showConfirmButton: true,
                            type : 'success'
                        });
                    }
                } catch (e){
                    console.log(e);
                }
            });
        }

        function deleteUserAction(id) {
            swal(
                {
                    title: "Are you sure?",
                    text: "You will not be able to recover this user!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: true
                },
                function(){
                    usersAPI.deleteUser(id).then(function(res){
                        try {
                            if(res.data.success)
                            {

                                swal({
                                    title: res.data.msg,
                                    showConfirmButton: true,
                                    type : 'success'
                                },getUserDrivers);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });

                }
            );
        }

        function loadDrivers(item) {

            if(!item.parse)
            {
                var vehicle = angular.copy(item.vehicle);

                if(vehicle)
                {
                    vehicle.document_types = vehicle.documents.map(function (_doc) {
                        return _doc.type;
                    });

                    driverTypesAPI.getDriverTypeDetail(vehicle.vehicle_type_id).then(function(res){
                        try {
                            vehicle.type = res.data.result;
                        } catch (error) {
                            console.log(error);
                        }
                    });


                    if(!angular.isArray(vehicle)){
                        item.vehicle = [vehicle];
                    }



                }
                else
                {
                    item.vehicle = [];
                }

                item.parse = true;

            }

            item.show = !item.show;
        }

        function editUserAction(id) {
            $state.go('app.user_add',{id : id});
        }


    }
})();
