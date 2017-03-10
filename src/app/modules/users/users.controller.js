/**
 * Author : phuong.tran
 * Date   : 2017-03-07
 */

(function(){
    'use strict';

    angular.module('app').controller('users.controller',controller);

    /** @ngInject */
    function controller($scope, usersAPI, $state){
        console.log('users controller');

        $scope.listItems = {};

        $scope.editAction = editAction;
        $scope.goAdd = goAdd;

        $scope.deleteAction = deleteAction;

        /** Internal functions */

        (function onInit(){
            getRiders();
            getDrivers();
        })();


        function getList(type){
            var params = {
                type : type
            };

            usersAPI.getUsers(params).then(function(res){
                try {
                    $scope.listItems[type] = res.data.rows;
                } catch (error) {
                    
                }
                
            });
        }


        function getRiders(){
            return getList('rider');
        }

        function getDrivers(){
            return getList('driver');
        }


        function editAction(id){
            $state.go('app.user_add',{id : id});
        }

        function goAdd(){
            $state.go('app.user_add',{id : null});
        }

        function deleteAction(id){
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
                                getRiders();
                                getDrivers();
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
            );
        }
    }

})();