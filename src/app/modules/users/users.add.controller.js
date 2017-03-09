/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
    'use strict';


    angular.module('app').controller('users.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, usersAPI){

        $scope.saveAction = saveAction;

        (function onInit(){
            getFormData();
        })();


        function getFormData(){
            var id = $stateParams.id;

            if(id)
            {
                usersAPI.getUserDetail(id).then(function(res){
                    try {
                        console.log(res);
                        $scope.formData = res.data.result;
                    } catch (error) {
                        
                    }
                });
            }
            else
            {
                $scope.formData = {
                    gender : 0,
                    type : 'rider'
                };
            }
        }

        function saveAction(data){
            var id = $stateParams.id;
            var params = parseParams(data);
            if(id)
            {
                usersAPI.updateUser(id,params).then(function(res){
                    
                    try {
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.users');
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
                    console.log(res);

                    try {
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.users');
                            });
                        }
                    } catch (error) {
                        
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
                type : object.type
            };

            return params;
        }
    }
})();