/**
 * Author : phuong.tran
 * Date   : 2017-03-07
 */

(function(){
    'use strict';

    angular.module('app').controller('drivers.controller.list',controller);

    /** @ngInject */
    function controller($scope, $state, drivesAPI, usersAPI, driverTypesAPI, CONFIG, DOCUMENT_CONFIG, $filter){

        var _this= this;

        $scope.DOCUMENT_TYPE_ARRAY =  Object.keys(DOCUMENT_CONFIG.TYPE).map(function(key){
            var item = DOCUMENT_CONFIG.TYPE[key];
            return item;
        });

        $scope.pagination = {
            limit : 15
        };

        $scope.sortParams = {};


        $scope.HOST_API = CONFIG.HOST_API + '/';
        $scope.goEdit = goEdit;

        $scope.goAdd = goAdd;
        $scope.goAddUser = goAddUser;

        $scope.deleteAction = deleteAction;
        $scope.changeStatus = changeStatus;
        $scope.changeActivation = changeActivation;
        $scope.deleteUserAction = deleteUserAction;
        $scope.loadDrivers = loadDrivers;
        $scope.editUserAction = editUserAction;

        $scope.pageChanged = pageChanged;

        $scope.sortAction = sortAction;

        (function onInit(){
            getList();
        })();




        function goEdit(user,id){

            $state.go('app.drivers_add',{id : id, user : user});
        }

        function goAdd(user){
            $state.go('app.drivers_add',{id : null, user : user});
        }

        function deleteAction(item){
            var id = item._id;
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
                            item.is_removed = true;
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
            var params = _getParamsList();
            drivesAPI.getUserDrivers(params).then(function (res) {
                return _success_callback(res);
            });
        }

        function getDriverHasVerify() {
            var params = _getParamsList();
            drivesAPI.getDriverHasVerify(params).then(function (res) {
                return _success_callback(res);
            });
        }

        function getDriverHasNoVerify() {
            var params = _getParamsList();
            drivesAPI.getDriverHasNoVerify(params).then(function (res) {
                return _success_callback(res);
            });
        }

        function getDriverInactivatedList() {
            var params = _getParamsList();
            drivesAPI.getDriverInactivatedList(params).then(function (res) {
                return _success_callback(res);
            });
        }

        function getDriverActivatedList() {
            var params = _getParamsList();
            drivesAPI.getDriverActivatedList(params).then(function (res) {
                return _success_callback(res);
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
                                },getList());
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
            $state.go('app.user_add',{id : id, type : 'driver'});
        }

        function goAddUser(){
            $state.go('app.user_add',{id : null, type : 'driver'});
        }

        function _getParamsList() {
            var _res = {
                type : 'driver',
                page : $scope.pagination.page || 1,
                limit : $scope.pagination.limit || 15
            };

            _res = Object.assign(_res,$scope.sortParams);

            return _res;
        }

        function pageChanged() {
            return getList();
        }


        $scope.$on('globalSearch',function (event, data) {
            $scope.users = $filter('filter')(_this.fixedList, {'$' : data});
        });


        function sortAction() {
            $scope.pagination.page = 1;
            getList();
        }

        function detectRoute() {

            var route = $state.current;
            if(route.name == 'app.drivers.verify'){
                return 'verify';
            }

            if(route.name == 'app.drivers.not_verify'){
                return 'not_verify';
            }

            if(route.name == 'app.drivers.list'){
                return 'list';
            }

            if(route.name == 'app.drivers.inactivated'){
                return 'inactivated';
            }

            if(route.name == 'app.drivers.activated'){
                return 'activated';
            }

        }

        function getList() {
            var route = detectRoute();

            if(route == 'list')
            {
                return getUserDrivers();
            }

            if(route == 'verify')
            {
                return getDriverHasVerify();
            }

            if(route == 'not_verify')
            {
                return getDriverHasNoVerify();
            }

            if(route == 'inactivated')
            {
                return getDriverInactivatedList();
            }

            if(route == 'activated')
            {
                return getDriverActivatedList();
            }


        }


        function _success_callback(res) {
            try{
                $scope.users = res.data.rows;
                $scope.pagination.page = res.data.page;
                $scope.pagination.total = res.data.total;

                _this.fixedList = angular.copy($scope.users);
            }catch (e){

            }
        }
    }
})();
