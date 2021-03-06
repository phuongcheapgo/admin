/**
 * Author : phuong.tran
 * Date   : 2017-03-07
 */

(function(){
    'use strict';

    angular.module('app').controller('users.controller',controller);

    /** @ngInject */
    function controller($scope, usersAPI, $state, $filter){
        var _this = this;

        $scope.listItems = {};

        $scope.pagination = {
            limit : 15
        };

        $scope.sortParams = {};

        $scope.editAction = editAction;
        $scope.goAdd = goAdd;

        $scope.deleteAction = deleteAction;

        $scope.changeActivation = changeActivation;

        $scope.pageChanged = pageChanged;

        $scope.sortAction = sortAction;

        /** Internal functions */

        (function onInit(){
            getList();
        })();


        function getList(){
            var params = _getParams();

            usersAPI.getUsers(params).then(function(res){
                try {
                    $scope.listItems[params.type] = res.data.rows;
                    $scope.pagination.page = res.data.page;
                    $scope.pagination.total = res.data.total;


                    _this.fixedList = angular.copy($scope.listItems[params.type]);
                } catch (error) {

                }

            });
        }


        function getRiders(){
            return getList();
        }


        function editAction(id){
            $state.go('app.user_add',{id : id , type : 'rider'});
        }

        function goAdd(){
            $state.go('app.user_add',{id : null, type : 'rider'});
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

        function _getParams() {
            var _res = {
                type : 'rider',
                page : $scope.pagination.page || 1,
                limit : $scope.pagination.limit || 15
            };

            _res = Object.assign(_res,$scope.sortParams);
            return _res;
        }

        function pageChanged() {
            return getRiders();
        }

        $scope.$on('globalSearch',function (event, data) {
            $scope.listItems['rider'] = $filter('filter')(_this.fixedList, {'$' : data});
        });

        function sortAction() {
            $scope.pagination.page = 1;
            getList();
        }
    }

})();
