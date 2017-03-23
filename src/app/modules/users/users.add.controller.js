/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
    'use strict';


    angular.module('app').controller('users.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, usersAPI, $timeout){

        $scope.saveAction = saveAction;
        $scope.cancelAction = cancelAction;
        $scope.selectFile = selectFile;

        $scope.image = {};

        (function onInit(){
            getFormData();
        })();


        function getFormData(){
            var id = $stateParams.id;

            if(id)
            {
                usersAPI.getUserDetail(id).then(function(res){
                    try {

                        $scope.formData = res.data.result;
                        $scope.image = {
                            isNew : false,
                            src : $scope.formData.avatar
                        };

                        delete $scope.formData.password;
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            else
            {
                $scope.formData = {
                    gender : 0,
                    type : $stateParams.type || 'rider'
                };
            }
        }

        function saveAction(data){
            var id = $stateParams.id;
            var params = parseParams(data);
            if($scope.image.isNew)
            {
                params.files = $scope.image;
            }

            if(id)
            {
                usersAPI.updateUser(id,params).then(function(res){

                    try {
                        if(res.success)
                        {
                            swal({
                                title: res.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                cancelAction();
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            else
            {

                usersAPI.addUser(params).then(function(res){
                    try {
                        if(res.success)
                        {
                            swal({
                                title: res.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                cancelAction();
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }

        }

        function parseParams(object){
            var params = {
                email : object.email,
                first_name : object.first_name,
                last_name : object.last_name,
                gender : object.gender,
                type : object.type,
                phone : object.phone
            };

            if(object.password) params.password = object.password;

            return params;
        }

        function cancelAction(){
            if($scope.formData.type == 'driver')
            {
                $state.go('app.drivers');
            }
            else
            {
                $state.go('app.users');
            }

        }

        function selectFile(event) {
            var length = event.files.length;

            for(var i = 0; i < length; i++){
                var file = event.files[i];

                file.src = $scope.trustUrl(window.URL.createObjectURL(file));
                file.isNew = true;
                $timeout(function(){
                    $scope.image = file;
                },0);
            }

            event.value = null;
        }
    }
})();
