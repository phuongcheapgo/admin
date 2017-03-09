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
    }

})();