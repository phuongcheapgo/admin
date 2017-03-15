/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('drivers.add.controller',controller);

    /** @ngInject */
    function controller($scope, drivesAPI, usersAPI, $state, $stateParams){
        console.log('drivers controller');

        $scope.saveAction = saveAction;
        $scope.cancelAction = cancelAction;

        (function onInit(){
            getDriverType();
            getFormData();
            getUserDetail();
        })();

        function getDriverType(){
            drivesAPI.getDriverType().then(function(res){
                try {
                    $scope.driverTypes = res.data.rows;
                } catch (error) {
                    console.log(error);
                }
            });
        }


        function getFormData(){
            var id = $stateParams.id;

            if(id)
            {
                drivesAPI.getDriverDetail(id).then(function(res){
                    try {
                        $scope.formData = res.data.result;
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            else
            {
                $scope.formData = {};
            }
        }

        function saveAction(data){

            data.user_id = $scope.userData._id;

            var id = $stateParams.id;
            if(id)
            {
                drivesAPI.updateDriver(id, data).then(function(res){
                    try {
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.drivers');
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            else
            {
                drivesAPI.addDriver(data).then(function(res){
                    try {
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.drivers');
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        }

        function cancelAction(){
            $state.go('app.drivers');
        }

        function getUserDetail() {
            var user_id = $stateParams.user;
            usersAPI.getUserDetail(user_id).then(function (res) {
                try{
                    $scope.userData = res.data.result;
                }catch (e){

                }
            });
        }
    }
})();
